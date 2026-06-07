import { onboardingService } from "@/api/services/onboarding";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Email() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    try {
      setLoading(true);
      setError(null);
      await onboardingService.email({ email });
      const data = { ...prevData, email };
      router.push({
        pathname: "/(auth)/register/address",
        params: { data: JSON.stringify(data) },
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-12">
        <Text className="text-white text-5xl font-bold">
          Correo electrónico
        </Text>
        <Text className="text-white text-2xl">
          ¿Cómo podemos estar en contacto?
        </Text>
        <Input
          variant="register"
          label="Correo electrónico"
          placeholder="Ingresá tu correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error && <Text className="text-red-500">{error}</Text>}
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        disabled={!email || loading}
        onPress={handleNext}
        loading={loading}
      />
    </SafeAreaView>
  );
}
