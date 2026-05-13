import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <View className="h-full items-center justify-center gap-5 p-8 bg-[#14191C]">
      <Text className="text-4xl font-bold text-white mb-6">
        Ingresa a PoleBid
      </Text>
      <Input label="Email" />
      <Input label="Contraseña" secureTextEntry />
      <View className="w-full gap-2">
        <Button
          label="¿Olvidaste tu contraseña?"
          onPress={() => {}}
          variant="anchor"
        />
        <Button
          label="Iniciar sesión"
          onPress={() => {
            router.replace("/home");
          }}
        />
      </View>
    </View>
  );
}
