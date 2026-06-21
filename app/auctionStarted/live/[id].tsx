import { auctionService } from "@/api/services/auction";
import { ItemType } from "@/api/services/items";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import AuctionDisplayCard from "@/components/auctions/AuctionDisplayCard";
import VictoryModal from "@/components/auctions/VictoryModal";
import AlertModal from "@/components/common/AlertModal";
import BidInput from "@/components/common/BidInput";
import Button from "@/components/common/Button";
import DetailsList from "@/components/common/DetailList";
import ImageCarousel from "@/components/common/ImageCarousel";
import NoAuction from "@/components/common/NoAuction";
import RoundedButton from "@/components/common/RoundedButton";
import LiveButton from "@/components/home/LiveButton";
import BidHistoryLog from "@/components/profile/BidHistoryLog";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveAuctionScreen() {
  const router = useRouter();
  const { id, readonly } = useLocalSearchParams();
  const isReadOnly = readonly === "true";
  const [won, setWon] = useState(false);
  const { user } = useAuth();
  const isLogged = !!user;
  const [currentItem, setCurrentItem] = useState<ItemType | null>(null);
  const [bidValue, setBidValue] = useState<number>(0);
  const [misPujasLocales, setMisPujasLocales] = useState<any[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", description: "" });
  const [hasBidError, setHasBidError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleBidSubmit = async () => {
    if (!currentItem) return;

    if (bidValue <= 0) {
      setAlertContent({ title: "Monto inválido", description: "El monto a pujar no puede ser cero o negativo." });
      setHasBidError(true);
      setIsAlertVisible(true);
      return;
    }

    if (bidValue < minAllowed) {
      setAlertContent({ title: "Puja muy baja", description: `La puja mínima para superar la oferta actual es de $${minAllowed.toLocaleString("en-US")}.` });
      setHasBidError(true);
      setIsAlertVisible(true);
      return;
    }

    if (bidValue > maxAllowed) {
      setAlertContent({ title: "Límite excedido", description: `La puja máxima permitida para este artículo es de $${maxAllowed.toLocaleString("en-US")}.` });
      setHasBidError(true);
      setIsAlertVisible(true);
      return;
    }

    const pujaInstantanea = {
      identificador: Date.now(), 
      created_at: new Date().toISOString(),
      asistente: 0,
      ganador: user?.firstName || "Vos",
      importe: bidValue,
      categoria: "Comun",
      isMe: true
    };

    setMisPujasLocales(prev => [...prev, pujaInstantanea]);
    await auctionService.placeBid(bidValue, Number(id), currentItem.itemId);
    setBidValue(0);
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setHasBidError(false);
    setBidValue(0);
  };

  const fetchCurrentItem = async (bidsOnly: boolean) => {
    try {
      const response = await auctionService.getCurrentItem(
        Number(id),
        bidsOnly,
      );
      
      setCurrentItem((estadoAnterior) => {
        if (!estadoAnterior) {
          return response.data;
        }
        return {
          ...estadoAnterior,
          ...response.data
        };
      });

    } catch (error) {
      console.error("Error fetching current item: ", error);
    } finally {
      setIsInitialLoading(false);
    }
  };
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true; 

    const fetchLoop = async () => {
      if (!isMounted) return;
      await fetchCurrentItem(false); 

      if (isMounted) {
        timeoutId = setTimeout(fetchLoop, 3000); 
      }
    };

    fetchLoop();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  const rawPujos = currentItem?.pujos;
  const bidsBackend = Array.isArray(rawPujos) ? rawPujos : rawPujos ? [rawPujos] : [];
  const maxBid = bidsBackend.length > 0 ? Math.max(...bidsBackend.map(bid => bid.importe)) : 0;
  
  const basePrice = Number(currentItem?.precioBase || 0);
  const minAllowed = maxBid + 0.1 * basePrice;
  const maxAllowed = maxBid + 0.2 * basePrice;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const bidsBackendMarcadas = bidsBackend.map(bid => ({
    ...bid,
    isMe: misPujasLocales.some(local => local.importe === bid.importe)
  }));

  const misPujasPendientes = misPujasLocales.filter(
    local => !bidsBackend.some(back => back.importe === local.importe)
  );
  const bids = [...bidsBackendMarcadas, ...misPujasPendientes];

  if (isInitialLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <ActivityIndicator size="large" color="#E8B83C" />
        <Text className="text-white text-lg mt-4 font-bold tracking-wide">
          Conectando a la subasta...
        </Text>
      </SafeAreaView>
    );
  }

  if (!currentItem) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction
          title="Subasta no encontrada"
          text="La subasta que buscas no existe o ya ha finalizado."
        />
      </SafeAreaView>
    );
  }

  const articleDetails = [
    { label: "Fecha", value: currentItem.fecha },
    { label: "ID", value: `A${currentItem.itemId}/${new Date().getFullYear()}` },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
        className="flex-1"
      >
        <View className="px-4 pt-4 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingBottom: isKeyboardVisible ? 360 : 40 
          }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="flex-row justify-between items-start mb-6 mt-2">
            <Text className="text-white text-2xl flex-1 mr-4" numberOfLines={2}>
              <Text className="font-bold">Subasta: </Text>
              {currentItem.descripcion}
            </Text>
            <View className="mt-1">
              <RoundedButton
                variant="secondary"
                label="Catalogo"
                onPress={() =>
                  router.push(`/auctionStarted/catalogue/${id}`)
                }
              />
            </View>
          </View>

          <Text className="text-white text-xl mb-4">
            <Text className="font-bold">Articulo 1: </Text>
            {currentItem.descripcioncatalogo}
          </Text>

          <View className="flex-row mb-6">
            <View className="flex-1 pr-4 justify-between">
              <View>
                <DetailsList data={articleDetails} />
              </View>
              <View className="w-full">
                <Text className="text-gray-400 text-base mb-1.5 leading-relaxed">
                  Precio base:{" "}
                </Text>
                <Text className="text-gray-300">
                  {isLogged && !isReadOnly
                    ? "$" + basePrice.toLocaleString("en-US")
                    : "No disponible"}
                </Text>
              </View>
              <View className="gap-y-3 mt-4">
                <RoundedButton
                  variant="secondary"
                  label="Detalle Producto"
                  onPress={() => router.push(`/auctionStarted/catalogue/product/${currentItem.identificador}?idSubasta=${id}`)}
                />
                <LiveButton onPress={() => console.log("Viendo stream...")} />
              </View>
            </View>

            <View className="flex-1">
              <ImageCarousel images={imageBase64Render(currentItem)} />
            </View>
          </View>

          <View className="h-[1px] bg-[#333333] w-full mb-6" />

          <AuctionDisplayCard money={false} initialTime={60} />
          <AuctionDisplayCard money={true} amount={maxBid} />

          <View className="mt-4">
            <BidHistoryLog bids={bids} />
          </View>

          <View className="mt-6">
            <BidInput
              value={bidValue}
              setValue={setBidValue}
              min={minAllowed}
              max={maxAllowed}
              enabled={!isReadOnly}
              hasError={hasBidError} 
            />
            <View className="mt-4">
              <Button
                label="Pujar"
                variant={isReadOnly ? "blocked" : "primary"}
                onPress={handleBidSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AlertModal
        visible={isAlertVisible}
        title={alertContent.title}
        description={alertContent.description}
        iconName="alert-circle-outline"
        iconColor="#EF4444" 
        onClose={handleCloseAlert}
      />

      {won && (
        <VictoryModal
          visible={won}
          itemName={currentItem.descripcion}
          winningBid="$ 1,250,000"
          onProceed={() => {
            setWon(false);
            router.push(`/auctionStarted/live/pay/${id}`);
          }}
        />
      )}
    </SafeAreaView>
  );
}