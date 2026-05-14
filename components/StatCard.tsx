import React from 'react';
import { Text, View } from 'react-native';

interface StatCardProps {
  icono: React.ReactNode; 
  texto: string;
  numero: number | string; 
}

export default function StatCard({ icono, texto, numero }: StatCardProps) {
  return (
    <View className="w-full bg-[#1C1C1E] rounded-2xl flex-row items-center p-3">
      
      <View className="w-14 h-14 rounded-xl bg-[#4A3B22] justify-center items-center">
        {icono}
      </View>

      <View className="flex-1 ml-2 justify-center items-center pr-4">
        <Text className="text-[#8E8E93] text-sm font-semibold mb-1 text-center">
          {texto}
        </Text>
    
        <Text className="text-white text-2xl font-bold text-center">
          {numero}
        </Text>
      </View>

    </View>
  );
}