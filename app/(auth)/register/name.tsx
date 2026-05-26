import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleNext = () => {
    const data = { ...prevData, name, lastName };
    router.push({
      pathname: "/(auth)/register/email",
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-12">
        <Text className="text-white text-5xl font-bold">Nombre</Text>
        <Text className="text-white text-2xl">¿Cómo te llamás?</Text>
        <Input
          variant="register"
          label="Nombre"
          placeholder="Ingresá tu nombre"
          value={name}
          onChangeText={setName}
        />
        <Input
          variant="register"
          label="Apellido"
          placeholder="Ingresá tu apellido"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <Button
        label="Continuar"
        variant="secondary"
        disabled={!name || !lastName}
        onPress={handleNext}
      />
    </SafeAreaView>
  );
}
