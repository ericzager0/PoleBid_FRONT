import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "register";
}

export function Input({ label, error, variant, ...props }: Props) {
  return (
    <View className="gap-1 w-full">
      {label && <Text className="text-sm font-medium text-white">{label}</Text>}
      <TextInput
        className={`text-white py-3  border-gray-300 ${
          variant === "register" ? "border-b" : "border rounded-xl"
        }`}
        placeholderTextColor="#6b7280"
        {...props}
      />
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
