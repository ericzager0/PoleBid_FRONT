import { onboardingService } from "@/api/services/onboarding";
import Button from "@/components/common/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import verifyEmailOk from "../../../assets/images/verify-email-ok.png";

export default function VerifyEmailOk() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);
  const [loading, setLoading] = useState(true);

  // Enviamos los documentos al backend para revisarlos
  useEffect(() => {
    const sendDocuments = async () => {
      await onboardingService
        .documents({ ...prevData })
        .then(() => {})
        .catch((error: any) => {
          console.error("Error documents:", error.message);
        });
      setLoading(false);
    };
    sendDocuments();
  }, []);

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <Image source={verifyEmailOk} style={{ width: 250, height: 250 }} />
      <View className="gap-6">
        <Text className="text-white text-[45px] font-bold">
          Correo electrónico verificado correctamente.
        </Text>
        <Text className="text-white text-2xl">
          ¡Gracias! Ahora podés seguir creando tu cuenta.
        </Text>
      </View>

      <Button
        loading={loading}
        label="Continuar"
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: "/(auth)/register/verifying-documents",
            params: { data: JSON.stringify(prevData) },
          })
        }
      />
    </SafeAreaView>
  );
}
