import Button from "@/components/common/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DocumentsSuccess() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 p-6 justify-between">
      <View className="gap-8 mt-32">
        <View className="w-32 h-32 rounded-full bg-red-500 self-center items-center justify-center">
          <Text className="text-white text-5xl">✗</Text>
        </View>

        <Text className="text-white text-5xl font-bold text-center">
          ¡Tus documentos fueron rechazados!
        </Text>

        <Text className="text-gray-400 text-2xl text-center">
          No hemos podido aprobar tus documentos.
        </Text>
      </View>
      <Button
        label="Entendido"
        variant="secondary"
        onPress={() => {
          router.replace("/");
        }}
      />
    </SafeAreaView>
  );
}
