import { LOGOS_DICT } from '@/api/utils/bank_logos';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface CreditCardProps {
  bankName: string;  
  titular: string;    
  number: string;    
  expiry: string;    
}

export default function CreditCard({ bankName, titular, number, expiry }: CreditCardProps) {
  const getLogo = (name: string) => {
    const normalizedName = name.toLowerCase().trim();
    return LOGOS_DICT[normalizedName] || LOGOS_DICT['mastercard'];
  };

  return (
    <View 
      className="relative w-full aspect-[1.6] rounded-[32px] bg-[#6724E8] overflow-hidden p-6 justify-between shadow-lg"
      style={{
        shadowColor: '#6724E8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
      }}
    >
      <View className="absolute -bottom-32 -left-10 w-[120%] h-64 bg-[#4130DF] rounded-[100px] opacity-80" />
      <View className="absolute -top-24 -right-16 w-80 h-80 bg-[#8938FF] rounded-full opacity-50" />

      <View className="flex-row justify-between items-start">
        <Text className="text-white/80 text-xl font-bold tracking-wider">
          {bankName}
        </Text>

        <View className="items-center justify-center h-8">
          <Image 
            source={getLogo(bankName)} 
            style={{ width: 48, height: 32, resizeMode: 'contain' }} 
          />
        </View>
      </View>

      <View className="mt-4">
        <Text 
          className="text-white text-3xl tracking-widest shadow-sm"
          style={{ fontFamily: 'SpaceMono-Regular' }}
        >
          {number}
        </Text>
      </View>

      <View className="flex-row justify-between items-end mt-2">
        <Text className="text-white/90 text-sm font-medium tracking-widest uppercase flex-1 mr-4" numberOfLines={1}>
          {titular}
        </Text>
        
        <Text className="text-white text-lg font-bold tracking-widest">
          {expiry}
        </Text>
      </View>
    </View>
  );
}