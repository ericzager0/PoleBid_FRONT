import { onboardingService } from "@/api/services/onboarding";
import Button from "@/components/common/Button";
import ErrorMessege from "@/components/common/ErrorMessege";
import { Input } from "@/components/common/Input";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import verifyEmail from "../../../assets/images/verify-email.png";

export default function VerifyEmail() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    try {
      setLoading(true);
      setError(null);
      await onboardingService.verifyEmail({ email: prevData.email, code });
      const data = { ...prevData };
      router.push({
        pathname: "/(auth)/register/verify-email-ok",
        params: { data: JSON.stringify(data) },
      });
    } catch (e: any) {
        setError("El código ingresado es incorrecto o ha expirado. Verificá e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <KeyboardWrapper offset={10}>
        <View className="flex-1 p-8">
          <View className="gap-6">
            <View className="items-center mb-2">
              <Image 
                source={verifyEmail} 
                style={{ width: 200, height: 200 }} 
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="text-white text-5xl font-bold leading-tight">
                Ingresá el código que te enviamos.
              </Text>
              <Text className="text-white text-2xl mt-2 leading-snug">
                Te enviamos un código de verificación a {prevData.email}.
              </Text>
            </View>

            <View>
              <Input
                variant="register"
                label="Código"
                placeholder="Ingresá el código"
                value={code}
                onChangeText={(text) => {
                  setCode(text);
                  setError(null); 
                }}
                keyboardType="number-pad"
              />
              
              {error && <ErrorMessege error={error} />}
            </View>
          </View>

          <View className="flex-1 min-h-[32px]" />

          <Button
            label="Continuar"
            variant="secondary"
            disabled={!code}
            loading={loading}
            onPress={handleNext}
          />

        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
}