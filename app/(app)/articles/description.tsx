import Button from "@/components/common/Button";
import ErrorMessege from "@/components/common/ErrorMessege";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DescriptionArticle() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isFocused, setIsFocused] = useState(false);

  const handleNext = async () => {
    if (!description.trim()) {
      setError("Por favor, ingresá una descripción para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = { ...prevData, descripcioncompleta: description };
      router.push({
        pathname: "/articles/uploadArticleImages",
        params: { data: JSON.stringify(data) },
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
          onPress={() => router.push("/(app)/articles/briefDescription")}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <KeyboardWrapper>
        <View className="flex-1 px-7 pt-7 pb-10">
          <View className="flex-1 gap-10">
            <View>
                <Text className="text-white text-5xl font-bold">Descripción</Text>
                <Text className="text-white text-xl mt-2">¿Qué te gustaría subastar?</Text>
            </View>
            
            <View className="gap-2">
              <Text className="text-white text-sm font-bold tracking-wide ml-1">
                Descripción detallada
              </Text>
              
              <TextInput
                className={`w-full bg-[#1C1C1E] text-white rounded-2xl p-4 text-base border-2 ${
                  isFocused ? 'border-[#E8B83C]' : 'border-[#2A2B30]'
                }`}
                style={{ height: 160, textAlignVertical: 'top' }}
                placeholder="Ej: Reloj vintage en perfecto estado con correa de cuero original..."
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (error) setError(null);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline={true} 
                keyboardType="default"
                autoCapitalize="sentences"
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
