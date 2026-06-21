import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, View } from 'react-native';

import Button from '../common/Button';

interface AuctionFinishedModalProps {
  visible: boolean;
  onProceed: () => void;
}

export default function AuctionFinishedModal({
  visible,
  onProceed
}: AuctionFinishedModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View className="flex-1 bg-black/85 justify-center px-4">
        <View className="bg-[#1C1C1E] w-full rounded-[24px] p-6 items-center border border-[#E8B83C]/30 shadow-2xl z-10">
          
          <View className="w-24 h-24 bg-[#2A2B30] rounded-full items-center justify-center mb-5 border-[3px] border-[#E8B83C] shadow-lg">
            <MaterialCommunityIcons name="gavel" size={50} color="#E8B83C" />
          </View>

          <Text className="text-[#E8B83C] text-[28px] font-extrabold tracking-wide mb-2 text-center">
            Subasta Finalizada
          </Text>

          <Text className="text-white text-lg font-medium text-center mb-2">
            El evento ha concluido
          </Text>
          
          <Text className="text-[#9CA3AF] text-base text-center px-2 mb-8 leading-relaxed">
            Ya no hay más artículos disponibles en esta subasta. Gracias por participar.
          </Text>

          <View className="w-full">
            <Button label="Volver al Inicio" variant="primary" onPress={onProceed} />
          </View>
        </View>
      </View>
    </Modal>
  );
}