import Button from "@/components/common/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DocumentsSuccess() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 p-6 justify-between">
      <View className="gap-8 mt-32">
        <View className="w-32 h-32 rounded-full bg-green-500 self-center items-center justify-center">
          <Text className="text-white text-5xl">✓</Text>
        </View>

        <Text className="text-white text-5xl font-bold text-center">
          ¡Felicitaciones, ya terminaste!
        </Text>

        <Text className="text-gray-400 text-2xl text-center">
          Gracias por verificar tu identidad.
        </Text>

        <View className="flex-row self-center items-center gap-2">
          <Text className="text-gray-500 text-base">Categoría asignada</Text>
          <View className="bg-slate-500/30 border border-slate-400/40 rounded-full px-3 py-1">
            <Text className="text-slate-300 text-sm font-semibold tracking-widest">
              {prevData.categoria}
            </Text>
          </View>
        </View>
      </View>
      <Button
        label="Hecho"
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: "/(auth)/register/password",
            params: { data: JSON.stringify(prevData) },
          })
        }
      />
    </SafeAreaView>
  );
}

// falta dar estilo a la categoria segun cual sea...
