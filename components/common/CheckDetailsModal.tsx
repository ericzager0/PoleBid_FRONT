import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Button from '../common/Button';
import { Input } from '../common/Input';

export interface CheckData {
  bankName: string;
  titular: string;
  checkNumber: string;
  currency: string;
  monto: string;
  emision: string;
}

interface CheckDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: CheckData) => void;
  initialData?: CheckData | null;
  isRegister?: boolean; 
}

export default function CheckDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false, 
}: CheckDetailsModalProps) {
  
  const [bankName, setBankName] = useState('');
  const [titular, setTitular] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [currency, setCurrency] = useState('');
  const [monto, setMonto] = useState('');
  const [emision, setEmision] = useState('');

  useEffect(() => {
    if (initialData) {
      setBankName(initialData.bankName);
      setTitular(initialData.titular);
      setCheckNumber(initialData.checkNumber);
      setCurrency(initialData.currency);
      setMonto(initialData.monto);
      setEmision(initialData.emision);
    } else {
      setBankName('');
      setTitular('');
      setCheckNumber('');
      setCurrency('');
      setMonto('');
      setEmision('');
    }
  }, [initialData, visible]);

  const handleConfirm = () => {
    onConfirm({ bankName, titular, checkNumber, currency, monto, emision });
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
      <View className="flex-1 bg-black/80 justify-center px-4 py-10">
        
        <View className="bg-[#1C1C1E] w-full max-h-full rounded-2xl p-6 border border-[#2A2B30] shadow-xl">
          
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
            Ingrese los datos del cheque:
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-y-5 pb-4">
              
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
                placeholder="Nombre completo"
                value={titular}
                onChangeText={setTitular}
                autoCapitalize="words"
              />

              <Input
                label="Número de Cheque"
                variant="register"
                placeholder="00000000"
                value={checkNumber}
                onChangeText={setCheckNumber}
                keyboardType="numeric"
              />

              <Input
                label="Moneda"
                variant="register"
                placeholder="Ej. ARS o USD"
                value={currency}
                onChangeText={setCurrency}
                autoCapitalize="characters"
                maxLength={3}
              />

              <Input
                label="Monto del cheque"
                variant="register"
                placeholder="100000"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
              />

              <Input
                label="Fecha de Emisión"
                variant="register"
                placeholder="DD/MM/AAAA"
                value={emision}
                onChangeText={setEmision}
                keyboardType="numeric"
                maxLength={10}
              />
              
            </View>
          </ScrollView>

          <View className="mt-4 pt-4 border-t border-[#2A2B30]">
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