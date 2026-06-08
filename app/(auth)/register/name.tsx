import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleNext = () => {
    const data = { ...prevData, firstName, lastName };
    router.push({
      pathname: "/(auth)/register/email",
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <KeyboardWrapper>
        <View className="flex-1 p-8">
          <View className="gap-10">
            <View>
              <Text className="text-white text-5xl font-bold">Nombre completo</Text>
              <Text className="text-white text-2xl mt-2">¿Cómo te llamás?</Text>
            </View>

            <View className="gap-6">
              <Input
                variant="register"
                label="Nombre"
                placeholder="Ingresá tu nombre"
                value={firstName}
                onChangeText={setFirstName}
              />
              <Input
                variant="register"
                label="Apellido"
                placeholder="Ingresá tu apellido"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View className="flex-1 min-h-[32px]" />

          <Button
            label="Continuar"
            variant="secondary"
            disabled={!firstName || !lastName}
            onPress={handleNext}
          />
          
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
}