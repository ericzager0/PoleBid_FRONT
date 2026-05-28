import { LOGOS_DICT } from '@/api/utils/bank_logos';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BankPlaceholderProps {
  bankName: string;
  titular: string;
  cuil: string;
  accountNumber: string;
}

export default function BankPlaceholder({ 
  bankName, 
  titular, 
  cuil, 
  accountNumber 
}: BankPlaceholderProps) {

  const getLogo = (name: string) => {
    const normalizedName = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return LOGOS_DICT[normalizedName] || LOGOS_DICT['mastercard'];
  };

  return (
    <View 
      className="relative w-full rounded-[32px] bg-[#E6205A] overflow-hidden p-6 justify-between shadow-lg"
      style={{
        minHeight: 180,
        shadowColor: '#E6205A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
      }}
    >
      <View className="absolute -bottom-24 -left-16 w-80 h-64 bg-[#C71545] rounded-full opacity-80" />
      <View className="absolute -top-32 -right-10 w-96 h-96 bg-[#FF3E78] rounded-full opacity-40" />

      <View className="flex-row justify-between items-start z-10">
        <Text className="text-white/80 text-xl font-medium tracking-wide">
          {bankName}
        </Text>

        <View className="items-center justify-center h-8">
          <Image 
            source={getLogo(bankName)} 
            style={{ width: 80, height: 80, resizeMode: 'contain' }} 
          />
        </View>
      </View>

      <View className="flex-row items-baseline mt-4 z-10">
        <Text className="text-white/90 text-lg mr-3 tracking-widest uppercase">
          CBU:
        </Text>
        <Text 
          className="text-white text-3xl tracking-widest shadow-sm"
          style={{ fontFamily: 'SpaceMono-Regular' }}
        >
          {accountNumber}
        </Text>
      </View>

      <View className="flex-row justify-between items-end mt-6 z-10">
        <View>
          <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
            Titular
          </Text>
          <Text className="text-white text-sm font-medium">
            {titular}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
            CUIL
          </Text>
          <Text className="text-white text-sm font-medium tracking-wider">
            {cuil}
          </Text>
        </View>
      </View>

    </View>
  );
}