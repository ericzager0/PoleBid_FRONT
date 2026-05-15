import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Address() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-5">
        <Text className="text-white text-5xl font-bold">
          Dirección de residencia
        </Text>
        <Text className="text-white text-2xl">¿Donde vivís?</Text>
        <Input label="Pais" placeholder="Ingresá tu país" />
        <Input label="Calle" placeholder="Ingresá tu calle" />
        <Input label="Número" placeholder="Ingresá tu número" />
        <Input label="Ciudad" placeholder="Ingresá tu ciudad" />
        <Input label="Provincia" placeholder="Ingresá tu provincia" />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/identification")}
      />
    </SafeAreaView>
  );
}
