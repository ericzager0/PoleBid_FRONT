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
    const normalizedName = name.toLowerCase().trim();
    return LOGOS_DICT[normalizedName] || LOGOS_DICT['mastercard'];
  };

  return (
    <View 
      className="relative w-full rounded-3xl bg-[#2d4247] overflow-hidden p-5 justify-between border border-[#3b545a] shadow-lg"
      style={{
        minHeight: 180,
      }}
    >
      <View className="absolute -top-16 -right-10 w-64 h-64 bg-[#374e54] rounded-full opacity-60" />
      <View className="absolute -bottom-16 -left-10 w-[120%] h-32 bg-[#223337] rounded-[100px] opacity-80" />

      <View className="flex-row justify-between items-center z-10">
        <View className="flex-row items-center">
          <Image 
            source={getLogo(bankName)} 
            style={{ width: 28, height: 28, resizeMode: 'contain', marginRight: 8 }} 
          />
          <Text className="text-white text-lg font-bold uppercase tracking-wide">
            {bankName}
          </Text>
        </View>
        <Text className="text-gray-300 text-sm font-medium">
          Nº {checkNumber}
        </Text>
      </View>

      <View className="mt-4 z-10">
        <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
          Monto
        </Text>
        <Text className="text-white text-4xl font-bold tracking-tight">
          {currency} {monto}
        </Text>
      </View>

      <View className="flex-row justify-between items-end mt-4 z-10">
        <View>
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Titular
          </Text>
          <Text className="text-white text-base">
            {titular}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Emisión
          </Text>
          <Text className="text-white text-base">
            {emision}
          </Text>
        </View>
      </View>
      
    </View>
  );
}