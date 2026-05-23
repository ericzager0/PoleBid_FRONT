import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Address() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">
          Dirección de residencia
        </Text>
        <Text className="text-white text-2xl">¿Donde vivís?</Text>
        <Input variant="register" label="Pais" placeholder="Ingresá tu país" />
        <Input
          variant="register"
          label="Calle"
          placeholder="Ingresá tu calle"
        />
        <Input
          variant="register"
          label="Número"
          placeholder="Ingresá tu número"
        />
        <Input
          variant="register"
          label="Ciudad"
          placeholder="Ingresá tu ciudad"
        />
        <Input
          variant="register"
          label="Provincia"
          placeholder="Ingresá tu provincia"
        />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/identification")}
      />
    </SafeAreaView>
  );
}
