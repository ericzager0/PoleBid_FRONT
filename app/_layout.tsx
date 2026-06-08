import { AuthProvider, useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const wasAuthenticated = prevAuthRef.current;
    prevAuthRef.current = isAuthenticated;

    const redirect = async () => {
      if (wasAuthenticated === null && !isAuthenticated) {
        //vemos si el usuario estaba esperando aprobación de documentos
        const email = await AsyncStorage.getItem("awaiting_approval");

        // si hay un email, redirigimos a la pantalla de esperando aprobación
        if (email) {
          router.replace({
            pathname: "/(auth)/register/verifying-documents",
            params: { data: JSON.stringify({ email }) },
          });
        }
      } else if (wasAuthenticated === null && isAuthenticated) {
        router.replace("/(app)/home");
      } else if (wasAuthenticated === true && !isAuthenticated) {
        router.dismissAll();
        router.replace("/");
      }
    };

    redirect();
  }, [isAuthenticated, isLoading]);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(settings)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" /> 
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}