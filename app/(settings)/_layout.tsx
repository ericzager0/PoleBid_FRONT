import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#14191C' }, headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="payments" />
      <Stack.Screen name="sellerOptions" />
    </Stack>
    </ThemeProvider>
  );
}