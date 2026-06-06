import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export type UserStatus = 'verificado' | 'en_espera' | 'denegado';

interface UserStatusCardProps {
  isUser?: boolean;
  status: UserStatus;
}

export default function UserStatusCard({ isUser, status }: UserStatusCardProps) {
  const STATUS_CONFIG = {
    verificado: {
      titleText: 'Verificado para participar en subastas premium.',
      userText: 'Tu cuenta ha sido verificada y cumple con los requisitos para vender artículos.',
      badgeText: 'ADMITIDO',
      icon: 'check-decagram' as const, 
      color: '#FACC15',
    },
    en_espera: {
      titleText: 'Su cuenta está siendo revisada por el sistema.',
      userText: 'Tu cuenta está en proceso de revisión. Pronto recibirás una respuesta sobre tu estado.',
      badgeText: 'EN ESPERA',
      icon: 'clock-outline' as const, 
      color: '#9CA3AF', 
    },
    denegado: {
      titleText: 'No cumple con los requisitos para operar.',
      userText: 'Tu cuenta no cumple con los requisitos para vender artículos en nuestra aplicación.',
      badgeText: 'DENEGADO',
      icon: 'alert-circle-outline' as const,
      color: '#EF4444', 
    }
  };

  const currentConfig = STATUS_CONFIG[status];

  return (
    <View className="flex-row items-center justify-between bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]">
      <View className="flex-1 mr-4">
        <Text 
          className="text-gray-200 text-base font-bold mb-1 tracking-wide"
          style={{ fontFamily: 'SpaceMono-Bold' }} 
        >
          {isUser ? 'Estado de tu cuenta:' : 'Estado de usuario:'}
        </Text>
        <Text className="text-gray-400 text-sm leading-relaxed">
          {isUser ? currentConfig.userText : currentConfig.titleText}
        </Text>
      </View>

      <View 
        className="flex-row items-center border rounded-full px-3 py-1.5 bg-[#131313]"
        style={[
          { borderColor: currentConfig.color },
          {
            shadowColor: currentConfig.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 8, 
          }
        ]}
      >
        <MaterialCommunityIcons 
          name={currentConfig.icon} 
          size={18} 
          color={currentConfig.color} 
        />
        <Text 
          className="ml-1.5 font-bold tracking-widest text-xs"
          style={{ color: currentConfig.color }}
        >
          {currentConfig.badgeText}
        </Text>
      </View>

    </View>
  );
}