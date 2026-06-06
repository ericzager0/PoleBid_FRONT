import CustomTabBar from "@/components/common/CustomTabBar";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="polls" />
      <Tabs.Screen name="profile" />

      //Settings
      {/*
      <Tabs.Screen 
        name="settings"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen 
        name="payments"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      */}
      </Tabs>
  );
}
