import { router } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/icon.png";
import Button from "../components/common/Button";
import Message from "../components/home/Message";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 justify-between items-center p-4 bg-[#14191C]">
      <Image
        source={logo}
        resizeMode="contain"
        style={{ width: 256, height: 256 }}
      />
      <View className="gap-8">
        <Message message="Descubrí oportunidades y empezá a pujar." />
        <Button
          label="Ya tengo una cuenta"
          onPress={() => {
            router.push("/(auth)/login");
          }}
          variant="secondary"
        />
        <Button
          label="Crear cuenta"
          onPress={() => {
            router.push("/(auth)/register/country");
          }}
          variant="secondary"
        />
      </View>

      <Button
        label="Continuar como invitado"
        onPress={() => {
          router.push("/home");
        }}
        variant="ghost"
      />
    </SafeAreaView>
  );
}
