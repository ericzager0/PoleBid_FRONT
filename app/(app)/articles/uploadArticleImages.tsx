import UploadArticleImagesGrid from "@/components/articles/UploadArticleImagesGrid";
import Button from "@/components/common/Button";
// Me fijé en tu otro código que lo tenés escrito como ErrorMessege (con 'e')
import { itemsService } from "@/api/services/items";
import ErrorMessege from "@/components/common/ErrorMessege";
import { useAuth } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadArticleImages() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);
  const [images, setImages] = useState<(string | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getMe } = useAuth();

  const handleNext = async () => {
    const uploadedCount = images.filter((img) => img !== null).length;
    if (uploadedCount < 6) {
      setError("Por favor subir al menos 6 fotos.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await itemsService.postItem({
        ...prevData,
        foto1: images[0],
        foto2: images[1],
        foto3: images[2],
        foto4: images[3],
        foto5: images[4],
        foto6: images[5],
      });
      await getMe();
      router.push("/(app)/articles/myArticles");
    } catch (e: any) {
      setError(e.message || "Ocurrió un error al subir las imágenes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.push("/(app)/articles/description")}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-7 pt-7 pb-10">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
        >
          <View className="flex-1 gap-10">
            <Text className="text-white text-5xl font-bold">Fotografías</Text>
            <Text className="text-[#9CA3AF] text-lg">
              Te solicitamos al menos 6 fotografías del artículo
            </Text>

            <UploadArticleImagesGrid
              onImagesChange={(newImages) => {
                setImages(newImages);
                if (error) setError(null);
              }}
            />

            <View className="flex-row items-center bg-[#1C1C1E] border border-[#2A2B30] rounded-2xl p-5 w-full">
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={28}
                color="#E8B83C"
              />
              <Text className="text-[#D1D5DB] text-[15px] font-medium ml-4 flex-1 leading-6 tracking-wide">
                Las fotos nítidas y con buena iluminación aumentan tus
                probabilidades de venta en un 40%.
              </Text>
            </View>

            <View className="gap-y-4 mt-2">
              {error && <ErrorMessege error={error} />}
              <Button
                label="Continuar"
                onPress={handleNext}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
