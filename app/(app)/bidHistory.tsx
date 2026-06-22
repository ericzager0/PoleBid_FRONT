import DetailsList from "@/components/common/DetailList";
import ImageCarousel from "@/components/common/ImageCarousel";
import NoAuction from "@/components/common/NoAuction";
import RoundedButton from "@/components/common/RoundedButton";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { itemsService, ItemType } from "@/api/services/items";
import { imageBase64Render } from "@/api/utils/imageBase64Render";

export default function BidHistoryScreen() {
  const router = useRouter();
  const { id, won } = useLocalSearchParams();

  const [item, setitem] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async (id: number) => {
    try {
      const response = await itemsService.getProductById(id);
      setitem(response.data);
    } catch (error) {
      console.error("Error fetching items: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItems(Number(id));
    }
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <ActivityIndicator size="large" color="#E8B83C" />
        <Text className="text-white text-lg mt-4 font-bold tracking-wide">
          Cargando el producto...
        </Text>
      </SafeAreaView>
    );
  }

  if (!item && !isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction
          title="Producto no encontrado"
          text="Problema al traer el producto"
        />
      </SafeAreaView>
    );
  }

  const articleDetails = [
    { label: "Fecha", value: String(new Date().toLocaleDateString()) },
    { label: "ID", value: `A${id}/${new Date().getFullYear()}` },
    {
      label: "Comisión",
      value: String((item?.comision || 0) * 100) + "%" || "No disponible",
    },
    {
      label: "Precio Base",
      value: "$" + String(item?.precioBase) || "No disponible",
    },
    {
      label: "Precio final",
      value: "$" + String(item?.precioFinal) || "No disponible",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      >
        <View className="flex-row justify-between items-start mb-6 mt-2">
          <Text className="text-white text-2xl flex-1 mr-4" numberOfLines={2}>
            <Text className="font-bold">Subasta: </Text>
            {item?.descripcioncatalogo}
          </Text>
          <View className="mt-1">
            <RoundedButton
              variant="secondary"
              label="Catalogo"
              onPress={() => router.push(`/auctionStarted/catalogue/1`)}
            />
          </View>
        </View>

        <Text className="text-white text-xl mb-4">
          <Text className="font-bold">Articulo: </Text>
          {item?.descripcioncompleta}
        </Text>

        {won === "true" && (
          <View className="flex-row items-center gap-x-3 bg-[#E8B83C]/10 p-4 rounded-xl border border-[#E8B83C]/30 mb-6">
            <FontAwesome5 name="trophy" size={36} color="#E8B83C" />
            <View>
              <Text className="text-white text-lg font-bold tracking-tight">
                ¡Ganaste el artículo!
              </Text>
              <Text className="text-gray-300 text-sm">
                Has quedado en primer lugar.
              </Text>
            </View>
          </View>
        )}

        <View className="flex-row mb-6">
          <View className="flex-1 pr-4 justify-between">
            <DetailsList data={articleDetails} />
          </View>

          <View className="flex-1">
            <ImageCarousel images={imageBase64Render(item?.fotos)} />
          </View>
        </View>

        <View className="h-[1px] bg-[#333333] w-full mb-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
