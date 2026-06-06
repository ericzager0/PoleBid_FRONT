import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Address() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);

  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleNext = async () => {
    const address = `${street} ${number}, ${city}, ${state}, ${country}`;

    const data = {
      ...prevData,
      address,
    };

    router.push({
      pathname: "/(auth)/register/identification",
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">
          Dirección de residencia
        </Text>
        <Text className="text-white text-2xl">¿Donde vivís?</Text>
        <Input
          variant="register"
          label="Pais"
          placeholder="Ingresá tu país"
          value={country}
          onChangeText={setCountry}
        />
        <Input
          variant="register"
          label="Calle"
          placeholder="Ingresá tu calle"
          value={street}
          onChangeText={setStreet}
        />
        <Input
          variant="register"
          label="Número"
          placeholder="Ingresá tu número"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
        <Input
          variant="register"
          label="Ciudad"
          placeholder="Ingresá tu ciudad"
          value={city}
          onChangeText={setCity}
        />
        <Input
          variant="register"
          label="Provincia"
          placeholder="Ingresá tu provincia"
          value={state}
          onChangeText={setState}
        />
      </View>

      <Button label="Continuar" variant="secondary" onPress={handleNext} />
    </SafeAreaView>
  );
}
