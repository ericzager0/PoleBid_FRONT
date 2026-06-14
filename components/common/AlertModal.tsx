import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import Button from './Button';

interface AlertModalProps {
  visible: boolean;
  title: string;
  description: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  buttonText?: string;
  onClose: () => void;
}

export default function AlertModal({
  visible,
  title,
  description,
  iconName = 'alert-circle-outline',
  iconColor = '#E8B83C', 
  buttonText = 'Entendido',
  onClose,
}: AlertModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center px-6">
        <View className="bg-[#1C1C1E] w-full rounded-[32px] p-8 border border-[#2A2B30] items-center shadow-2xl">
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-5 border"
            style={{ backgroundColor: `${iconColor}15`, borderColor: `${iconColor}30` }}
          >
            <MaterialCommunityIcons name={iconName} size={32} color={iconColor} />
          </View>

          <Text className="text-white text-2xl font-bold text-center tracking-wide mb-3">
            {title}
          </Text>
          
          <Text className="text-[#9CA3AF] text-center text-base leading-relaxed mb-8 px-2">
            {description}
          </Text>

          <View className="w-full">
            <Button 
              label={buttonText} 
              onPress={onClose} 
              variant="primary" 
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}