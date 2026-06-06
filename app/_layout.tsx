import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, router } from "expo-router";
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

    if (wasAuthenticated === null && isAuthenticated) {
      // Primera carga con token
      router.replace("/(app)/home");
    } else if (wasAuthenticated === true && !isAuthenticated) {
      // Logout explícito o 401: reset completo, sin back posible
      router.dismissAll(); // limpia todo el stack
      router.replace("/");
    }
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
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
