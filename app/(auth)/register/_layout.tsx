import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";

export default function RegisterLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
    <Stack 
      screenOptions={{
        contentStyle: { backgroundColor: '#14191C' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="country" />
      <Stack.Screen name="name" />
      <Stack.Screen name="email" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="verify-email-ok" />
      <Stack.Screen name="identification" />
      <Stack.Screen name="documentation" />
      <Stack.Screen name="documentation-front" />
      <Stack.Screen name="payment-details" />
      <Stack.Screen name="paymentsChoice" />
    </Stack>
    </ThemeProvider>
  );
}
