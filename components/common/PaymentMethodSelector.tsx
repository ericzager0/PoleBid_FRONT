import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type PaymentMethodType = 'card' | 'bank' | 'check';

interface PaymentOption {
  id: PaymentMethodType;
  subtitle: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface PaymentMethodSelectorProps {
  onSelect?: (method: PaymentMethodType) => void;
}

export default function PaymentMethodSelector({ onSelect }: PaymentMethodSelectorProps) {
  const [selected, setSelected] = useState<PaymentMethodType | null>(null);

  const handleSelect = (id: PaymentMethodType) => {
    setSelected(id);
    if (onSelect) onSelect(id);
  };

  const options: PaymentOption[] = [
    {
      id: 'card',
      subtitle: 'PREMIUM CARD',
      title: 'Tarjeta de Crédito',
      description: '**** **** **** 0000',
      icon: 'credit-card-outline',
    },
    {
      id: 'check',
      subtitle: 'CHECK',
      title: 'Cheque Certificado',
      description: 'VALIDACIÓN 48HS',
      icon: 'cash-multiple',
    },
    {
      id: 'bank',
      subtitle: 'DIRECT ACCESS',
      title: 'Transferencia / CBU',
      description: 'TRANSACCIÓN INSTANTÁNEA',
      icon: 'bank-outline',
    },
  ];

  return (
    <View className="gap-y-4 w-full">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        
        return (
          <TouchableOpacity
            key={opt.id}
            onPress={() => handleSelect(opt.id)}
            activeOpacity={0.8}
            className={`w-full bg-[#1C1C1E] rounded-2xl p-5 border ${
              isSelected ? 'border-[#E8B83C]' : 'border-[#2A2B30]'
            }`}
            style={
              isSelected 
                ? {
                    shadowColor: '#E8B83C',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 5,
                  }
                : {}
            }
          >
            <View className="flex-row justify-between items-center mb-1">
              <Text 
                className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                  isSelected ? 'text-[#E8B83C]' : 'text-[#6B7280]'
                }`}
              >
                {opt.subtitle}
              </Text>
              <MaterialCommunityIcons 
                name={opt.icon} 
                size={24} 
                color={isSelected ? '#E8B83C' : '#6B7280'} 
              />
            </View>

            <Text className="text-white text-xl font-medium mb-8">
              {opt.title}
            </Text>

            <View className="flex-row justify-between items-end">
              <View className="flex-row items-center gap-x-2">
                <View className="w-6 h-4 bg-[#2A2B30] rounded flex items-center justify-center">
                   <View className={`w-2 h-1 rounded-sm ${isSelected ? 'bg-[#E8B83C]/50' : 'bg-[#4B4E54]'}`} />
                </View>
                <Text className="text-[#6B7280] text-[10px] font-bold tracking-widest uppercase">
                  {opt.description}
                </Text>
              </View>

              <View 
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  isSelected ? 'border-[#E8B83C]' : 'border-[#4B4E54]'
                }`}
              >
                {isSelected && (
                  <View className="w-3 h-3 bg-[#E8B83C] rounded-full" />
                )}
              </View>

            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}