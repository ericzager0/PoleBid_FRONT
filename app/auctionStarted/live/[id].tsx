import { auctionService } from "@/api/services/auction";
import { ItemType } from "@/api/services/items";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import AuctionDisplayCard from "@/components/auctions/AuctionDisplayCard";
import AuctionFinishedModal from "@/components/auctions/AuctionFinishedModal";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: "",
  });
  const [hasBidError, setHasBidError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isAuctionFinished, setIsAuctionFinished] = useState(false);

  const handleBidSubmit = async () => {
    if (!currentItem) return;

    if (bidValue <= 0) {
      setAlertContent({
        title: "Monto inválido",
        description: "El monto a pujar no puede ser cero o negativo.",
      });
      setHasBidError(true);
      setIsAlertVisible(true);
      return;
    }

    if (bidValue < minAllowed) {
      setAlertContent({
        title: "Puja muy baja",
        description: `La puja mínima para superar la oferta actual es de $${minAllowed.toLocaleString("en-US")}.`,
      });
      setHasBidError(true);
      setIsAlertVisible(true);
      return;
    }

    if (bidValue > maxAllowed) {
      setAlertContent({
        title: "Límite excedido",
        description: `La puja máxima permitida para este artículo es de $${maxAllowed.toLocaleString("en-US")}.`,
      });
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
      isMe: true,
    };

    setMisPujasLocales((prev) => [...prev, pujaInstantanea]);
    await auctionService.placeBid(bidValue, Number(id), currentItem.itemId);
    setBidValue(0);
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setHasBidError(false);
    setBidValue(0);
  };

  const handleAuctionEnd = async () => {
    try {
      const guardado = await AsyncStorage.getItem("@mis_victorias");
      const listaVictorias = guardado ? JSON.parse(guardado) : [];

      if (listaVictorias.length > 0) {
        router.replace(`/auctionStarted/live/pay/${id}`);
      } else {
        setIsAuctionFinished(true);
      }
    } catch (error) {
      console.error("Error chequeando el carrito final: ", error);
      setIsAuctionFinished(true);
    }
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
          ...response.data,
        };
      });
    } catch (error) {
      console.error("Error fetching current item: ", error);
      await handleAuctionEnd();
      return false;
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const fetchLoop = async () => {
      if (!isMounted) return;
      await fetchCurrentItem(true); // liviano: todo menos fotos
      if (isMounted) {
        timeoutId = setTimeout(fetchLoop, 3000);
      }
    };

    const init = async () => {
      await fetchCurrentItem(false); // primera vez: completo, con fotos
      fetchLoop(); // recién acá arranca el polling reducido
    };

    init();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  const rawPujos = currentItem?.pujos;
  const bidsBackend = Array.isArray(rawPujos)
    ? rawPujos
    : rawPujos
      ? [rawPujos]
      : [];
  const maxBid =
    bidsBackend.length > 0
      ? Math.max(...bidsBackend.map((bid) => bid.importe))
      : 0;

  const basePrice = Number(currentItem?.precioBase || 0);
  const minAllowed = maxBid + 0.1 * basePrice;
  const maxAllowed = maxBid + 0.2 * basePrice;

  const isSold = currentItem?.subastado != null;
  const bidsBackendMarcadas = bidsBackend.map((bid) => ({
    ...bid,
    isMe: misPujasLocales.some((local) => local.importe === bid.importe),
  }));

  const misPujasPendientes = misPujasLocales.filter(
    (local) => !bidsBackend.some((back) => back.importe === local.importe),
  );
  const bids = [...bidsBackendMarcadas, ...misPujasPendientes];

  const boughtByCompany = isSold && bidsBackend.length === 0;
  const myWinningBid = isSold
    ? bidsBackend.find(
        (bid) => bid.ganador === "si" && bid.clientId === user?.id,
      )
    : null;

  const iWonThisItem = !!myWinningBid;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

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

  useEffect(() => {
    const registrarVictoria = async () => {
      if (iWonThisItem && currentItem && myWinningBid) {
        try {
          const guardadoAnterior = await AsyncStorage.getItem("@mis_victorias");
          let listaVictorias = guardadoAnterior
            ? JSON.parse(guardadoAnterior)
            : [];
          const yaExiste = listaVictorias.some(
            (item: any) => item.id === currentItem.itemId,
          );

          if (!yaExiste) {
            listaVictorias.push({
              id: currentItem.itemId,
              precio: myWinningBid.importe,
            });

            await AsyncStorage.setItem(
              "@mis_victorias",
              JSON.stringify(listaVictorias),
            );
            console.log(
              "¡Artículo y precio guardados en local!",
              listaVictorias,
            );
          }

          setWon(true);
        } catch (error) {
          console.error("Error guardando la victoria localmente", error);
        }
      }
    };

    registrarVictoria();
  }, [iWonThisItem, currentItem, myWinningBid]);

  useEffect(() => {
    if (!currentItem) return;
    const fechaItem = currentItem.updatedAt || currentItem.updatedAt;
    let ultimaActividad = fechaItem ? new Date(fechaItem).getTime() : Date.now();

    if (bids.length > 0) {
      const tiemposPujas = bids.map((bid) => {
        const fechaPuja = bid.createdAt || bid.created_at;
        
        if (!fechaPuja) return 0; 
        
        const tiempo = new Date(fechaPuja).getTime();
        return isNaN(tiempo) ? 0 : tiempo; 
      });

      const tiempoUltimoPujo = Math.max(...tiemposPujas);
      ultimaActividad = Math.max(ultimaActividad, tiempoUltimoPujo);
    }

    const endTime = ultimaActividad + 60000; 

    const timerInterval = setInterval(() => {
      const ahora = Date.now();
      const diferenciaEnMilisegundos = endTime - ahora;

      if (diferenciaEnMilisegundos <= 0) {
        setTimeLeft(0);
        clearInterval(timerInterval);
      } else {
        setTimeLeft(Math.floor(diferenciaEnMilisegundos / 1000));
      }
    }, 1000); 

    return () => clearInterval(timerInterval);
  }, [currentItem, bids]); 

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
    {
      label: "ID",
      value: `A${currentItem.itemId}/${new Date().getFullYear()}`,
    },
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
            paddingBottom: isKeyboardVisible ? 360 : 40,
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
                onPress={() => router.push(`/auctionStarted/catalogue/${id}`)}
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
                  onPress={() =>
                    router.push(
                      `/auctionStarted/catalogue/product/${currentItem.identificador}?idSubasta=${id}`,
                    )
                  }
                />
                <LiveButton onPress={() => console.log("Viendo stream...")} />
              </View>
            </View>

            <View className="flex-1">
              <ImageCarousel images={imageBase64Render(currentItem)} />
            </View>
          </View>

          <View className="h-[1px] bg-[#333333] w-full mb-6" />

          <AuctionDisplayCard money={false} initialTime={timeLeft} />
          <AuctionDisplayCard money={true} amount={maxBid} />

          <View className="mt-4">
            <BidHistoryLog bids={bids} />
          </View>

          <View className="mt-6">
            {boughtByCompany ? (
              <View className="bg-[#1C1C1E] p-5 rounded-2xl items-center border border-[#333333] mb-4">
                <Text className="text-gray-400 font-bold text-lg uppercase tracking-widest mb-1">
                  Lote Desierto
                </Text>
                <Text className="text-gray-500 text-sm text-center">
                  El artículo no recibió ofertas y fue adquirido por la casa.
                </Text>
              </View>
            ) : (
              <>
                <BidInput
                  value={bidValue}
                  setValue={setBidValue}
                  min={minAllowed}
                  max={maxAllowed}
                  enabled={!isReadOnly && !isSold}
                  hasError={hasBidError}
                />
                <View className="mt-4">
                  <Button
                    label="Pujar"
                    variant={isReadOnly || isSold ? "blocked" : "primary"}
                    onPress={handleBidSubmit}
                  />
                </View>
              </>
            )}
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
          onClose={() => setWon(false)}
        />
      )}

      {isAuctionFinished && (
        <AuctionFinishedModal
          visible={isAuctionFinished}
          onProceed={() => {
            setIsAuctionFinished(false);
            router.replace("/");
          }}
        />
      )}
    </SafeAreaView>
  );
}
