import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string; // Si no pasas nada: "Buscar..."
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Buscar..." 
}: SearchBarProps) {
const [isFocused, setIsFocused] = useState(false);

  return (
    <View 
      className={`w-full flex-row items-center bg-[#2D2E33] rounded-2xl px-4 py-3 border ${
        isFocused ? 'border-[#E8B83C]' : 'border-[#2C2C2E]'
      }`}
    >
      <TextInput
        className="flex-1 text-white text-base mr-2 outline-none"
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ outlineStyle: 'none' } as any}
      />

      <Ionicons 
        name="search" 
        size={22} 
        color={isFocused ? "#E8B83C" : "#8E8E93"} 
      />

    </View>
  );
}