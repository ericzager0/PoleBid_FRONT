import Button from "@/components/common/Button";
import ErrorMessege from "@/components/common/ErrorMessege";
import { Input } from "@/components/common/Input";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DescriptionArticle() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (!description.trim()) {
      setError("Por favor, ingresá una descripción para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      //BACK DE ARTICULO
      router.push({
        pathname: "/articles/uploadArticleImages",
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
       <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <KeyboardWrapper>
        <View className="flex-1 px-7 pt-7 pb-10">
          <View className="flex-1 gap-10">
            <Text className="text-white text-5xl font-bold">Descripción</Text>
            <Text className="text-white text-2xl">¿Qué te gustaría subastar?</Text>
            
            <View className="gap-2">
              <Input
                variant="register"
                label="Descripción"
                placeholder="Describe tu artículo"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (error) setError(null);
                }}
                keyboardType="default"
                autoCapitalize="none"
              />
              {error && <ErrorMessege error={error} />}
            </View>
          </View>

          <View className="mt-6 mb-4">
            <Button
              label="Continuar"
              variant="secondary"
              disabled={loading}
              onPress={handleNext}
              loading={loading}
            />
          </View>

        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
}