import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">Nombre</Text>
        <Text className="text-white text-2xl">¿Cómo te llamás?</Text>
        <Input label="Nombre" placeholder="Ingresá tu nombre" />
        <Input label="Apellido" placeholder="Ingresá tu apellido" />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/email")}
      />
    </SafeAreaView>
  );
}
