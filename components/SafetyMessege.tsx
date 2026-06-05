import React from 'react';
import { Text, View } from 'react-native';

interface SafetyMessageProps {
  title?: string;
  message?: string;
}

export default function SafetyMessage({
  title = "Consejo de Seguridad",
  message = "Mantén tus datos bancarios actualizados para evitar retrasos en tus liquidaciones de subastas finalizadas."
}: SafetyMessageProps) {
  return (
    <View className="bg-[#2A2B30] rounded-2xl p-5 w-full">
      <Text className="text-[#E8B83C] text-xl font-bold mb-3 tracking-wide">
        {title}
      </Text>
      
      <Text className="text-[#D1D5DB] text-base leading-relaxed">
        {message}
      </Text>
    </View>
  );
}