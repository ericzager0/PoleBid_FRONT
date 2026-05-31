import { authService } from "@/api/services/auth";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await authService.login({ email, password });
      router.replace("/home");
    } catch (e: any) {
      setError("Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full items-center justify-center gap-5 p-8 bg-[#14191C]">
      <Text className="text-4xl font-bold text-white mb-6">
        Ingresa a PoleBid
      </Text>
      <Input
        variant="register"
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        variant="register"
        label="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(null);
        }}
        isPassword
      />
      {error ? (
        <Text className="text-red-500 text-sm self-start">{error}</Text>
      ) : null}
      <View className="w-full gap-2">
        <Button
          label="¿Olvidaste tu contraseña?"
          onPress={() => {}}
          variant="anchor"
        />
        <Button
          label="Iniciar sesión"
          disabled={!email || !password}
          loading={loading}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}
