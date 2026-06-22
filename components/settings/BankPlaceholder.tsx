import { LOGOS_DICT } from '@/api/utils/bank_logos';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BankPlaceholderProps {
  bank_name: string;
  owner: string;
  cuil_cuit: string;
  cbu: string;
  reserved_funds: string;
  blocked?: boolean; 
}

export default function BankPlaceholder({ 
  bank_name, 
  owner, 
  cuil_cuit, 
  cbu,
  reserved_funds,
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
          <View className="flex-1 mr-4">
            <Image 
              source={getLogo(bank_name)} 
              style={{ width: 35, height: 35, resizeMode: 'contain', marginBottom: 4 }} 
            />
            <Text 
              className="text-white/80 text-sm font-medium tracking-wide" 
              numberOfLines={1}
            >
              {(bank_name).toUpperCase()}
            </Text>
          </View>

          <View className="items-end bg-black/20 px-3 py-2 rounded-2xl border border-white/10">
            <Text className="text-white/70 text-[9px] font-bold tracking-widest uppercase mb-1">
              Fondos Reservados
            </Text>
            <Text 
              className="text-[#E8B83C] text-lg font-bold tracking-wider"
              numberOfLines={1}
            >
              $ {reserved_funds}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center z-10 mt-2">
          <Text className="text-white/90 text-sm mr-2 tracking-widest uppercase">
            CBU:
          </Text>
          <Text 
            className="text-white text-xl tracking-widest shadow-sm flex-1"
            style={{ fontFamily: 'SpaceMono-Regular' }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {cbu}
          </Text>
        </View>

        <View className="flex-row justify-between items-end z-10">
          <View className="flex-1 mr-4">
            <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
              Titular
            </Text>
            <Text className="text-white text-xs font-medium" numberOfLines={1}>
              {owner}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
              CUIL
            </Text>
            <Text className="text-white text-xs font-medium tracking-wider">
              {cuil_cuit}
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