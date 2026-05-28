import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(settings)" />
      </Stack>
    </SafeAreaProvider>
  );
}
