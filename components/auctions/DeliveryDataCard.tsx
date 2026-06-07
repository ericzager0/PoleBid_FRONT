import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface DeliveryDataCardProps {
  calle: string;
  setCalle: (val: string) => void;
  altura: string;
  setAltura: (val: string) => void;
  ciudad: string;
  setCiudad: (val: string) => void;
}

export default function DeliveryDataCard({
  calle,
  setCalle,
  altura,
  setAltura,
  ciudad,
  setCiudad,
}: DeliveryDataCardProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  return (
    <View className="w-full bg-[#1C1C1E] rounded-[20px] p-5 border border-[#2A2B30] shadow-sm">
      <View className="flex-row items-center mb-6">
        <MaterialCommunityIcons name="truck-fast-outline" size={28} color="#E8B83C" />
        <Text className="text-white text-xl font-bold ml-3 tracking-wide">
          Envío
        </Text>
      </View>

      <View className="gap-y-6">
        <View className={`relative border rounded-xl px-4 py-3 ${
          focusedInput === 'calle' ? 'border-[#E8B83C]' : 'border-[#4B4E54]'
        }`}>
          <View className="absolute -top-[10px] left-3 bg-[#1C1C1E] px-1 z-10">
            <Text className="text-[#E8B83C] text-[10px] font-bold uppercase tracking-widest">
              Calle
            </Text>
          </View>
          
          <TextInput
            value={calle}
            onChangeText={setCalle}
            placeholder="Ej. Avenida Libertador"
            placeholderTextColor="#6B7280"
            className="text-white text-base p-0"
            cursorColor="#E8B83C"
            style={{ outlineStyle: 'none' } as any} 
            onFocus={() => setFocusedInput('calle')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View className="flex-row gap-x-4">
          <View className={`flex-1 relative border rounded-xl px-4 py-3 ${
            focusedInput === 'altura' ? 'border-[#E8B83C]' : 'border-[#4B4E54]'
          }`}>
            <View className="absolute -top-[10px] left-3 bg-[#1C1C1E] px-1 z-10">
              <Text className="text-[#E8B83C] text-[10px] font-bold uppercase tracking-widest">
                Altura
              </Text>
            </View>
            
            <TextInput
              value={altura}
              onChangeText={setAltura}
              placeholder="1234"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              className="text-white text-base p-0"
              cursorColor="#E8B83C"
              style={{ outlineStyle: 'none' } as any}
              onFocus={() => setFocusedInput('altura')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View className={
            `flex-1 relative border rounded-xl px-4 py-3 ${focusedInput === 'ciudad' ? 'border-[#E8B83C]' : 'border-[#4B4E54]'}`
            }>
            <View className="absolute -top-[10px] left-3 bg-[#1C1C1E] px-1 z-10">
              <Text className="text-[#E8B83C] text-[10px] font-bold uppercase tracking-widest">
                Ciudad
              </Text>
            </View>
            
            <TextInput
              value={ciudad}
              onChangeText={setCiudad}
              placeholder="Buenos Aires"
              placeholderTextColor="#6B7280"
              className="text-white text-base p-0"
              cursorColor="#E8B83C"
              style={{ outlineStyle: 'none' } as any}
              onFocus={() => setFocusedInput('ciudad')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}