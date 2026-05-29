import { Button } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import documentation from "../../../assets/images/documentation.png";

export default function Documentation() {
  const { data } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-[45px] font-bold">
          Documento de identidad.
        </Text>
        <Text className="text-white text-2xl">
          Tomá una fotografía del frente y reverso de tu documento de identidad.
        </Text>
        <Image source={documentation} style={{ width: 250, height: 450 }} />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: "/(auth)/register/documentation-front",
            params: { data },
          })
        }
      />
    </SafeAreaView>
  );
}
