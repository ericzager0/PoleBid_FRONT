import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Country() {
  return (
    <View className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">País de origen</Text>
        <Text className="text-white text-2xl">
          Necesitamos un poco de información para saber si sos elegible para una
          cuenta.
        </Text>
      </View>

      <Button
        label="Comenzar"
        variant="secondary"
        onPress={() => router.push("/(auth)/register/name")}
      />
    </View>
  );
}
