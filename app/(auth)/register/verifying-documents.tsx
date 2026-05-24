import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyingDocuments() {
  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-12">
        <Text className="text-white text-5xl font-bold">
          Estamos verificando tus documentos
        </Text>
      </View>
    </SafeAreaView>
  );
}
