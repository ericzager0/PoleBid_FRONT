import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend(message.trim());
      setMessage(''); 
    }
  };

  return (
    <View className="flex-row items-center bg-[#1C1C1E] border border-[#2A2B30] rounded-full px-4 py-2 w-full">
      <TextInput
        className="flex-1 text-white text-base py-2 px-2"
        placeholder="Quiero ampliar la póliza..."
        placeholderTextColor="#9CA3AF"
        value={message}
        onChangeText={setMessage}
        multiline={false}
        autoCapitalize="sentences"
        autoCorrect={true}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSend}
        disabled={message.trim().length === 0}
        className={`w-10 h-10 rounded-full items-center justify-center ml-2 ${
          message.trim().length > 0 ? 'bg-[#E8B83C]/20' : 'bg-[#2A2B30]'
        }`}
      >
        <Ionicons 
          name="send" 
          size={18} 
          color={message.trim().length > 0 ? "#E8B83C" : "#6B7280"} 
          style={{ marginLeft: 3 }} 
        />
      </TouchableOpacity>
    </View>
  );
}