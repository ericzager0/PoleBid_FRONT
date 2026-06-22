import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { paymentMethodService } from '@/api/services/paymentMethod';
import Button from '../common/Button';
import { Input } from '../common/Input';
import KeyboardWrapper from '../common/KeyboardWrapper';
import ErrorMessege from './ErrorMessege';

export interface CheckData {
  bank_name: string;
  owner: string;
  number: number;
  currency: string;
  amount: number;
  issueDate: string;
}

interface CheckDetailsModalProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm: (data: CheckData) => void;
  initialData?: CheckData | null;
  isRegister?: boolean; 
  label?: string;
}

export default function CheckDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false, 
  label = "Guardar",
}: CheckDetailsModalProps) {
  
  const [bankName, setBankName] = useState('');
  const [titular, setTitular] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [currency, setCurrency] = useState('');
  const [monto, setMonto] = useState('');
  const [emision, setEmision] = useState('');

  const [error, setError] = useState<string | null>(null);
  
  // NUEVO: Solo los estados para marcar en rojo Moneda y Cheque
  const [currencyError, setCurrencyError] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setBankName(initialData.bank_name);
      setTitular(initialData.owner);
      setCheckNumber(initialData.number.toString());
      setCurrency(initialData.currency);
      setMonto(initialData.amount.toString());
      setEmision(initialData.issueDate);
    } else {
      setBankName('');
      setTitular('');
      setCheckNumber('');
      setCurrency('');
      setMonto('');
      setEmision('');
    }
    setError(null);
    setCurrencyError(false);
    setCheckError(false);
  }, [initialData, visible]);

  const handleConfirm = async () => {
    const cleanCheckNumber = checkNumber.replace(/\D/g, ''); 
    const cleanCurrency = currency.trim().toUpperCase();    

    setCurrencyError(false);
    setCheckError(false);

    if (!bankName || !titular || !cleanCheckNumber || !cleanCurrency || !monto || !emision) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    if (cleanCurrency !== "ARS") {
      setError("Solo se aceptan cheques en pesos (ARS).");
      setCurrencyError(true);
      return;
    }

    if (cleanCheckNumber.length !== 8) {
      setError("El número de cheque debe tener exactamente 8 dígitos.");
      setCheckError(true);
      return;
    }

    try {
      setError(null);
      await paymentMethodService.addCheck({
        bankName: bankName,
        owner: titular,
        number: Number(cleanCheckNumber), 
        currency: cleanCurrency,         
        amount: Number(monto),
        issueDate: emision
      });

      onConfirm({ bank_name: bankName, owner: titular, number: Number(cleanCheckNumber), currency: cleanCurrency, amount: Number(monto), issueDate: emision });
      onClose?.();

    } catch (e: any) {
      setError(
        "Error al agregar cheque: " + (e.response?.data?.message || e.message),
      );
    }
  };

  const handleFullDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    setEmision(formatted);
    if (error) setError(null);
  };

  const handleChangeText = (setter: (val: string) => void, val: string) => {
    setter(val);
    if (error) setError(null);
    setCurrencyError(false);
    setCheckError(false);
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
                Ingrese los datos del cheque:
              </Text>

              <View className="gap-y-5">
                
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
                  placeholder="Nombre completo"
                  value={titular}
                  onChangeText={(val) => handleChangeText(setTitular, val)}
                  autoCapitalize="words"
                />

                <Input
                  label="Número de Cheque"
                  variant="register"
                  placeholder="00000000"
                  value={checkNumber}
                  onChangeText={(val) => handleChangeText(setCheckNumber, val)}
                  keyboardType="numeric"
                  maxLength={8}
                  hasError={checkError}
                />

                <View className="flex-row gap-x-4">
                  <View className="flex-1">
                    <Input
                      label="Moneda"
                      variant="register"
                      placeholder="ARS"
                      value={currency}
                      onChangeText={(val) => handleChangeText(setCurrency, val)}
                      autoCapitalize="characters"
                      maxLength={3}
                      hasError={currencyError}
                    />
                  </View>
                  <View className="flex-[2]">
                    <Input
                      label="Monto"
                      variant="register"
                      placeholder="100000"
                      value={monto}
                      onChangeText={(val) => handleChangeText(setMonto, val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <Input
                  label="Fecha de Emisión"
                  variant="register"
                  placeholder="DD/MM/AAAA"
                  value={emision}
                  onChangeText={handleFullDateChange}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              {error && (
                <ErrorMessege error={error} />
              )}

              <View className="mt-8 pt-4 border-t border-[#2A2B30]">
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