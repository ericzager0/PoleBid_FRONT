import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: Props) {
  return (
    <View className="gap-1 w-full">
      {label && <Text className="text-sm font-medium text-white">{label}</Text>}
      <TextInput
        className="text-white px-4 py-3 rounded-xl border border-gray-300"
        placeholderTextColor="#6b7280"
        {...props}
      />
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
