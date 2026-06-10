import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center px-4">
        <Pressable
          className="absolute top-0 bottom-0 left-0 right-0 bg-black/70"
          onPress={onClose}
        />
        <View className="w-[85%] bg-[#1C1C1E] rounded-3xl p-6 border border-[#2A2B30] shadow-xl z-10 items-center">
          
          <Text className="text-white text-xl font-bold text-center mb-3 tracking-wide">
            {title}
          </Text>

          <Text className="text-[#9CA3AF] text-sm text-center mb-6 leading-5 px-1">
            {description}
          </Text>

          <View className="w-full gap-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onConfirm}
              className="w-full bg-[#E8B83C] py-3.5 rounded-xl items-center justify-center"
            >
              <Text className="text-[#14191C] text-base font-semibold">
                {confirmText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onCancel}
              className="w-full bg-transparent border border-[#4B4E54] py-3.5 rounded-xl items-center justify-center"
            >
              <Text className="text-[#D1D5DB] text-base font-medium">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}