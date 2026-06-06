import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function ActivateSellerMessage() {
  return (
    <View 
      className="flex-row items-center bg-[#1C1C1E] border-l-4 border-[#E8B83C] rounded-r-xl rounded-l-sm p-4 w-full"
    >
      <View className="mr-3">
        <MaterialCommunityIcons 
          name="information-outline" 
          size={28} 
          color="#E8B83C" 
        />
      </View>
      
      <Text className="flex-1 text-[#D1D5DB] text-base leading-relaxed">
        Debes activar tu cuenta de vendedor para editar tus métodos de pago y recibir los fondos de tus ventas.
      </Text>
    </View>
  );
}