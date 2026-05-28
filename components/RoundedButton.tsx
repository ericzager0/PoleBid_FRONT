import { Pressable, Text, View } from "react-native";

interface RoundedButtonProps {
  label?: string;
  onPress: () => void;
}

export default function RoundedButton({
  label = "Cerrar sesión",
  onPress,
}: RoundedButtonProps) {

  return (
    <Pressable
      onPress={onPress}
      className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full px-4 py-2"
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-white font-bold">{label}</Text>
      </View>
    </Pressable>
  );
}
