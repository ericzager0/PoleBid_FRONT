import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface SellerToggleProps {
  isSeller: boolean;
  onToggle: (value: boolean) => void;
}

export default function SellerToggle({ isSeller, onToggle }: SellerToggleProps) {
  const translateX = useRef(new Animated.Value(isSeller ? 24 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isSeller ? 24 : 0, 
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isSeller]);

  return (
    <Pressable
      onPress={() => onToggle(!isSeller)}
      className="flex-row items-center justify-between bg-[#1C1C1E] rounded-2xl p-4 w-full active:opacity-80"
      style={{
        borderWidth: 1,
        borderColor: '#2A2B30'
      }}
    >
      <View className="flex-1 mr-4">
        <Text className="text-white text-lg font-bold mb-1 tracking-wide">
          Activar cuenta vendedor
        </Text>
        <Text className="text-[#9CA3AF] text-sm leading-tight">
          Habilita las funciones de venta y subastas
        </Text>
      </View>

      <View 
        className={`w-14 h-8 rounded-full p-1 justify-center ${
          isSeller ? 'bg-[#E8B83C]' : 'bg-[#36393F]'
        }`}
      >
        <Animated.View
          style={{ 
            transform: [{ translateX }],
            width: 24,          
            height: 24,        
            borderRadius: 12,  
            backgroundColor: isSeller ? '#14191C' : '#9CA3AF'
          }}
          className="shadow-sm" 
        />
      </View>
    </Pressable>
  );
}