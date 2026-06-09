import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function ErrorMessege({error}: {error: string}) {
  return (   
    <View className="flex-row items-center bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-xl p-3 mt-4">
        <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FF3B30" />
        <Text className="text-[#FF3B30] text-sm font-medium ml-2 flex-1 leading-snug">
            {error}
        </Text>
    </View>
  );
};