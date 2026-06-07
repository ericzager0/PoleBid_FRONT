import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import { Input } from './Input';

export interface BankData {
  bankName: string;
  titular: string;
  cuil: string;
  accountNumber: string;
}

interface BankDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: BankData) => void;
  initialData?: BankData | null;
  isRegister?: boolean; 
}

export default function BankDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false,
}: BankDetailsModalProps) {
  
  const [bankName, setBankName] = useState('');
  const [titular, setTitular] = useState('');
  const [cuil, setCuil] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    if (initialData) {
      setBankName(initialData.bankName);
      setTitular(initialData.titular);
      setCuil(initialData.cuil);
      setAccountNumber(initialData.accountNumber);
    } else {
      setBankName('');
      setTitular('');
      setCuil('');
      setAccountNumber('');
    }
  }, [initialData, visible]);

  const handleConfirm = () => {
    onConfirm({ bankName, titular, cuil, accountNumber });
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
            Ingrese los datos de la cuenta bancaria:
          </Text>

          <View className="gap-y-6">
            <Input
              label="Nombre del Banco"
              variant="register"
              placeholder="Ej. Banco Galicia"
              value={bankName}
              onChangeText={setBankName}
              autoCapitalize="words"
            />

            <Input
              label="Titular"
              variant="register"
              placeholder="Nombre completo del titular"
              value={titular}
              onChangeText={setTitular}
              autoCapitalize="words"
            />

            <Input
              label="CUIL"
              variant="register"
              placeholder="00-00000000-0"
              value={cuil}
              onChangeText={setCuil}
              keyboardType="numeric"
            />

            <Input
              label="Número de Cuenta"
              variant="register"
              placeholder="CBU o Alias"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
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