import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-8">
        <Text className="text-white text-5xl font-bold">Clave personal</Text>
        <Text className="text-white text-2xl">
          Elige la clave que deberás usar para acceder a tu cuenta.
        </Text>
        <Input
          variant="register"
          label="Clave"
          placeholder="Ingresá tu clave"
          isPassword
        />
        <Input
          variant="register"
          label="Repetir clave"
          placeholder="Ingresá tu clave nuevamente"
          isPassword
        />
      </View>

      <Button
        label="Completar registro"
        variant="secondary"
        onPress={() => router.replace("/(app)/home")}
      />
    </SafeAreaView>
  );
}
