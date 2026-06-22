import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';

export default function PayProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  
  // === NUEVO ESTADO: Índice del carrusel seleccionado ===
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Estados para la Alerta Integrada
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });

  // Estados de envío
  const [hasShipping, setHasShipping] = useState(true);
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

  const userCards = user?.paymentMethods?.cards || [];
  const userChecks = user?.paymentMethods?.checks || [];
  const userBankAccounts = user?.paymentMethods?.banksAccounts || [];

  const CardPlaceholderData = {
    brand: "---",
    owner: "---",
    lastFour: "****",
    expMonth: "--",
    expYear: "----",
  };

  const CheckPlaceholderData = { bank_name: '---', owner: '---', number: '---', currency: '$', amount: '0,00', issueDate: '--/--/----' };
  const BankPlaceholderData = { bank_name: '---', owner: '---', cuil_cuit: '--', cbu: '*** ----', reserved_funds: '$0,00' };

  // Cálculos matemáticos del total a pagar
  const precioFinalValue = Number(item?.precioFinal) || 0;
  const ivaValue = precioFinalValue * 0.21; // Calculando el 21% de IVA
  const shippingCost = hasShipping ? 2450 : 0;
  const totalAPagar = precioFinalValue + ivaValue + shippingCost;

  // Validaciones
  const isDeliveryComplete = calle.trim() !== '' && altura.trim() !== '' && ciudad.trim() !== '';
  const isFormValid = selectedMethod !== null && (!hasShipping || isDeliveryComplete);

  // === VALIDAÇÃO ESTRICTA DEL ELEMENTO SELECCIONADO ===
  const handleConfirm = () => {
    if (!isFormValid) return;

    if (selectedMethod === 'Tarjeta') {
      if (userCards.length === 0) {
        setAlertContent({
          title: "Sin tarjetas",
          description: "No tenés tarjetas de crédito registradas.\n\nSi no logras cubrir la deuda por el artículo ganado serás penalizado. Por favor, agregá una o seleccioná otro medio de pago para avanzar.",
        });
        setIsAlertVisible(true);
        return;
      }
    } else if (selectedMethod === 'Cheque') {
      if (userChecks.length === 0) {
        setAlertContent({
          title: "Sin cheques",
          description: "No tenés cheques registrados. Por favor, seleccioná otro medio de pago.",
        });
        setIsAlertVisible(true);
        return;
      }
      
      // Chequeamos ESTRICTAMENTE el cheque seleccionado en el carrusel
      const selectedCheck = userChecks[selectedIndex];
      
      if (!selectedCheck || Number(selectedCheck.amount) < totalAPagar) {
        setAlertContent({
          title: "Fondos insuficientes",
          description: "El cheque que seleccionaste no cuenta con el monto suficiente para cubrir el total a pagar.\n\nSi no logras cubrir la deuda por el artículo ganado serás penalizado. Por favor, seleccioná otro cheque deslizando el carrusel u otro medio de pago.",
        });
        setIsAlertVisible(true);
        return;
      }

    } else if (selectedMethod === 'Cuenta de banco') {
      if (userBankAccounts.length === 0) {
        setAlertContent({
          title: "Sin cuentas bancarias",
          description: "No tenés cuentas bancarias registradas. Por favor, seleccioná otro medio de pago.",
        });
        setIsAlertVisible(true);
        return;
      }

      // Chequeamos ESTRICTAMENTE la cuenta seleccionada en el carrusel
      const selectedAccount = userBankAccounts[selectedIndex];
      
      if (!selectedAccount || Number(selectedAccount.reserved_funds) < totalAPagar) {
        setAlertContent({
          title: "Fondos insuficientes",
          description: "La cuenta bancaria que seleccionaste no tiene fondos suficientes para cubrir el total a pagar.\n\nSi no logras cubrir la deuda por el artículo ganado serás penalizado. Por favor, seleccioná otra cuenta deslizando el carrusel u otro medio de pago.",
        });
        setIsAlertVisible(true);
        return;
      }
    }

    // Si todo está perfecto, avanzamos
    setConfirmModalVisible(true);
  };

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
            onIndexChange={(index: number) => setSelectedIndex(index)}
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
            onIndexChange={(index: number) => setSelectedIndex(index)}
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
            onIndexChange={(index: number) => setSelectedIndex(index)}
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
              onSelect={(method) => {
                setSelectedMethod(method);
                setSelectedIndex(0); // <--- Reseteamos el índice a 0 cada vez que se cambia de método de pago
              }} 
            />
          </View>

          <View className="mb-6 z-10">
            {renderPaymentCarousel()}
          </View>

          {/* Checkbox de Envio */}
          <TouchableOpacity 
            className="flex-row items-center mb-4"
            onPress={() => setHasShipping(!hasShipping)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={hasShipping ? "checkbox" : "square-outline"} 
              size={24} 
              color={hasShipping ? "#E8B83C" : "#9CA3AF"} 
            />
            <Text className="text-white ml-3 text-base font-medium">Solicitar envío a domicilio</Text>
          </TouchableOpacity>

          {/* Formulário de envio */}
          {hasShipping && (
            <View className="mb-6 z-10">
              <DeliveryDataCard 
                calle={calle} 
                setCalle={setCalle} 
                altura={altura} 
                setAltura={setAltura} 
                ciudad={ciudad} 
                setCiudad={setCiudad} 
              />
            </View>
          )}

          {/* Resumo de Pagamento */}
          <View className="bg-[#1C1C1E] p-5 rounded-2xl border border-[#333333] mb-6">
            <Text className="text-white text-lg font-bold mb-4">Resumen de Pago</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-[#9CA3AF] text-base">Precio Final</Text>
              <Text className="text-white text-base font-medium">$ {precioFinalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-[#9CA3AF] text-base">IVA (21%)</Text>
              <Text className="text-white text-base font-medium">$ {ivaValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
            </View>
            
            <View className="flex-row justify-between mb-4">
              <Text className="text-[#9CA3AF] text-base">Costo de envío</Text>
              <Text className="text-white text-base font-medium">$ {shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
            </View>

            <View className="h-[1px] bg-[#333333] w-full mb-4" />

            <View className="flex-row justify-between items-center">
              <Text className="text-white text-xl font-bold">Total a Pagar</Text>
              <Text className="text-[#E8B83C] text-2xl font-extrabold">
                $ {totalAPagar.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Button 
              label="Confirmar >" 
              onPress={handleConfirm}
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

      {/* Modal de Alerta Integrado */}
      <Modal
        visible={isAlertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsAlertVisible(false)}
      >
        <View className="flex-1 bg-black/85 justify-center px-4">
          <View className="bg-[#1C1C1E] w-full rounded-[24px] p-6 items-center border border-[#EF4444]/30 shadow-2xl z-10">
            
            <View className="w-24 h-24 bg-[#2A2B30] rounded-full items-center justify-center mb-5 border-[3px] border-[#EF4444] shadow-lg">
              <Ionicons name="alert-circle" size={50} color="#EF4444" />
            </View>

            <Text className="text-[#EF4444] text-[28px] font-extrabold tracking-wide mb-2 text-center">
              {alertContent.title}
            </Text>

            <Text className="text-[#9CA3AF] text-base text-center px-2 mb-8 leading-relaxed">
              {alertContent.description}
            </Text>

            <View className="w-full">
              <Button 
                label="Entendido" 
                variant="primary" 
                onPress={() => setIsAlertVisible(false)} 
              />
            </View>
            
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}