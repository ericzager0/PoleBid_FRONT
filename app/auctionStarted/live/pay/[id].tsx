import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
// 1. Importamos KeyboardAvoidingView y Platform
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConfirmPayModal from '@/components/auctions/ConfirmPayModal';
import DeliveryDataCard from '@/components/auctions/DeliveryDataCard';
import PaymentsDropdown, { PaymentMethod } from '@/components/auctions/PaymentsDropdown';
import Button from '@/components/common/Button';
import DetailsList from '@/components/common/DetailList';
import ImageCarousel from '@/components/common/ImageCarousel';
import NoAuction from '@/components/common/NoAuction';
import BankPlaceholder from '@/components/settings/BankPlaceholder';
import CheckPlaceholder from '@/components/settings/CheckPlaceholder';
import CreditCard from '@/components/settings/CreditCard';
import PaymentCarousel from '@/components/settings/PaymentCarousel';

import { useAuth } from '@/context/AuthContext';
import { f1AuctionsData } from "../../../data/auctions";

export default function LiveAuctionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Tarjeta');
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [ciudad, setCiudad] = useState('');

  const {user} = useAuth();
  const [isLogged, setLogged] = useState(user ? true : false);

  const auction = f1AuctionsData.find((item) => item.id === id);
  const live = auction?.live; 
  const precioBase = 1000000;

  if (!auction) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction title="Subasta no encontrada" text="La subasta que buscas no existe o ya ha finalizado." />
      </SafeAreaView>
    );
  }

  const articleDetails = [
    { label: 'Fecha', value: auction.fecha },
    { label: 'ID', value: `A1/${new Date().getFullYear()}` },
    { label: 'Precio Base', value: '$1,000,000' },
    { label: 'Comisión', value: '18%' },
  ];

  const userCards = [
    { bankName: 'Banco Nación', titular: 'Octavio Cosentino', cardNumber: '5282 3456 7890 1289', expiry: '09/25' },
    { bankName: 'Santander', titular: 'Octavio Cosentino', cardNumber: '4539 8765 4321 5678', expiry: '11/24' }
  ];
  const userChecks = [
    { bankName: 'BANCO NACIONAL', titular: 'Octavio Cosentino', checkNumber: '00482931', currency: '$', monto: '125.000,00', emision: '16/04/2026' }
  ];
  const userBankAccounts = [
    { bankName: 'Banco Santander', titular: 'Octavio Cosentino', cuil: '20-12345678-9', accountNumber: '*** 4567' }
  ];

  const CardPlaceholderData = { bankName: '---', titular: '---', cardNumber: '**** **** **** ****', expiry: '--/--' };
  const CheckPlaceholderData = { bankName: '---', titular: '---', checkNumber: '---', currency: '$', monto: '0,00', emision: '--/--/----' };
  const BankPlaceholderData = { bankName: '---', titular: '---', cuil: '--', accountNumber: '*** ----' };

  const renderPaymentCarousel = () => {
    switch (selectedMethod) {
      case 'Tarjeta':
        return (
          <PaymentCarousel 
            key="carrusel-tarjeta" 
            title="Seleccioná tu tarjeta:"
            data={userCards}
            placeholderData={CardPlaceholderData}
            renderItem={(item) => <CreditCard {...item} />}
            showAddIcon={false} 
            showEditIcon={false}
          />
        );
      case 'Cheque':
        return (
          <PaymentCarousel 
            key="carrusel-cheque"
            title="Seleccioná tu cheque:"
            data={userChecks}
            placeholderData={CheckPlaceholderData}
            renderItem={(item) => <CheckPlaceholder {...item} />}
            showAddIcon={false}
            showEditIcon={false}
          />
        );
      case 'Cuenta de banco':
        return (
          <PaymentCarousel 
            key="carrusel-banco" 
            title="Seleccioná tu cuenta:"
            data={userBankAccounts}
            placeholderData={BankPlaceholderData}
            renderItem={(item) => <BankPlaceholder {...item} />}
            showAddIcon={false}
            showEditIcon={false}
          />
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        <ScrollView 
          className="flex-1 px-4" 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled" 
        >
          
          <View className="flex-row justify-between items-center mb-6 mt-2">
            <Text className="text-white text-2xl">
              <Text className="font-bold">Subasta: </Text> 
              {auction.title}
            </Text>
          </View>

          <Text className="text-white text-xl mb-4">
            <Text className="font-bold">Articulo 1: </Text> 
            Livery Alpine 2025
          </Text>

          <View className="flex-row mb-6">
            <View className="flex-1 pr-4 justify-between">
              <DetailsList data={articleDetails} />
            </View>
            <View className="w-full">
              <Text className="text-gray-400 text-base mb-1.5 leading-relaxed">Precio base: </Text>
              <Text className="text-gray-300">{isLogged ? '$' + precioBase.toLocaleString() : 'No disponible'}</Text>
            </View>
            <View className="flex-1">
              <ImageCarousel images={auction.images} />
            </View>
          </View>

          <View className="h-[1px] bg-[#333333] w-full mb-8" />

          <View className="mb-6 z-50">
            <PaymentsDropdown 
              selectedMethod={selectedMethod} 
              onSelect={(method) => setSelectedMethod(method)} 
            />
          </View>

          <View className="mb-8 z-10">
            {renderPaymentCarousel()}
          </View>

          <View className="mb-8 z-10">
            <DeliveryDataCard 
              calle={calle} 
              setCalle={setCalle} 
              altura={altura} 
              setAltura={setAltura} 
              ciudad={ciudad} 
              setCiudad={setCiudad} 
            />
          </View>
          
          <View className="flex-row justify-between items-center mb-6 px-1">
            <Text className="text-[#9CA3AF] text-base font-medium">Costo de envío</Text>
            <Text className="text-white text-lg font-bold">$ 2.450</Text>
          </View>

          <View className="mb-4">
            <Button 
              label="Confirmar >" 
              onPress={() => setConfirmModalVisible(true)} 
              variant="primary" 
            />
          </View>

          <Text className="text-[#9CA3AF] text-center mt-2 text-[10px] font-bold tracking-widest uppercase">
            TRANSACCIÓN SEGURA Y ENCRIPTADA
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>

      <ConfirmPayModal
        visible={isConfirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={() => {
          setConfirmModalVisible(false);
          router.push(`/home`);
        }}
      />
    </SafeAreaView>
  );
}