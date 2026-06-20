import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReceiptCard from '@/components/articles/ReciptCard';
import ViewBidButton from '@/components/articles/ViewBidButton';
import ImageCarousel from '@/components/common/ImageCarousel';

import { auctionService, AuctionType } from '@/api/services/auction';
import { itemsService, ItemType } from '@/api/services/items';
import NoAuction from '@/components/common/NoAuction';

export default function BidEnded() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [product, setproduct] = useState<ItemType | null>(null);
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auctionService.getAuctions();
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions: ", error);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(() => {
    const fetchproduct = async () => {
      if (id) {
        try {
          const response = await itemsService.getItem(Number(id));
          setproduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchproduct();
  }, [id]);
  
  const productId = Number(id);

  const auction = auctions.find((item) => Number(item.identificador) === productId);
  if(!auction) {
    return <NoAuction title="Subasta no encontrada" text="La subasta que buscas no existe o ya ha finalizado." />;
  }

  //MOCK
  const buyerName = "Antonio Conte";
  const totalAmount = 140000;

  const netAmount = totalAmount * (product?.comision || 0.03); //COMISIÓN BASE

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
            Tu articulo fue subastado en la siguiente subasta: 
          </Text>
        </View>

        <View className="items-center mb-6">
          <Text className="text-white text-xl font-medium mb-1 text-center">
            {auction.fecha}
          </Text>
          <Text className="text-[#D1D5DB] text-lg text-center">
            {auction.descripcion}
          </Text>
        </View>

        <View className="mb-6 h-64 w-full rounded-2xl overflow-hidden">
          <ImageCarousel images={Array.isArray(auction.foto) ? auction.foto : [auction.foto]} />
        </View>

        <View className="items-center justify-center gap-4 mb-10">
          <ViewBidButton
            label="Ver subasta"
            className="self-center"
            onPress={() => router.push({
              pathname: '/bidHistory',
              params: { id: auction.identificador }
            })}
          />
        
            <ReceiptCard
                buyerName={buyerName}
                totalAmount={totalAmount}
                netAmount={netAmount}
            />

            <View className="flex-row items-center bg-[#1C1C1E] border border-[#E8B83C]/60 rounded-2xl p-5 w-full">
                <MaterialCommunityIcons 
                    name="credit-card-check-outline" 
                    size={32} 
                    color="#E8B83C" 
                />
                <Text className="text-[#E8B83C] text-[17px] font-medium ml-4 flex-1 tracking-wide leading-6">
                    Fondos acreditados en tu billetera.
                </Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}