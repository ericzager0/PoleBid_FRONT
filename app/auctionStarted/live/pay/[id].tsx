import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
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

import { itemsService, ItemType } from '@/api/services/items';
import { imageBase64Render } from '@/api/utils/imageBase64Render';
import { useAuth } from '@/context/AuthContext';

export default function PayProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const {user} = useAuth();
  const isLogged = !!user;

  const [item, setitem] = useState<ItemType | null>(null);
  const fetchItems = async (id: number) => {
      try {
        const response = await itemsService.getProductById(id);
        const { fotos, ...rest } = response.data;
        setitem(response.data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchItems(Number(id));
  }, [id]);

  useEffect(() => {
    const onBackPress = () => {
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
      return (
        <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
          <ActivityIndicator size="large" color="#E8B83C" />
          <Text className="text-white text-lg mt-4 font-bold tracking-wide">
            Cargando el producto...
          </Text>
        </SafeAreaView>
      );
    }

  if (!item && !isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction title="Producto no encontrado" text="Problema al traer el producto" />
      </SafeAreaView>
    );
  }

  const articleDetails = [
    { label: "Fecha", value: String(new Date().toLocaleDateString()) },
    {
      label: "ID",
      value: `A${id}/${new Date().getFullYear()}`,
    },
    {
      label: "Comision",
      value: (String((item?.comision || 0 )*100)+"%") || "No disponible",
    },
    {
      label: "Precio Base",
      value: ("$"+String(item?.precioBase)) || "No disponible",
    },
    {
      label: "Precio final",
      value: ("$"+String(item?.precioFinal)) || "No disponible",
    }
  ];

  const userCards = user?.paymentMethods.cards || [];
  const userChecks = user?.paymentMethods.checks || [];
  const userBankAccounts = user?.paymentMethods.banksAccounts || [];

  const CardPlaceholderData = {
    brand: "---",
    owner: "---",
    lastFour: "****",
    expMonth: "--",
    expYear: "----",
  };

  const CheckPlaceholderData = { bank_name: '---', owner: '---', number: '---', currency: '$', amount: '0,00', issueDate: '--/--/----' };
  const BankPlaceholderData = { bank_name: '---', owner: '---', cuil_cuit: '--', cbu: '*** ----', reserved_funds: '$0,00' };

  const isDeliveryComplete = calle.trim() !== '' && altura.trim() !== '' && ciudad.trim() !== '';
  const isFormValid = selectedMethod !== null && isDeliveryComplete;

  const renderPaymentCarousel = () => {
    if (!selectedMethod) return null;

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
      <Stack.Screen options={{ gestureEnabled: false }} />
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
          
          <View className="flex-row justify-between items-center mb-6 mt-8">
            <Text className="text-white text-2xl">
              <Text className="font-bold">Subasta: </Text> 
              {item?.descripcioncatalogo}
            </Text>
          </View>

          <Text className="text-white text-xl mb-4">
            <Text className="font-bold">Articulo: </Text> 
            {item?.descripcioncompleta}
          </Text>

          <View className="flex-row mb-6">
            <View className="flex-1 pr-4 justify-between">
              <DetailsList data={articleDetails} />
            </View>
            <View className="flex-1">
              <ImageCarousel images={imageBase64Render(item?.fotos)} />
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
              onPress={() => {
                if (isFormValid) setConfirmModalVisible(true);
              }} 
              variant={isFormValid ? "primary" : "blocked"} 
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