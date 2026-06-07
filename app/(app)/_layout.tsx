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

      //Bid history log
      <Tabs.Screen 
        name="bidHistory"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      </Tabs>
  );
}
