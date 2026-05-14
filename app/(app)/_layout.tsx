import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="polls" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
