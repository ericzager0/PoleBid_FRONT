import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import verifyEmail from "../../../assets/images/verify-email.png";

export default function VerifyEmail() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <Image source={verifyEmail} style={{ width: 250, height: 250 }} />
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">
          Hacé click en el enlace que enviamos a tu correo electrónico.
        </Text>
        <Text className="text-white text-2xl">
          Te enviamos un correo electrónico de verificación a usuario@gmail.com.
        </Text>
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/verify-email-ok")}
      />
    </SafeAreaView>
  );
}
