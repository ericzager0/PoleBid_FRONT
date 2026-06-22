import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActivateSellerMessage from '@/components/settings/ActivateSellerMessege';
import SafetyMessage from '@/components/settings/SafetyMessege';
import SellerToggle from '@/components/settings/SellerToggle';
import { useAuth } from '@/context/AuthContext';
import BankDetailsModal, { BankData } from '../../components/common/BankDetailsModal';
import RoundedButton from '../../components/common/RoundedButton';
import UserStatusCard, { UserStatus } from '../../components/profile/UserStatusCard';
import BankPlaceholder from '../../components/settings/BankPlaceholder';
import PaymentCarousel from '../../components/settings/PaymentCarousel';

const BankPlaceholderData = { 
  bank_name: '---', 
  owner: '---', 
  cuil_cuit: '--', 
  cbu: '*** ----', 
  reserved_funds: '$0,00' 
};

export default function SellerScreen() {
  const { user, signOut, getMe } = useAuth();
  const aprrobedSeller = user?.isSeller || false;
  
  const router = useRouter();
  const [seller, setSeller] = useState(false);
  const [status, setStatus] = useState<UserStatus>('inactivo');
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankToEdit, setBankToEdit] = useState<BankData | null>(null);
  const [misBancos, setMisBancos] = useState<any[]>([]);

  const userBankAccounts = user?.paymentMethods.banksAccounts || [];
  const userCobroAccounts: any[] = []; 
  
  const isFullyApproved = seller && aprrobedSeller;

  useEffect(() => {
    const loadToggleState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('@seller_toggle');
        if (savedState !== null) {
          setSeller(JSON.parse(savedState));
        }
      } catch (error) {
        console.error("Error al cargar el estado del toggle:", error);
      }
    };
    loadToggleState();
  }, []);

  useEffect(() => {
    if (seller) {
      setStatus(aprrobedSeller ? 'verificado' : 'en_espera');
    } else {
      setStatus('inactivo');
    }
  }, [seller, aprrobedSeller]);

  useEffect(() => {
    if (user?.paymentMethods.banksAccounts) {
      setMisBancos(user.paymentMethods.banksAccounts);
    }
  }, [user]);

  const handleToggleChange = async (value: boolean) => {
    setSeller(value); 
    try {
      await AsyncStorage.setItem('@seller_toggle', JSON.stringify(value)); 
    } catch (error) {
      console.error("Error al guardar el estado del toggle:", error);
    }
  };

  const handleAddBank = () => {
    if (!isFullyApproved) return;
    setBankToEdit(null);
    setShowBankModal(true);
  };

  const handleEditBank = (bank: BankData) => {
    if (!isFullyApproved) return;
    setBankToEdit(bank);
    setShowBankModal(true);
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <RoundedButton onPress={signOut} />
      </View>
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 16 }}
      >
        <View className="gap-y-6">
          <SellerToggle 
            isSeller={seller} 
            onToggle={handleToggleChange} 
          />
          
          <PaymentCarousel 
            title="Administrar cuenta de Cobro:"
            data={misBancos}
            placeholderData={BankPlaceholderData}
            showArrows={false}
            renderItem={(item) => (
              <BankPlaceholder 
                {...item} 
                blocked={!isFullyApproved} 
              />
            )}
            onPressAdd={handleAddBank}
            onPressEdit={(item) => handleEditBank(item as BankData)}
          />
          
          {seller ? <SafetyMessage /> : <ActivateSellerMessage />}
          <View className="mt-8 mb-4">
            <UserStatusCard isUser={true} status={status} />
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <BankDetailsModal
        visible={showBankModal}
        initialData={bankToEdit}
        onClose={() => setShowBankModal(false)}
        onConfirm={async (nuevoBanco) => {
          setMisBancos((bancosAnteriores) => [...bancosAnteriores, nuevoBanco]);
          setShowBankModal(false);
          await getMe();
        }}
      />
    </SafeAreaView>
  );
}