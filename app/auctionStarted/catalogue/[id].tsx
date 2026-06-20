import { imageBase64Render } from "@/api/utils/imageBase64Render";
import CatalogueProductCard from "@/components/auctions/CatalogueProductCard";
import CatalogueTitle from "@/components/auctions/CatalogueTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auctionService, AuctionType } from "../../../api/services/auction";

export default function CatalogueScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [subasta, setSubasta] = useState<AuctionType | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await auctionService.getAuctionById(Number(id));
        setSubasta(response.data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };

    fetchAuction();
  }, [id]);

  if (!subasta) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <Text className="text-white text-lg font-medium">
          Cargando detalles de la subasta...
        </Text>
      </SafeAreaView>
    );
  }

  const coverImage = subasta.items?.[0] 
    ? imageBase64Render(subasta.items[0])[0] 
    : "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop";

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="px-4 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="self-start p-1 -ml-1"
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <CatalogueTitle
          title={subasta.descripcion}
          imageUrl={coverImage} 
          isLive={subasta.estado === "abierta"}
        />

        <View className="flex-row justify-between items-center mt-8 mb-5">
          <Text className="text-white text-lg font-bold tracking-wide">
            Featured Items{" "}
            <Text className="text-[#E8B83C]">
              ({subasta.items?.length || 0} Items)
            </Text>
          </Text>

          <TouchableOpacity
            className="p-1"
            onPress={() => console.log("Abrir filtros...")}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={24}
              color="#E8B83C"
            />
          </TouchableOpacity>
        </View>

        <View className="gap-y-1">
          {subasta.items?.map((item) => {
            const itemImage = item ? imageBase64Render(item)[0] : "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop";

            return (
              <CatalogueProductCard
                key={item.idProducto}
                title={item.descripcioncatalogo}
                description={item.descripcioncompleta}
                price={item.precioBase?.toString() || "A definir"}
                imageUrl={itemImage} // Usamos la imagen segura del ítem
                onPress={() =>
                  router.push({
                    pathname: "/auctionStarted/catalogue/product/[id]",
                    params: {
                      id: item.idProducto,
                      idSubasta: id,
                    },
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}