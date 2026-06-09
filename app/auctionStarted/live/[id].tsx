import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuctionDisplayCard from '@/components/auctions/AuctionDisplayCard';
import VictoryModal from '@/components/auctions/VictoryModal';
import BidInput from '@/components/common/BidInput';
import Button from '@/components/common/Button';
import DetailsList from '@/components/common/DetailList';
import ImageCarousel from '@/components/common/ImageCarousel';
import NoAuction from '@/components/common/NoAuction';
import RoundedButton from '@/components/common/RoundedButton';
import LiveButton from '@/components/home/LiveButton';
import BidHistoryLog, { BidEvent } from '@/components/profile/BidHistoryLog';

import { useAuth } from '@/context/AuthContext';
import { f1AuctionsData } from "../../data/auctions";

export default function LiveAuctionScreen() {
  const router = useRouter();
  const { id, readonly } = useLocalSearchParams();
  const isReadOnly = readonly === 'true';
  const [won, setWon] = useState(false); 
  const {user} = useAuth();
  const [isLogged, setLogged] = useState(user ? true : false);

  const auction = f1AuctionsData.find((item) => item.id === id);
  const live = auction?.live; 

  // Mocks de pujas para simular la actividad en i ? vivo
  const [bids, setBids] = useState<BidEvent[]>([
    { id: '1', timestamp: '14:30:55', idCategory: 2, name: 'Martin', amount: 1000000 },
    { id: '2', timestamp: '14:31:20', idCategory: 3, name: 'Mateo', amount: 1150000 },
    { id: '3', timestamp: '14:31:50', idCategory: 1, name: 'Eric', amount: 1200000 },
    { id: '4', timestamp: '14:32:15', idCategory: 2, name: 'Octavio', amount: 1250000 },
    { id: '5', timestamp: '14:34:15', idCategory: 3, name: 'Lisandro', amount: 1250000 },
    { id: '6', timestamp: '14:35:15', idCategory: 3, name: 'Messi', amount: 1250000 },
    { id: '7', timestamp: '14:38:15', idCategory: 2, name: 'Buendía', amount: 1250000 },
    { id: '8', timestamp: '14:42:15', idCategory: 1, name: 'Paz', amount: 1250000 },
    { id: '9', timestamp: '14:42:15', idCategory: 1, name: 'Guilano', amount: 1250000 },
    { id: '10', timestamp: '14:42:15', idCategory: 1, name: 'Paredes', amount: 1250000 },
    { id: '11', timestamp: '14:42:15', idCategory: 2, name: 'De Paul', amount: 1250000 },
    { id: '12', timestamp: '14:42:15', idCategory: 3, name: 'Aranda', amount: 1250000 },
  ]);

  if (!auction) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction />
      </SafeAreaView>
    );
  }

  // Preparamos los datos para el DetailsList
  const articleDetails = [
    { label: 'Fecha', value: auction.fecha },
    { label: 'ID', value: `A1/${new Date().getFullYear()}` },
    { label: 'Comisión', value: '18%' },
  ];

  const precioBase = 1000000;

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

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View className="flex-row justify-between items-start mb-6 mt-2">
          <Text 
            className="text-white text-2xl flex-1 mr-4"
            numberOfLines={2} 
          >
            <Text className="font-bold">Subasta: </Text> 
            {auction.title}
          </Text>
          <View className="mt-1">
            <RoundedButton variant="secondary" label="Catalogo" onPress={() => router.push(`/auctionStarted/catalogue/${auction.id}`)} />
          </View>
        </View>

        <Text className="text-white text-xl mb-4">
          <Text className="font-bold">Articulo 1: </Text> 
          Livery Alpine 2025
        </Text>

        <View className="flex-row mb-6">
          <View className="flex-1 pr-4 justify-between">
            <View>
              <DetailsList data={articleDetails} />
            </View>
            <View className="w-full">
              <Text className="text-gray-400 text-base mb-1.5 leading-relaxed">Precio base: </Text>
              <Text className="text-gray-300">{(isLogged && !isReadOnly) ? '$' + precioBase.toLocaleString() : 'No disponible'}</Text>
            </View>
            <View className="gap-y-3 mt-4">
              <RoundedButton variant="secondary" label="Detalle Producto" onPress={() => console.log('Detalle')} />
              <LiveButton onPress={() => console.log('Viendo stream...')} />
            </View>
          </View>

          <View className="flex-1">
            <ImageCarousel images={auction.images} />
          </View>
        </View>

        <View className="h-[1px] bg-[#333333] w-full mb-6" />

        <AuctionDisplayCard money={false} initialTime={54} />
        <AuctionDisplayCard money={true} amount={1250000} />

        <View className="mt-4">
          <BidHistoryLog bids={bids} />
        </View>

        <View className="mt-6">
          <BidInput 
            min={1262500} 
            max={1500000} 
            // Si el modo es readonly (Solo a ver), bloqueamos el input
            enabled={!isReadOnly} 
          />
          <View className="mt-4">
            <Button 
              label="Pujar" 
              // Si es readonly, usamos la variante blocked
              variant={isReadOnly ? 'blocked' : 'primary'} 
              onPress={() => console.log('Puja enviada')} 
            />
          </View>
        </View>

      </ScrollView>
      {/* MODAL DE VICTORIA */}
      {won && (
        <>
          <VictoryModal
            visible={won}
            itemName={auction.title}
            winningBid="$ 1,250,000"
            onProceed={() => {
              setWon(false);
              router.push(`/auctionStarted/live/pay/${auction.id}`);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}