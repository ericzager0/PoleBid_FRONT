import { LOGOS_DICT } from '@/api/utils/bank_logos';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BankPlaceholderProps {
  bankName: string;
  titular: string;
  cuil: string;
  accountNumber: string;
  blocked?: boolean; 
}

export default function BankPlaceholder({ 
  bankName, 
  titular, 
  cuil, 
  accountNumber,
  blocked = false 
}: BankPlaceholderProps) {

  const getLogo = (name: string) => {
    const normalizedName = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return LOGOS_DICT[normalizedName] || LOGOS_DICT['mastercard'];
  };

  return (
    <View 
      className={`relative w-full aspect-[1.6] rounded-[32px] overflow-hidden shadow-lg ${
        blocked ? 'bg-[#1C1C1E]' : 'bg-[#E6205A]'
      }`}
      style={{
        shadowColor: blocked ? '#000000' : '#E6205A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
      }}
    >
      <View 
        className="flex-1 p-5 justify-between"
        style={{ opacity: blocked ? 0.1 : 1 }}
      >
        <View className="absolute -bottom-24 -left-16 w-80 h-64 bg-[#C71545] rounded-full opacity-80" />
        <View className="absolute -top-32 -right-10 w-96 h-96 bg-[#FF3E78] rounded-full opacity-40" />

        <View className="flex-row justify-between items-start z-10">
          <Text 
            className="text-white/80 text-lg font-medium tracking-wide flex-1 mr-4" 
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {bankName}
          </Text>

          <View className="items-center justify-center">
            <Image 
              source={getLogo(bankName)} 
              style={{ width: 45, height: 45, resizeMode: 'contain' }} 
            />
          </View>
        </View>

        <View className="flex-row items-center z-10">
          <Text className="text-white/90 text-sm mr-2 tracking-widest uppercase">
            CBU:
          </Text>
          <Text 
            className="text-white text-2xl tracking-widest shadow-sm flex-1"
            style={{ fontFamily: 'SpaceMono-Regular' }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {accountNumber}
          </Text>
        </View>

        <View className="flex-row justify-between items-end z-10">
          <View className="flex-1 mr-4">
            <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
              Titular
            </Text>
            <Text className="text-white text-xs font-medium" numberOfLines={2}>
              {titular}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
              CUIL
            </Text>
            <Text className="text-white text-xs font-medium tracking-wider">
              {cuil}
            </Text>
          </View>
        </View>
      </View>

      {blocked && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50">
          <MaterialCommunityIcons name="lock-outline" size={42} color="#C4A661" />
          <Text className="text-[#C4A661] text-xs font-bold tracking-[0.15em] mt-3 uppercase">
            Cuenta Desactivada
          </Text>
        </View>
      )}
    </View>
  );
}