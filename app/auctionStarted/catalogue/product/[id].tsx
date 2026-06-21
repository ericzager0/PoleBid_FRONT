import { auctionService, AuctionType } from "@/api/services/auction";
import { ItemType } from "@/api/services/items";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import ProductDetailCard from "@/components/auctions/ProductDetailCard";
import ImageCarousel from "@/components/common/ImageCarousel";
import NoAuction from "@/components/common/NoAuction";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuctionItemScreen() {
  const { id, idSubasta } = useLocalSearchParams();
  
  const [subasta, setSubasta] = useState<AuctionType | null>(null);
  const [producto, setProducto] = useState<ItemType | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await auctionService.getAuctionById(Number(idSubasta));
        setSubasta(response.data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (idSubasta) {
      fetchAuction();
    }
  }, [idSubasta]);

  useEffect(() => {
    if (!subasta) return;
    const found = subasta.items.find(
      (item) => String(item.idProducto) === String(id),
    );

    setProducto((found as unknown as ItemType) || null);
  }, [subasta, id]);

  if (isInitialLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <ActivityIndicator size="large" color="#E8B83C" />
        <Text className="text-white text-lg mt-4 font-bold tracking-wide">
          Cargando el producto...
        </Text>
      </SafeAreaView>
    );
  }

  if (!producto) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction
          title="Producto no encontrado"
          text="El producto que buscas no existe o ya no está disponible."
        />
      </SafeAreaView>
    );
  }

  const imagesToDisplay = imageBase64Render(producto);

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1C1C1E]">
        <View className="px-4 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="self-start p-1 -ml-1"
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        </View>
        <Text className="text-white text-lg font-bold tracking-wide">
          {producto.descripcioncatalogo}
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ImageCarousel images={imagesToDisplay} />

        <View className="w-full h-1 bg-[#2A2B30] mt-4 mb-6 rounded-full flex-row">
          <View className="w-1/3 h-full bg-[#E8B83C] rounded-full" />
        </View>

        <ProductDetailCard
          price={"$" + producto.precioBase.toString()}
          date={producto.fecha}
        />

        <View className="mt-6 mb-4 px-1">
          <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.15em] uppercase mb-2">
            Descripción Completa
          </Text>
          <Text className="text-[#D1D5DB] text-base italic leading-relaxed">
            {producto.descripcioncompleta}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}