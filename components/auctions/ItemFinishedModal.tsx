import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

interface ItemFinishedModalProps {
  visible: boolean;
  winnerName: string;
}

export default function ItemFinishedModal({
  visible,
  winnerName,
}: ItemFinishedModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 bg-black/85 justify-center px-4">
        <View className="bg-[#1C1C1E] w-full rounded-[24px] p-6 items-center border border-[#E8B83C]/30 shadow-2xl z-10">
          
          <View className="w-24 h-24 bg-[#2A2B30] rounded-full items-center justify-center mb-5 border-[3px] border-[#333333] shadow-lg">
            <MaterialCommunityIcons name="gavel" size={50} color="#9CA3AF" />
          </View>

          <Text className="text-white text-[28px] font-extrabold tracking-wide mb-2 text-center">
            Artículo Subastado
          </Text>
          
          <Text className="text-[#9CA3AF] text-base text-center px-2 mb-6 leading-relaxed">
            Este lote ha sido adjudicado. El ganador fue:{"\n"}
            <Text className="text-[#E8B83C] font-bold text-lg">{winnerName}</Text>
          </Text>

          <View className="flex-row items-center justify-center mt-2 p-4 bg-[#14191C] rounded-xl border border-[#333333] w-full">
            <ActivityIndicator size="small" color="#E8B83C" className="mr-3" />
            <Text className="text-gray-400 font-medium">
              Aguarde al próximo artículo...
            </Text>
          </View>

        </View>
      </View>
    </Modal>
  );
}