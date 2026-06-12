import Auction from "@/components/auctions/Auction";
import Button from "@/components/common/Button";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { f1AuctionsData } from "../data/auctions";

export default function Home() {
  const router = useRouter();

  const activeAuctionsData = f1AuctionsData.filter(auction => auction.live).slice(0, 5);
  const upcomingAuctionsData = f1AuctionsData.filter(auction => !auction.live).slice(0, 5);

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="items-center justify-center pt-8 pb-10">
          <View
            className="items-center justify-center rounded-full"
            style={{
              shadowColor: '#E8B83C', 
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

          <Button label="Test" onPress={() => router.push("/(auth)/register/check-photo")} />
          
        </View>

        {activeAuctionsData.length > 0 && (
          <>
            <Text className="text-white text-2xl font-bold tracking-wide mb-4">
              Subastas activas
            </Text>

            {activeAuctionsData.map((item) => (
              <Auction
                key={item.id}
                categoryId={item.categoryId}
                imageSrc={item.imageSrc}
                title={item.title}
                fecha={item.fecha}
                hora={item.hora}
                owner={item.owner}
                isActive={item.live}
                onPress={() => router.push(`/auctionStarted/${item.id}`)}
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
                key={item.id}
                categoryId={item.categoryId}
                imageSrc={item.imageSrc}
                title={item.title}
                fecha={item.fecha}
                hora={item.hora}
                owner={item.owner}
                isActive={item.live}
                onPress={() => router.push(`/auctionStarted/${item.id}`)}
              />
            ))}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}