import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

interface SimpleModalProps {
  visible: boolean;
  onClose: () => void;
  texto: string;
}

export default function SimpleModal({ visible, onClose, texto }: SimpleModalProps) {
  return (
    <Modal
      animationType="fade" 
      transparent={true}   
      visible={visible}
      onRequestClose={onClose} 
    >
      <View className="flex-1 justify-center items-center">

        <Pressable 
          className="absolute top-0 bottom-0 left-0 right-0 bg-black/60" 
          onPress={onClose} 
        />

        <View className="w-[80%] bg-[#1C1C1E] rounded-3xl p-6 shadow-xl z-10">
          <Pressable onPress={onClose} className="absolute top-4 right-4 p-2 z-20">
            {({ pressed }) => (
              <Ionicons 
                name="close" 
                size={24} 
                color={pressed ? "white" : "gray"} 
              />
            )}
          </Pressable>

          <Text className="text-white text-base text-center mt-6 mb-2">
            {texto}
          </Text>

        </View>

      </View>
    </Modal>
  );
}