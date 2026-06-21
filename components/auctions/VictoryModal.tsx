import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import Button from '../common/Button';

interface VictoryModalProps {
  visible: boolean;
  itemName: string;
  winningBid: string;
  onProceed: () => void;
  onClose: () => void;
}

export default function VictoryModal({
  visible,
  itemName,
  winningBid,
  onProceed,
  onClose,
}: VictoryModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowConfetti(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View className="flex-1 bg-black/85 justify-center px-4">
        {showConfetti && (
          <ConfettiCannon
            count={120}
            origin={{ x: Dimensions.get('window').width / 2, y: -20 }}
            colors={['#E8B83C', '#B6BABD', '#FFFFFF', '#B8C1E8']}
            fallSpeed={2500}
            fadeOut={true}
            autoStart={true}
          />
        )}

        <View className="bg-[#1C1C1E] w-full rounded-[24px] p-6 items-center border border-[#E8B83C]/30 shadow-2xl z-10">
          <View className="w-24 h-24 bg-[#2A2B30] rounded-full items-center justify-center mb-5 border-[3px] border-[#E8B83C] shadow-lg">
            <MaterialCommunityIcons name="trophy-variant" size={50} color="#E8B83C" />
          </View>

          <Text className="text-[#E8B83C] text-[32px] font-extrabold tracking-wide mb-2 text-center">
            ¡Felicidades!
          </Text>

          <Text className="text-white text-xl font-medium text-center mb-2">
            Ganaste la subasta
          </Text>
          
          <Text className="text-[#9CA3AF] text-base text-center px-2 mb-8 leading-relaxed">
            Tu puja de <Text className="text-[#E8B83C] font-bold">{winningBid}</Text> fue la más alta por el artículo <Text className="text-white font-bold italic">"{itemName}"</Text>.
          </Text>

          <View className="w-full gap-y-3">
            <Button label="Proceder al Pago" variant="primary" onPress={onProceed} />
            <Button 
              label="Seguir participando" 
              variant="secondary" 
              onPress={onClose} 
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}