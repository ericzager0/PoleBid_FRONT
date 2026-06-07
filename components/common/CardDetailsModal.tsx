import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import { Input } from './Input';

export interface CardData {
  bankName: string;
  cardNumber: string;
  titular: string;
  expiry: string;
  cvv: string;
}

interface CardDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: CardData) => void;
  initialData?: CardData | null;
  isRegister?: boolean; 
}

export default function CardDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false,
}: CardDetailsModalProps) {
  
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [titular, setTitular] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if (initialData) {
      setBankName(initialData.bankName);
      setCardNumber(initialData.cardNumber);
      setTitular(initialData.titular);
      setExpiry(initialData.expiry);
      setCvv(initialData.cvv);
    } else {
      setBankName('');
      setCardNumber('');
      setTitular('');
      setExpiry('');
      setCvv('');
    }
  }, [initialData, visible]);

  const handleConfirm = () => {
    onConfirm({ bankName, cardNumber, titular, expiry, cvv });
    onClose(); 
  };

  return (
    <Modal 
      visible={visible} 
      transparent={true} 
      animationType="fade"
      onRequestClose={() => {
        if (!isRegister) onClose();
      }}
    >
      <View className="flex-1 bg-black/80 justify-center px-4">
        
        <View className="bg-[#1C1C1E] w-full rounded-2xl p-6 border border-[#2A2B30] shadow-xl">
          
          {!isRegister ? (
            <View className="flex-row justify-end mb-2">
              <TouchableOpacity onPress={onClose} className="p-1">
                <Ionicons name="close" size={28} color="#D1D5DB" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mb-4" />
          )}

          <Text className="text-white text-lg font-medium tracking-wide mb-6">
            Ingrese los datos de la tarjeta:
          </Text>

          <View className="gap-y-6">
            <Input
              label="Nro tarjeta"
              variant="register"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />

            <Input
              label="Titular"
              variant="register"
              placeholder="Nombre como aparece en la tarjeta"
              value={titular}
              onChangeText={setTitular}
              autoCapitalize="words"
            />

            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Input
                  label="Fecha"
                  variant="register"
                  placeholder="MM/AA"
                  value={expiry}
                  onChangeText={setExpiry}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              
              <View className="flex-1">
                <Input
                  label="Cv"
                  variant="register"
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <View className="mt-8">
            <Button 
              label="Confirmar" 
              variant="primary" 
              onPress={handleConfirm} 
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}