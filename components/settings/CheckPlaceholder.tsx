import { LOGOS_DICT } from '@/api/utils/bank_logos';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface CheckPlaceholderProps {
  bankName: string;
  titular: string;
  checkNumber: string;
  currency: string;
  monto: string;
  emision: string;
}

export default function CheckPlaceholder({
  bankName,
  titular,
  checkNumber,
  currency,
  monto,
  emision,
}: CheckPlaceholderProps) {

  const getLogo = (name: string) => {
    const normalizedName = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return LOGOS_DICT[normalizedName] || LOGOS_DICT['mastercard'];
  };

  return (
    <View 
      className="relative w-full aspect-[1.6] rounded-[32px] bg-[#2d4247] overflow-hidden p-5 justify-between border border-[#3b545a] shadow-lg"
    >
      <View className="absolute -top-16 -right-10 w-64 h-64 bg-[#374e54] rounded-full opacity-60" />
      <View className="absolute -bottom-16 -left-10 w-[120%] h-32 bg-[#223337] rounded-[100px] opacity-80" />

      <View className="flex-row justify-between items-start z-10">
        <View className="flex-row items-center flex-1 mr-3">
          <Image 
            source={getLogo(bankName)} 
            style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 10 }} 
          />
          <Text 
            className="text-white text-base font-bold uppercase tracking-wide flex-1" 
            numberOfLines={1} 
            adjustsFontSizeToFit
          >
            {bankName}
          </Text>
        </View>
        <Text className="text-gray-300 text-xs font-medium mt-1">
          Nº {checkNumber}
        </Text>
      </View>

      <View className="flex-1 justify-center z-10">
        <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">
          Monto
        </Text>
        <Text 
          className="text-white text-2xl font-bold tracking-tight"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {currency} {monto}
        </Text>
      </View>

      <View className="flex-row justify-between items-end z-10">
        <View className="flex-1 mr-4">
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Titular
          </Text>
          <Text className="text-white text-sm" numberOfLines={1} adjustsFontSizeToFit>
            {titular}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Emisión
          </Text>
          <Text className="text-white text-sm">
            {emision}
          </Text>
        </View>
      </View>
      
    </View>
  );
}