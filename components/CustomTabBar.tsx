import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform, Pressable, Text, View } from "react-native";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="relative" style={{ overflow: "visible" }}>
      <View
        className="flex-row items-center px-6 rounded-t-3xl"
        style={{
          backgroundColor: "#1E1E1E",
          height: Platform.OS === "ios" ? 84 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 8,
        }}
      >
        <Pressable
          className="flex-1 items-center justify-center gap-1"
          onPress={() => navigation.navigate(state.routes[0].name)}
        >
          <Ionicons
            name="home"
            size={22}
            color={state.index === 0 ? "#E8B83C" : "#ACB0B3"}
          />
          <Text
            className="text-xs font-medium"
            style={{ color: state.index === 0 ? "#E8B83C" : "#ACB0B3" }}
          >
            Home
          </Text>
        </Pressable>

        <View className="flex-1" />

        <Pressable
          className="flex-1 items-center justify-center gap-1"
          onPress={() => navigation.navigate(state.routes[2].name)}
        >
          <Ionicons
            name="person"
            size={22}
            color={state.index === 2 ? "#E8B83C" : "#ACB0B3"}
          />
          <Text
            className="text-xs font-medium"
            style={{ color: state.index === 2 ? "#E8B83C" : "#ACB0B3" }}
          >
            Perfil
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate(state.routes[1].name)}
        className="absolute self-center items-center justify-center"
        style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          backgroundColor: state.index === 1 ? "#E8B83C" : "#5A5A5A",
          borderWidth: 4,
          borderColor: "#1E1E1E",
          bottom: Platform.OS === "ios" ? 52 : 32,
          shadowColor: state.index === 1 ? "#E8B83C" : "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: state.index === 1 ? 0.5 : 0.3,
          shadowRadius: 8,
          elevation: 12,
        }}
      >
        <MaterialCommunityIcons
          name="gavel"
          size={28}
          color={state.index === 1 ? "#1E1E1E" : "#ACB0B3"}
        />
      </Pressable>
    </View>
  );
}
