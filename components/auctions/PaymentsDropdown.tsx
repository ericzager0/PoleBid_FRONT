import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type PaymentMethod = 'Tarjeta' | 'Cheque' | 'Cuenta de banco';

interface PaymentsDropdownProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentsDropdown({
  selectedMethod,
  onSelect,
}: PaymentsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options: PaymentMethod[] = ['Tarjeta', 'Cheque', 'Cuenta de banco'];

  const getIconName = (method: PaymentMethod) => {
    switch (method) {
      case 'Tarjeta':
        return 'credit-card-outline';
      case 'Cheque':
        return 'checkbook';
      case 'Cuenta de banco':
        return 'bank-outline';
      default:
        return 'credit-card-outline';
    }
  };

  const handleSelect = (method: PaymentMethod) => {
    onSelect(method);
    setIsOpen(false);
  };

  return (
    <View className="w-full z-50">
      <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.15em] uppercase mb-2">
        Seleccionar método de pago
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsOpen(!isOpen)}
        className={`flex-row items-center justify-between bg-[#2A2B30] p-4 border ${
          isOpen ? 'border-[#E8B83C] rounded-t-xl' : 'border-[#2A2B30] rounded-xl'
        }`}
      >
        <View className="flex-row items-center gap-x-3">
          <MaterialCommunityIcons 
            name={getIconName(selectedMethod || 'Tarjeta')} 
            size={24} 
            color="#E8B83C" 
          />
          <Text className="text-white text-base font-medium">
            {selectedMethod ? selectedMethod : 'Selecciona un método de pago...'}
          </Text>
        </View>
        
        <MaterialCommunityIcons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#E8B83C" 
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-[82px] left-0 right-0 bg-[#1C1C1E] border border-[#2A2B30] border-t-0 rounded-b-xl overflow-hidden shadow-xl z-50">
          {options.map((option, index) => {
            const isSelected = option === selectedMethod;
            
            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                onPress={() => handleSelect(option)}
                className={`flex-row items-center gap-x-3 p-4 ${
                  index !== options.length - 1 ? 'border-b border-[#2A2B30]' : ''
                } ${isSelected ? 'bg-[#2A2B30]/50' : ''}`}
              >
                <MaterialCommunityIcons 
                  name={getIconName(option)} 
                  size={24} 
                  color={isSelected ? "#E8B83C" : "#9CA3AF"} 
                />
                <Text className={`text-base font-medium ${
                  isSelected ? 'text-white' : 'text-[#9CA3AF]'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}