import Button from '@/components/common/Button';
import PaymentMethodSelector, { PaymentMethodType } from '@/components/common/PaymentMethodSelector';
import SafetyMessage from '@/components/settings/SafetyMessege';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import verifyEmailOk from '../../../assets/images/verify-email-ok.png';

export default function ElegirMetodoScreen() {
  const [metodoElegido, setMetodoElegido] = useState<PaymentMethodType | null>(null);
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#14191C] p-8">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>    
        <Image source={verifyEmailOk} style={{ width: 100, height: 100 }} /> 
        <View className="gap-6">
            <Text className="text-white text-[35px] font-bold">
            !Registro Completado¡
            </Text>
            <Text className="text-white text-1xl">
            Para empezar a pujar, por favor configura tu primer método de pago.
            </Text>
        </View>

        <View className="gap-8 mt-10 mb-4">
            <PaymentMethodSelector 
                onSelect={(metodo) => setMetodoElegido(metodo)} 
            />
            <SafetyMessage message="Tus datos están protegidos por encriptación de nivel bancario. PoleBid no almacena sus credenciales directas." />
        </View>
    
        <View className="flex-1 justify-end">
          <Button 
            label="Continuar" 
            disabled={!metodoElegido} 
            onPress={() => {
              router.push({
                pathname: '/register/payment-details',
                params: { method: metodoElegido }
              });
            }}
            />
        </View>
      </ScrollView>
    </View>
  );
}