import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import ErrorMessege from './ErrorMessege';
import { Input } from './Input';
import KeyboardWrapper from './KeyboardWrapper';

export interface BankData {
  bankName: string;
  titular: string;
  cuil: string;
  accountNumber: string;
}

interface BankDetailsModalProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm: (data: BankData) => void;
  initialData?: BankData | null;
  isRegister?: boolean; 
  label?: string;
}

export default function BankDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false,
  label = "Guardar",
}: BankDetailsModalProps) {
  
  const [bankName, setBankName] = useState('');
  const [titular, setTitular] = useState('');
  const [cuil, setCuil] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [error, setError] = useState<string | null>(null);

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
    setError(null);
  }, [initialData, visible]);

  const handleConfirm = () => {
    if (!bankName || !titular || !cuil || !accountNumber) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    setError(null);
    onConfirm({ bankName, titular, cuil, accountNumber });
    onClose?.();
  };

  const handleChangeText = (setter: (val: string) => void, val: string) => {
    setter(val);
    if (error) setError(null);
  };

  const handleCuilChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 10) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 10)}-${cleaned.slice(10, 11)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 10)}`;
    }
    
    setCuil(formatted);
    if (error) setError(null);
  };

  return (
    <Modal 
      visible={visible} 
      transparent={true} 
      animationType="fade"
      onRequestClose={() => {
        if (!isRegister) onClose?.();
      }}
    >
      <View className={`flex-1 ${!isRegister ? 'bg-black/80' : ''}`}>
        <KeyboardWrapper>
          <View className="flex-1 justify-center px-4 py-10">
            
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
                  onChangeText={(val) => handleChangeText(setBankName, val)}
                  autoCapitalize="words"
                />

                <Input
                  label="Titular"
                  variant="register"
                  placeholder="Nombre completo del titular"
                  value={titular}
                  onChangeText={(val) => handleChangeText(setTitular, val)}
                  autoCapitalize="words"
                />

                <Input
                  label="CUIL"
                  variant="register"
                  placeholder="00-00000000-0"
                  value={cuil}
                  onChangeText={(val) => handleCuilChange(val)}
                  keyboardType="numeric"
                  maxLength={13}
                />

                <Input
                  label="Número de Cuenta"
                  variant="register"
                  placeholder="CBU o Alias"
                  value={accountNumber}
                  onChangeText={(val) => handleChangeText(setAccountNumber, val)}
                  keyboardType="numeric"
                />
              </View>

              {error && (
                <ErrorMessege error={error} />
              )}

              <View className="mt-6">
                <Button 
                  label={label}
                  variant="primary" 
                  onPress={handleConfirm} 
                />
              </View>
              
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </Modal>
  );
}