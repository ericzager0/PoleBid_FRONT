import { auctionService } from "@/api/services/auction";
import { ItemType } from "@/api/services/items";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import AuctionDisplayCard from "@/components/auctions/AuctionDisplayCard";
import AuctionFinishedModal from "@/components/auctions/AuctionFinishedModal";
import ItemFinishedModal from "@/components/auctions/ItemFinishedModal";
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
import React, { useEffect, useRef, useState } from "react";
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

// Función a prueba de balas para interpretar las fechas
const parseSafeDate = (dateStr: string | null | undefined): number => {
  if (!dateStr) return 0;
  try {
    let safeStr = dateStr;
    if (safeStr.includes('+')) safeStr = safeStr.split('+')[0];
    if (safeStr.includes('.')) safeStr = safeStr.split('.')[0];
    safeStr = safeStr.replace(" ", "T");
    const parsed = new Date(`${safeStr}Z`).getTime();
    return isNaN(parsed) ? 0 : parsed;
  } catch (e) {
    return 0;
  }
};

export default function LiveAuctionScreen() {
  const router = useRouter();
  const { id, readonly } = useLocalSearchParams();
  const isReadOnly = readonly === "true";
  
  const { user } = useAuth();
  const isLogged = !!user;
  
  const [currentItem, setCurrentItem] = useState<ItemType | null>(null);
  const [bidValue, setBidValue] = useState<number>(0);
  const [misPujasLocales, setMisPujasLocales] = useState<any[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  // Alertas
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", description: "" });
  const [hasBidError, setHasBidError] = useState(false);
  
  // Tiempos y Estados
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  // Control de Modales
  const [isAuctionFinished, setIsAuctionFinished] = useState(false);
  const [won, setWon] = useState(false);
  const [finalWinningBid, setFinalWinningBid] = useState<number>(0);
  const [showItemFinished, setShowItemFinished] = useState(false);
  const [hasEvaluatedEnd, setHasEvaluatedEnd] = useState(false);

  const endTimeRef = useRef<number>(Date.now() + 180000); 

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
      ganador: "no", 
      clientId: user?.clientId, // Agregado para reconocimiento local seguro
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

  const handleFinishedProceed = async () => {
    try {
      const guardado = await AsyncStorage.getItem("@mis_victorias");
      const listaVictorias = guardado ? JSON.parse(guardado) : [];
      setIsAuctionFinished(false);

      if (listaVictorias.length > 0) {
        router.replace(`/auctionStarted/live/pay/${id}`);
      } else {
        router.replace("/");
      }
    } catch (error) {
      setIsAuctionFinished(false);
      router.replace("/");
    }
  };

  const fetchCurrentItem = async (bidsOnly: boolean) => {
    try {
      const response = await auctionService.getCurrentItem(Number(id), bidsOnly);

      if (!response || !response.data) {
        setIsAuctionFinished(true);
        return false;
      }

      setCurrentItem((estadoAnterior) => {
        if (!estadoAnterior) return response.data;
        
        if (estadoAnterior.itemId !== response.data.itemId) {
           setMisPujasLocales([]);
           setHasEvaluatedEnd(false); // Reseteamos la evaluación de victoria al cambiar de ítem
           setWon(false);
           setShowItemFinished(false);
        }

        return { ...estadoAnterior, ...response.data };
      });
    } catch (error) {
      console.error("Error fetching current item: ", error);
      setIsAuctionFinished(true);
      return false;
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const fetchLoop = async () => {
      // Detenemos el polling un momento si ya está evaluando el final, para evitar parpadeos
      if (!isMounted || hasEvaluatedEnd) return;
      await fetchCurrentItem(true);
      if (isMounted && !hasEvaluatedEnd) {
        timeoutId = setTimeout(fetchLoop, 3000);
      }
    };

    const init = async () => {
      await fetchCurrentItem(false);
      fetchLoop();
    };

    init();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id, hasEvaluatedEnd]);

  const rawPujos = currentItem?.pujos;
  const bidsBackend = Array.isArray(rawPujos) ? rawPujos : rawPujos ? [rawPujos] : [];

  const basePrice = Number(currentItem?.precioBase || 0);
  const maxBid = bidsBackend.length > 0 ? Math.max(...bidsBackend.map((bid) => bid.importe)) : 0;
  const minAllowed = bidsBackend.length === 0 ? basePrice : maxBid + 0.1 * basePrice;
  const maxAllowed = bidsBackend.length === 0 ? basePrice + 0.2 * basePrice : maxBid + 0.2 * basePrice;

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
  
  // === VALIDACIÓN CRÍTICA CORREGIDA: CHEQUEAMOS CONTRA user.clientId ===
  const myWinningBid = isSold 
    ? bidsBackend.find((bid) => bid.ganador?.toLowerCase() === "si" && Number(bid.clientId) === Number(user?.clientId)) 
    : null;
  const iWonThisItem = !!myWinningBid;
  
  const externalWinnerBid = isSold ? bidsBackend.find((bid) => bid.ganador?.toLowerCase() === "si") : null;
  const winnerName = boughtByCompany 
    ? "La Casa (Lote Desierto)" 
    : externalWinnerBid 
      ? `Asistente ${externalWinnerBid.asistente}` 
      : "Calculando...";

  // Teclado
  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // 1. Recalcular la fecha máxima con cada puja
  useEffect(() => {
    if (!currentItem) return;

    let lastActivityMs = parseSafeDate((currentItem as any).updatedAt || (currentItem as any).updated_at);
    if (lastActivityMs === 0) lastActivityMs = Date.now();

    bids.forEach(bid => {
      const bidTime = parseSafeDate(bid.created_at || bid.createdAt);
      if (bidTime > lastActivityMs) lastActivityMs = bidTime;
    });

    endTimeRef.current = lastActivityMs + 180000;
    const msRestantes = endTimeRef.current - Date.now();
    setTimeLeft(msRestantes > 0 ? Math.floor(msRestantes / 1000) : 0);
  }, [currentItem, misPujasLocales]);

  // 2. El reloj visual
  useEffect(() => {
    const interval = setInterval(() => {
      const msRestantes = endTimeRef.current - Date.now();
      setTimeLeft(msRestantes <= 0 ? 0 : Math.floor(msRestantes / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 3. El Juez Evaluador
  useEffect(() => {
    if (isInitialLoading || !currentItem || hasEvaluatedEnd) return;

    const isTimeOverLocally = timeLeft === 0 && endTimeRef.current <= Date.now();
    
    if (isSold || isTimeOverLocally) {
      setHasEvaluatedEnd(true);

      let iWonLocally = false;
      let winningAmount = 0;

      // Intentamos comprobar si el backend ya dictó ganador con nuestro clientId
      if (isSold && myWinningBid) {
        iWonLocally = true;
        winningAmount = myWinningBid.importe;
      } 
      // Si el backend aún no actualizó pero el tiempo ya acabó, lo validamos usando clientId
      else if (!boughtByCompany) {
        const highestBid = bids.length > 0 
          ? bids.reduce((prev, current) => (prev.importe > current.importe) ? prev : current) 
          : null;
        
        if (highestBid && (highestBid.isMe || Number(highestBid.clientId) === Number(user?.clientId))) {
          iWonLocally = true;
          winningAmount = highestBid.importe;
        }
      }

      // Desplegamos el modal correspondiente
      if (iWonLocally) {
        setFinalWinningBid(winningAmount);
        
        // Registrar victoria en local storage para el carrito
        (async () => {
          try {
            const guardado = await AsyncStorage.getItem("@mis_victorias");
            let lista = guardado ? JSON.parse(guardado) : [];
            if (!lista.some((item: any) => item.id === currentItem.itemId)) {
              lista.push({ id: currentItem.itemId, precio: winningAmount });
              await AsyncStorage.setItem("@mis_victorias", JSON.stringify(lista));
            }
          } catch (e) {}
        })();
        
        setWon(true);
      } else {
        // Yo no gané. Abrimos modal de perdedor a la espera del próximo ítem.
        setShowItemFinished(true);
      }
    }
  }, [timeLeft, isSold, isInitialLoading, currentItem, hasEvaluatedEnd, bids, myWinningBid, boughtByCompany, user]);

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

  // Cuando el backend deja de pasar artículos
  if (!currentItem) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction
          title="Subasta Finalizada"
          text="Ya no quedan artículos activos en este evento."
        />
        {isAuctionFinished && (
          <AuctionFinishedModal
            visible={isAuctionFinished}
            onProceed={handleFinishedProceed}
          />
        )}
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
          contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 360 : 40 }}
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
                  {isLogged && !isReadOnly ? "$" + basePrice.toLocaleString("en-US") : "No disponible"}
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

          {isSold ? (
            <View className="bg-[#1C1C1E] p-4 rounded-2xl items-center border border-[#333333] mb-2">
              <Text className="text-[#E8B83C] font-bold text-lg tracking-widest">
                SUBASTADO
              </Text>
            </View>
          ) : (
            <AuctionDisplayCard money={false} initialTime={timeLeft} />
          )}
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
                  enabled={!isReadOnly && !isSold && !hasEvaluatedEnd}
                  hasError={hasBidError}
                />
                <View className="mt-4">
                  <Button
                    label="Pujar"
                    variant={isReadOnly || isSold || hasEvaluatedEnd ? "blocked" : "primary"}
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
          itemName={currentItem.descripcioncatalogo || currentItem.descripcion}
          winningBid={`$${(finalWinningBid || 0).toLocaleString("en-US")}`}
          onProceed={() => {
            setWon(false);
            router.push(`/auctionStarted/live/pay/${id}`);
          }}
        />
      )}

      {showItemFinished && !won && (
        <ItemFinishedModal
          visible={showItemFinished}
          winnerName={winnerName}
        />
      )}
    </SafeAreaView>
  );
}