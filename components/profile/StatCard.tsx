import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface StatCardProps {
  icono: React.ReactNode; 
  texto: string;
  numero: number | string; 
  price?: boolean;
  blocked?: boolean;
  onPress?: () => void;
}

export default function StatCard({ 
  icono, 
  texto, 
  numero, 
  price = false, 
  onPress, 
  blocked = false 
}: StatCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={blocked} 
      className="w-full"
      style={{ opacity: blocked ? 0.4 : 1 }}
    >
      <View className="w-full bg-[#1C1C1E] rounded-2xl flex-row items-center p-3">
        <View 
          className={`w-14 h-14 rounded-xl justify-center items-center ${
            blocked ? 'bg-[#2A2B30]' : 'bg-[#4A3B22]'
          }`}
        >
          {blocked && React.isValidElement(icono)
            ? React.cloneElement(icono as React.ReactElement<any>, { color: '#636366' })
            : icono}
        </View>

        <View className="flex-1 ml-2 justify-center items-center pr-4">
          <Text className="text-[#8E8E93] text-sm font-semibold mb-1 text-center">
            {texto}
          </Text>
      
          <Text className="text-white text-2xl font-bold text-center">
            {price ? `$${numero}` : numero}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}