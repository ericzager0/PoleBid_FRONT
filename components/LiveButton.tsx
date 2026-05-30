import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';

interface LiveButtonProps {
  onPress?: () => void;
}

export default function LiveButton({ onPress }: LiveButtonProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,       
          duration: 600,      
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,         
          duration: 600,      
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center bg-[#FF0B0B] rounded-full px-5 py-2.5 self-start shadow-md"
    >
      <Animated.View 
        style={{ 
          opacity: fadeAnim,
          width: 14,
          height: 14,
          backgroundColor: 'white',
          borderRadius: 7,
          marginRight: 10
        }}
      />
      
      <Text className="text-white text-lg font-bold tracking-wide">
        Ver en Vivo
      </Text>
    </TouchableOpacity>
  );
}