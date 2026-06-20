import { auctionService } from "@/api/services/auction";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import ProductDetailCard from "@/components/auctions/ProductDetailCard";
import ImageCarousel from "@/components/common/ImageCarousel";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Producto {
  idProducto: number;
  precioBase: number;
  descripcioncatalogo: string;
  descripcioncompleta: string;
  fotos: string[];
  precio?: number;
  fecha?: string;
  comision?: number;
}

interface Subasta {
  descripcion: string;
  estado: string;
  items: Producto[];
}

export default function AuctionItemScreen() {
  const { id, idSubasta } = useLocalSearchParams();
  const [subasta, setSubasta] = useState<Subasta | null>(null);
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await auctionService.getAuctionById(Number(idSubasta));
        setSubasta(response.data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };

    fetchAuction();
  }, [idSubasta]);

  useEffect(() => {
    if (!subasta) return;

    const found = subasta.items.find(
      (item) => String(item.idProducto) === String(id),
    );

    setProducto(found ?? null);
  }, [subasta, id]);

  if (!producto) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <Text className="text-white">Cargando detalles del producto...</Text>
      </SafeAreaView>
    );
  }

  const imagesToDisplay = imageBase64Render(producto);

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1C1C1E]">
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
