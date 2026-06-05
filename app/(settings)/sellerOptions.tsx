import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActivateSellerMessage from '@/components/ActivateSellerMessege';
import SafetyMessage from '@/components/SafetyMessege';
import SellerToggle from '@/components/SellerToggle';
import BankDetailsModal, { BankData } from '../../components/BankDetailsModal';
import BankPlaceholder from '../../components/BankPlaceholder';
import PaymentCarousel from '../../components/PaymentCarousel';
import RoundedButton from '../../components/RoundedButton';

const BankPlaceholderData = { 
  bankName: '---', 
  titular: '---', 
  cuil: '--', 
  accountNumber: '*** ----' 
};

export default function SellerScreen() {
  const router = useRouter();
  const [seller, setSeller] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankToEdit, setBankToEdit] = useState<BankData | null>(null);

  const userBankAccounts = [{ 
    bankName: 'Banco Santander', 
    titular: 'Alejandro Martínez Silva', 
    cuil: '20-12345678-9', 
    accountNumber: '*** 4567' 
  }];
  const userCobroAccounts: any[] = []; 
  
  const handleAddBank = () => {
    if (!seller) return;
    setBankToEdit(null);
    setShowBankModal(true);
  };
  const handleEditBank = (bank: BankData) => {
    if (!seller) return;
    setBankToEdit(bank);
    setShowBankModal(true);
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <RoundedButton onPress={() => console.log('Cerrando sesión...')} />
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 16 }}
      >
        <View className="gap-y-6">
          <SellerToggle 
            isSeller={seller} 
            onToggle={(value) => setSeller(value)} 
          />
          
          <PaymentCarousel 
            title="Administrar cuenta de Cobro:"
            data={userCobroAccounts}
            placeholderData={BankPlaceholderData}
            showArrows={false}
            renderItem={(item) => (
              <BankPlaceholder 
                {...item} 
                blocked={!seller} 
              />
            )}
            onPressAdd={handleAddBank}
            onPressEdit={() => handleEditBank(userBankAccounts[0])}
          />
          
          {seller ? <SafetyMessage /> : <ActivateSellerMessage />}
        </View>

      </ScrollView>

      {/* Modal */}
      <BankDetailsModal
        visible={showBankModal}
        initialData={bankToEdit}
        onClose={() => setShowBankModal(false)}
        onConfirm={(data) => console.log('Banco confirmado:', data)}
      />
    </SafeAreaView>
  );
}