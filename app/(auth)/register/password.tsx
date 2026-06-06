import { authService } from "@/api/services/auth";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const { data } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Por favor completá todos los campos.");
      return;
    }

    if (password.length < 8) {
      setError("La clave debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las claves no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Registramos al usuario
      await authService.register({
        email: JSON.parse(data as string).email,
        password,
      });

      // Luego, lo logueamos automáticamente
      await authService.login({
        email: JSON.parse(data as string).email,
        password,
      });

      // Redirigimos al home
      router.replace("/(app)/home");
    } catch (e: any) {
      setError("Ocurrió un error al registrarse. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-8">
        <Text className="text-white text-5xl font-bold">Clave personal</Text>
        <Text className="text-white text-2xl">
          Elige la clave que deberás usar para acceder a tu cuenta.
        </Text>
        <Input
          variant="register"
          label="Clave"
          placeholder="Ingresá tu clave"
          isPassword
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
        />
        <View>
          <Input
            variant="register"
            label="Repetir clave"
            placeholder="Ingresá tu clave nuevamente"
            isPassword
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError(null);
            }}
          />
          {error ? (
            <Text className="text-red-500 text-sm mt-2">{error}</Text>
          ) : null}
        </View>
      </View>

      <Button
        label="Completar registro"
        variant="secondary"
        disabled={!password || !confirmPassword}
        loading={loading}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}
