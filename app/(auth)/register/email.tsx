import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Email() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">
          Correo electrónico
        </Text>
        <Text className="text-white text-2xl">
          ¿Cómo podemos estar en contacto?
        </Text>
        <Input
          label="Correo electrónico"
          placeholder="Ingresá tu correo electrónico"
        />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/verify-email")}
      />
    </SafeAreaView>
  );
}
