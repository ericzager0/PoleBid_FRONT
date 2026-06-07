import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "anchor" | "blocked";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled,
  loading = false,
}: Props) {
  const isTextBlack = variant === "primary" || variant === "secondary";

  return (
    <Pressable
      disabled={disabled || loading || variant === "blocked"}
      onPress={onPress}
      className={`px-4 py-3 rounded-[16px] active:opacity-70 ${
        variant === "primary"
          ? "bg-[#E8B439]"
          : variant === "secondary"
            ? "bg-white"
            : variant === "ghost"
              ? "bg-transparent"
              : variant === "blocked"
                ? "bg-[#2A2B30] opacity-80" 
                : "bg-transparent self-start px-0 py-0"
      }`}
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text
          className={`text-2xl font-medium text-center ${
            isTextBlack
              ? "text-black"
              : variant === "ghost"
                ? "text-white"
                : variant === "blocked"
                  ? "text-[#757575]" 
                  : "text-blue-500 text-sm"
          }`}
        >
          {label}
        </Text>
        {loading && (
          <ActivityIndicator
            size="small"
            color={isTextBlack ? "#000000" : "#ffffff"}
          />
        )}
      </View>
    </Pressable>
  );
}