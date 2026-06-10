import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  text: string;
}

export default function TermsCheckbox({
  checked,
  onChange,
  text,
}: TermsCheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex-row items-start w-full py-2 px-1 select-none"
    >
      {/* CUADRADO DEL CHECKBOX */}
      <View
        className={`w-6 h-6 rounded-md items-center justify-center mr-4 mt-0.5 border transition-colors duration-200 ${
          checked
            ? 'bg-[#E8B83C] border-[#E8B83C]' // Tildado: Fondo dorado
            : 'bg-[#2A2B30] border-[#4B4E54]' // Sin tildar: Fondo oscuro, borde sutil gris
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={16} color="#14191C" className="font-bold" />
        )}
      </View>

      {/* TEXTO DE LOS TÉRMINOS */}
      <Text className="flex-1 text-[#D1D5DB] text-[15px] leading-5 font-medium tracking-wide">
        {text}
      </Text>
    </Pressable>
  );
}