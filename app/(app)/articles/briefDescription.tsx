import Button from "@/components/common/Button";
import ConfirmModal from "@/components/common/ConfirmModal";
import ErrorMessege from "@/components/common/ErrorMessege";
import { Input } from "@/components/common/Input";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BriefDescriptionArticle() {
  const [briefDescription, setBriefDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  const handleNext = async () => {
    if (!briefDescription.trim()) {
      setError("Por favor, ingresá una breve descripción para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      //BACK DE ARTICULO
      router.push({
        pathname: "/articles/description",
        params: {
          data: JSON.stringify({ descripcioncatalogo: briefDescription }),
        },
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
          onPress={() => setModal(true)}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <KeyboardWrapper>
        <View className="flex-1 px-7 pt-7 pb-10">
          <View className="flex-1 gap-10">
            <Text className="text-white text-5xl font-bold">
              Breve descripción
            </Text>
            <Text className="text-white text-2xl">
              ¿Qué te gustaría subastar?
            </Text>

            <View className="gap-2">
              <Input
                variant="register"
                label="Breve descripción"
                placeholder="Describe tu artículo brevemente"
                value={briefDescription}
                onChangeText={(text) => {
                  setBriefDescription(text);
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

      {/* Modal */}
      <ConfirmModal
        visible={modal}
        onClose={() => setModal(false)}
        title="Salir sin guardar"
        description="Si sale se perderán los datos ingresados. Seguro que quiere salir?"
        confirmText="Salir"
        cancelText="Cancelar"
        onConfirm={() => {
          setModal(false);
          router.push("/(app)/articles/myArticles");
        }}
        onCancel={() => setModal(false)}
      />
    </SafeAreaView>
  );
}
