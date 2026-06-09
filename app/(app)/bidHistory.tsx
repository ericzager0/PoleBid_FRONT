import DetailsList from '@/components/common/DetailList';
import ImageCarousel from '@/components/common/ImageCarousel';
import NoAuction from '@/components/common/NoAuction';
import RoundedButton from '@/components/common/RoundedButton';
import BidHistoryLog, { BidEvent } from '@/components/profile/BidHistoryLog';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { f1AuctionsData } from "../data/auctions";

export default function BidHistoryScreen() {
  const router = useRouter();
  const { id, won } = useLocalSearchParams();

  const auction = f1AuctionsData.find((item) => item.id === id);
  if (!auction) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction />
      </SafeAreaView>
    );
  }

  // Mocks de pujas para simular la actividad en vivo
  const [bids, setBids] = useState<BidEvent[]>([
    { id: '1', timestamp: '14:30:55', idCategory: 2, name: 'Martin', amount: 1000000 },
    { id: '2', timestamp: '14:31:20', idCategory: 3, name: 'Mateo', amount: 1150000 },
    { id: '3', timestamp: '14:31:50', idCategory: 1, name: 'Eric', amount: 1200000 },
    { id: '4', timestamp: '14:32:15', idCategory: 2, name: 'Octavio', amount: 1250000 },
    { id: '5', timestamp: '14:34:15', idCategory: 3, name: 'Lisandro', amount: 1250000 },
    { id: '6', timestamp: '14:35:15', idCategory: 3, name: 'Messi', amount: 1250000 },
    { id: '7', timestamp: '14:38:15', idCategory: 2, name: 'Buendía', amount: 1250000 },
    { id: '8', timestamp: '14:42:15', idCategory: 1, name: 'Paz', amount: 1250000 },
  ]);

  const articleDetails = [
    { label: 'Fecha', value: auction.fecha },
    { label: 'ID', value: `A1/${new Date().getFullYear()}` },
    { label: 'Precio Base', value: '$1,000,000' },
    { label: 'Comisión', value: '18%' },
  ];

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

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View className="flex-row justify-between items-start mb-6 mt-2">
          <Text className="text-white text-2xl flex-1 mr-4" numberOfLines={2}>
            <Text className="font-bold">Subasta: </Text>
            {auction.title}
          </Text>
          <View className="mt-1">
            <RoundedButton 
              variant="secondary" 
              label="Catalogo" 
              onPress={() => router.push(`/auctionStarted/catalogue/1`)} 
            />
          </View>
        </View>

        {won === 'true' && (
          <View className="flex-row items-center gap-x-3 bg-[#E8B83C]/10 p-4 rounded-xl border border-[#E8B83C]/30 mb-6">
            <FontAwesome5 name="trophy" size={36} color="#E8B83C" />
            <View>
              <Text className="text-white text-lg font-bold tracking-tight">¡Ganaste la subasta!</Text>
              <Text className="text-gray-300 text-sm">Has quedado en primer lugar.</Text>
            </View>
          </View>
        )}

        <View className="flex-row mb-6">
          <View className="flex-1 pr-4 justify-between">
            <DetailsList data={articleDetails} />
          </View>
          
          <View className="flex-1"> 
            <ImageCarousel images={auction.images} />
          </View>
          
        </View>

        <View className="h-[1px] bg-[#333333] w-full mb-8" />

        <Text className="text-white text-lg font-bold tracking-widest uppercase mb-1">
          bid history:
        </Text>

        <View className="mb-8 z-10 w-full flex-1 min-h-[400px]">
          <BidHistoryLog bids={bids} fullHeight={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}