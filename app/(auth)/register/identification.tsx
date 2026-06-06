import { Button } from "@/components/common/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import identification from "../../../assets/images/identification.png";

export default function Identifiction() {
  const { data } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <Image source={identification} style={{ width: 250, height: 250 }} />
      <View className="gap-6">
        <Text className="text-white text-[45px] font-bold">
          Demostrá que sos vos.
        </Text>
        <Text className="text-white text-2xl">
          Necesitamos verificar tu identidad para continuar. Vas a necesitar tu
          identificación y te debería tomar uno o dos minutos.
        </Text>
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: "/(auth)/register/documentation",
            params: { data },
          })
        }
      />
    </SafeAreaView>
  );
}
