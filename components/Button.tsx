import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "anchor";
}

export function Button({ label, onPress, variant = "primary" }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-3 rounded-[16px] active:opacity-70 ${
        variant === "primary"
          ? "bg-[#E8B439]"
          : variant === "secondary"
            ? "bg-white"
            : variant === "ghost"
              ? "bg-transparent"
              : "bg-transparent self-start px-0 py-0"
      }`}
    >
      <Text
        className={`text-2xl font-medium text-center ${
          variant === "primary"
            ? "text-black"
            : variant === "secondary"
              ? "text-black"
              : variant === "ghost"
                ? "text-white"
                : "text-blue-500 text-sm"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
