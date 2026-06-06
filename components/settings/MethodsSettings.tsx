import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MethodSettingsProps {
  text: string;
  frontalIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
}

export default function MethodsSettings({ text, frontalIcon, backgroundIcon, onPress }: MethodSettingsProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="relative bg-[#242424] rounded-2xl p-4 overflow-hidden min-h-[110px] flex-col justify-between"
    >

      <MaterialCommunityIcons
        name={backgroundIcon}
        size={85}
        color="#FACC15" 
        style={{
          position: 'absolute',
          right: -10, 
          bottom: -10, 
          opacity: 0.1, 
        }}
      />

      <View className="mb-6">
        <MaterialCommunityIcons
          name={frontalIcon}
          size={28}
          color="#FACC15" 
        />
      </View>

      <Text className="text-gray-100 text-lg font-medium leading-tight">
        {text}
      </Text>
    </TouchableOpacity>
  );
}