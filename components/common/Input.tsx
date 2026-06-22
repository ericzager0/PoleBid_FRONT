import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import ErrorMessege from "./ErrorMessege";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "register";
  isPassword?: boolean;
  hasError?: boolean; // <-- Agregamos la propiedad
}

export function Input({
  label,
  error,
  variant,
  isPassword = false,
  hasError = false, // <-- La recibimos por defecto en false
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
        className={`text-white py-3 px-2 ${
          variant === "register" ? "border-b" : "border rounded-xl"
        } ${
          hasError 
            ? "border-red-500 bg-red-500/10" // Fondo rojizo y borde rojo si hay error
            : isFocused 
              ? "border-[#E8B83C] bg-transparent" // Dorado si está en foco
              : "border-gray-500 bg-transparent"  // Gris normal
        }`} 
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