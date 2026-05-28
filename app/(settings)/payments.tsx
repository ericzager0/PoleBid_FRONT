import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BankPlaceholder from '../../components/BankPlaceholder';
import CheckPlaceholder from '../../components/CheckPlaceholder';
import CreditCard from '../../components/CreditCard';
import PaymentCarousel from '../../components/PaymentCarousel';
import RoundedButton from '../../components/RoundedButton';

const CardPlaceholderData = { bankName: '---', titular: '---', number: '**** **** **** ****', expiry: '--/--' };
const CheckPlaceholderData = { bankName: '---', titular: '---', checkNumber: '---', currency: '$', monto: '0,00', emision: '--/--/----' };
const BankPlaceholderData = { bankName: '---', titular: '---', cuil: '--', accountNumber: '*** ----' };

export default function PaymentsScreen() {
  const router = useRouter();

  const userCards = [
    { bankName: 'BNA', titular: 'Alejandro Martínez', number: '5282 3456 7890 1289', expiry: '09/25' }, 
    { bankName: 'Santander', titular: 'Alejandro Martínez', number: '4539 8765 4321 5678', expiry: '11/24' }
  ];
  const userChecks = [{ bankName: 'BANCO NACIONAL', titular: 'Martin Mazini', checkNumber: '00482931', currency: '$', monto: '125.000,00', emision: '16/04/2026' }];
  const userBankAccounts = [{ bankName: 'Banco Santander', titular: 'Alejandro Martínez Silva', cuil: '20-12345678-9', accountNumber: '*** 4567' }];
  const userCobroAccounts: any[] = []; 

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <RoundedButton onPress={() => console.log('Cerrando sesión...')} />
      </View>

      <View className="px-5 pb-6">
        <Text className="text-white text-4xl font-bold tracking-tight">
          Métodos de pago:
        </Text>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        <PaymentCarousel 
          title="Administrar Tarjetas:"
          data={userCards}
          placeholderData={CardPlaceholderData}
          renderItem={(item) => <CreditCard {...item} />}
        />

        <PaymentCarousel 
          title="Administrar cheques:"
          data={userChecks}
          placeholderData={CheckPlaceholderData}
          renderItem={(item) => <CheckPlaceholder {...item} />}
        />

        <PaymentCarousel 
          title="Administrar cuenta a Bancaria:"
          data={userBankAccounts}
          placeholderData={BankPlaceholderData}
          renderItem={(item) => <BankPlaceholder {...item} />}
        />

        <View className="h-[1px] bg-[#333333] mx-4 mb-8" />

        <PaymentCarousel 
          title="Administrar cuenta de Cobro:"
          data={userCobroAccounts}
          placeholderData={BankPlaceholderData}
          showAddIcon={false}
          showArrows={false}
          renderItem={(item) => <BankPlaceholder {...item} />}
        />

      </ScrollView>
    </SafeAreaView>
  );
}