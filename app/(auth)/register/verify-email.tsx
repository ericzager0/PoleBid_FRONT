import { onboardingService } from "@/api/services/onboarding";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 32, gap: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={verifyEmail} style={{ width: 250, height: 250 }} />

          <View className="gap-6 flex-1">
            <Text className="text-white text-5xl font-bold">
              Ingresá el código que te enviamos.
            </Text>
            <Text className="text-white text-2xl">
              Te enviamos un código de verificación a {prevData.email}.
            </Text>
            <Input
              variant="register"
              label="Código"
              placeholder="Ingresá el código"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            {error && <Text className="text-red-500">{error}</Text>}
          </View>

          <Button
            label="Continuar"
            variant="secondary"
            disabled={!code}
            loading={loading}
            onPress={handleNext}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
