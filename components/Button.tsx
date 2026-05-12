import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onPress, variant = "primary" }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full px-4 py-3 rounded-xl active:opacity-70 ${
        variant === "primary" ? "bg-[#E8B439]" : "bg-white"
      }`}
    >
      <Text
        className={`font-medium text-center ${
          variant === "primary" ? "text-black" : "text-gray-900"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
