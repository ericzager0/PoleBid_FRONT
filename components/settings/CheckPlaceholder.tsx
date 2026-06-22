import { LOGOS_DICT } from '@/api/utils/bank_logos';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import SimpleModal from '../common/SimpleModal';

interface CheckPlaceholderProps {
  bank_name: string;
  owner: string;
  number: string;
  currency: string;
  amount: string;
  issueDate: string;
  is_verified?: boolean; 
}

export default function CheckPlaceholder({
  bank_name,
  owner,
  number,
  currency,
  amount,
  issueDate,
  is_verified = true, 
}: CheckPlaceholderProps) {
  const [infoModal, setInfoModal] = useState(false);

  const getLogo = (name: string) => {
    if (!name) {
      return LOGOS_DICT['mastercard'];
    }
    const normalizedName = String(name).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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
            source={getLogo(bank_name)} 
            style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 10 }} 
          />
          <Text 
            className="text-white text-base font-bold uppercase tracking-wide flex-1" 
            numberOfLines={1} 
            adjustsFontSizeToFit
          >
            {bank_name}
          </Text>
        </View>
        <Text className="text-gray-300 text-xs font-medium mt-1">
          Nº {number}
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
          {currency} {amount}
        </Text>
      </View>

      <View className="flex-row justify-between items-end z-10">
        <View className="flex-1 mr-4">
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Titular
          </Text>
          <Text className="text-white text-sm" numberOfLines={1} adjustsFontSizeToFit>
            {owner}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            Emisión
          </Text>
          <Text className="text-white text-sm">
            {issueDate}
          </Text>
        </View>
      </View>

      {!is_verified && (
        <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 z-20 justify-center items-center" onPress={() => setInfoModal(true)}>
          <Ionicons name="time-outline" size={48} color="#E8B83C" />
          <Text className="text-[#E8B83C] text-sm font-bold tracking-widest uppercase mt-3">
            En revisión
          </Text>
        </TouchableOpacity>
      )}

      {/* MODAL */}
      <SimpleModal
        visible={infoModal}
        onClose={() => setInfoModal(false)}
        texto="Tu cheque está siendo revisado por nuestro equipo. Te notificaremos una vez que la revisión esté completa. ¡Gracias por tu paciencia!"
      />
    </View>
  );
}