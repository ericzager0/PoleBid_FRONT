import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import ErrorMessege from "./ErrorMessege";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "register";
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  variant,
  isPassword = false,
  onFocus,
  onBlur,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-1 w-full">
      {label && <Text className="text-sm font-medium text-white">{label}</Text>}
      <TextInput
        secureTextEntry={isPassword}
        className={`text-white py-3 ${
          variant === "register" ? "border-b" : "border rounded-xl"
        } ${isFocused ? "border-[#E8B83C]" : "border-gray-500"}`} 
        placeholderTextColor="#6b7280"
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e); 
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        {...props}
      />
      {error && <ErrorMessege error={error} />}
    </View>
  );
}