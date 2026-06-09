import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NoAuctions({isProfile = false}: {isProfile?: boolean}) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10, 
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, 
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  return (
    <SafeAreaView className={isProfile ? "flex-1 bg-[#1C1C1E]" : "flex-1 bg-[#14191C]"}>
      {!isProfile && (
        <View className="px-4 pt-4 pb-2">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>)}
      <View className="flex-1 justify-center items-center p-6 pb-12">
        <Animated.View
          className="w-full aspect-square max-h-[380px] bg-[#1A1E21] rounded-3xl border border-[#E8B83C]/30 justify-center items-center p-6"
          style={{ 
            transform: [{ translateY: floatAnim }],
            shadowColor: '#E8B83C',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          
          <View className="mb-8">
            <MaterialCommunityIcons 
              name="gavel" 
              size={80} 
              color="#E8B83C" 
              style={{
                textShadowColor: 'rgba(232, 184, 60, 0.8)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 15,
              }}
            />
          </View>

          <Text 
            className="text-[#E8B83C] text-lg font-medium tracking-[0.15em] uppercase mb-3 text-center"
            style={{
              textShadowColor: 'rgba(232, 184, 60, 0.5)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            {!isProfile ? "No hay subastas actuales" : "No has participado en ninguna subasta aún"}
          </Text>
          
          <Text className="text-[#E8B83C]/60 text-sm tracking-wide text-center px-4">
            {isProfile ? "Participa en una subasta para ver tu historial" : "Vuelve pronto para ver nuevas publicaciones"}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}