import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ImageCarousel from '@/components/common/ImageCarousel';

import { imageBase64Render } from '@/api/utils/imageBase64Render';
import { f1AuctionsData } from '@/app/data/auctions';
import ConfirmButton from '@/components/articles/ConfirmButton';
import BriefAuctionDetails from '@/components/auctions/BriefAuctionDetails';
import CommissionRow from '@/components/auctions/CommissionRow';
import { useAuth } from '@/context/AuthContext';

export default function ReadyBid() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {user} = useAuth();
  const productsList = Array.isArray(user?.products) ? user.products : (user?.products ? [user.products] : []);
  const product = productsList.find((item) => String(item.identificador) === String(id));
  
  if (!product) {
    return (
    <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
      <Text className="text-white">Producto no encontrado</Text>
    </SafeAreaView>
    );
  }

  const imagesToDisplay = imageBase64Render(product);

  const handleReject = () => {
    console.log("Se rechazó la acción");
  };

  const handleAccept = () => {
    console.log("Se aceptó la acción");
  };

  //MOCK auction
  const auction = f1AuctionsData.find((item) => item.id === '6');
  const auctionName = auction?.title ?? ' - ';
  const auctionDate = auction?.fecha ?? ' - ';

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.push('/(app)/articles/myArticles')}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 mb-8">
          <Text className="text-white text-5xl font-bold mb-4 tracking-tight leading-[55px]">
            Subasta finalizada
          </Text>
          <Text className="text-[#9CA3AF] text-lg leading-6 pr-4">
            Tu artículo fue aprobado tras inspección. A continuacion los detalles de su subasta sugerida:
          </Text>
        </View>

        <BriefAuctionDetails auctionName={auctionName} date={auctionDate} />

        <View className="items-center mb-6">
          <Text className="text-[#D1D5DB] text-lg text-center">
            {product.descripcioncatalogo}
          </Text>
        </View>

        <View className="mb-6 h-64 w-full rounded-2xl overflow-hidden">
          <ImageCarousel images={imagesToDisplay} />
        </View>

        <View className="items-center justify-center gap-4 mb-10">
            <Text className="text-white text-4xl font-extrabold tracking-tight">
                ARS ${product.precioBase || ' - '}
            </Text>

            <View className="w-full mt-4 mb-8">
                <CommissionRow percentage={10}/>
            </View>

            <View className="flex-row items-center justify-between gap-x-4 w-full"> 
                <ConfirmButton 
                isAccepted={false} 
                onPress={handleReject} 
                />
                
                <ConfirmButton 
                isAccepted={true} 
                onPress={handleAccept} 
                />
                
            </View>

            <View className="flex-row items-center bg-[#1C1C1E] border border-[#E8B83C]/60 rounded-2xl p-5 w-full">
                <MaterialCommunityIcons 
                    name="check-decagram-outline" 
                    size={32} 
                    color="#E8B83C" 
                />
                <Text className="text-[#E8B83C] text-[17px] font-medium ml-4 flex-1 tracking-wide leading-6">
                    Al aceptar, te garantizamos que recibiras el valor del precio base (menos la comision) en caso que nadie subaste por tu articulo o algo le ocurra a este hasta el dia de la subasta.
                </Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}