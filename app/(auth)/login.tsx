import { authService } from "@/api/services/auth";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import KeyboardWrapper from "@/components/common/KeyboardWrapper";
import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await authService.login({ email, password });
      await signIn(response.token);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "(app)" }],
        }),
      );
    } catch (e: any) {
      setError("Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <KeyboardWrapper>
        <View className="flex-1 justify-center p-8 gap-5">
          
          <Text className="text-4xl font-bold text-white mb-2">
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
            <View className="flex-row items-center bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-xl p-3 mt-4">
                  <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FF3B30" />
                  <Text className="text-[#FF3B30] text-sm font-medium ml-2 flex-1 leading-snug">
                    {error}
                  </Text>
                </View>
          ) : null}

          <View className="w-full gap-3 mt-4">
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
          
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
}