import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import CustomTabBar from '../../components/common/CustomTabBar';

const customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#14191C', 
  },
};

export default function AppLayout() {
  return (
    <ThemeProvider value={customTheme}>
      <Tabs
        initialRouteName="home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="polls" />
        <Tabs.Screen name="profile" />

        {/*//Bid history log
        <Tabs.Screen 
          name="bidHistory"
          options={{
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />*/}
      </Tabs>
    </ThemeProvider>
  );
}