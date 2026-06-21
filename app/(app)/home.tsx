import { auctionService, AuctionType } from "@/api/services/auction";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import Auction from "@/components/auctions/Auction";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuctions = async () => {
    try {
      const response = await auctionService.getAuctions();
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchAuctions();
    setIsRefreshing(false);
  };

  const activeAuctionsData = auctions
    .filter((auction) => auction.estado === "abierta")
    .slice(0, 5);
  const upcomingAuctionsData = auctions
    .filter((auction) => auction.estado === "cerrada")
    .slice(0, 5);

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#E8B83C"
            colors={["#E8B83C"]}
            progressBackgroundColor="#1C1C1E"
          />
        }
      >
      <View className="items-center justify-center pt-8 pb-10">
          <View
            className="items-center justify-center rounded-full"
            style={{
              shadowColor: "#E8B83C",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.45,
              shadowRadius: 35,
              elevation: 40,
            }}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={{ width: 110, height: 110 }}
              resizeMode="contain"
            />
          </View>

          <Text className="text-white/70 text-center text-xs font-bold tracking-[0.2em] uppercase mt-8 px-6 leading-relaxed">
            ¿Tenés lo que hay que tener{"\n"}
            <Text className="text-[#E8B83C] text-sm">para quedar primero?</Text>
          </Text>
        </View>

        {isLoading ? (
          <View className="mt-12 items-center justify-center">
            <ActivityIndicator size="large" color="#E8B83C" />
            <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.15em] uppercase mt-4">
              Cargando subastas...
            </Text>
          </View>
        ) : (
          <>
            {activeAuctionsData.length > 0 && (
              <>
                <Text className="text-white text-2xl font-bold tracking-wide mb-4">
                  Subastas activas
                </Text>

                {activeAuctionsData.map((item) => (
                  <Auction
                    key={item.identificador}
                    categoryId={item.categoria}
                    imageSrc={imageBase64Render(item.foto)[0]}
                    title={item.descripcion}
                    fecha={item.fecha}
                    hora={item.hora}
                    isActive={item.estado}
                    onPress={() =>
                      router.push(`/auctionStarted/${item.identificador}`)
                    }
                  />
                ))}
              </>
            )}

            {upcomingAuctionsData.length > 0 && (
              <>
                <Text className="text-white text-2xl font-bold tracking-wide mt-4 mb-4">
                  Próximas subastas
                </Text>

                {upcomingAuctionsData.map((item) => (
                  <Auction
                    key={item.identificador}
                    categoryId={item.categoria}
                    imageSrc={imageBase64Render(item.foto)[0]}
                    title={item.descripcion}
                    fecha={item.fecha}
                    hora={item.hora}
                    isActive={item.estado}
                    onPress={() =>
                      router.push(`/auctionStarted/${item.identificador}`)
                    }
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
