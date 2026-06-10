import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { f1AuctionsData } from '@/app/data/auctions';
import CommissionRow from '@/components/auctions/CommissionRow';
import ProductDetailCard from '@/components/auctions/ProductDetailCard';
import Button from '@/components/common/Button';
import ImageCarousel from '@/components/common/ImageCarousel';
import NoAuction from '@/components/common/NoAuction';

export default function AuctionItemScreen() {
  const { id, isArticles } = useLocalSearchParams();
  const router = useRouter();

  const isFromArticles = isArticles === 'true';

  const auction = f1AuctionsData.find((item) => item.id === id);
  if (!auction) {
    return (
    <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
      <NoAuction />
    </SafeAreaView>
    );
  }

  const mockImages = [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548171915-e76a3ffb1d9c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587836374361-f1665d1426a8?q=80&w=1000&auto=format&fit=crop'
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1C1C1E]">
        <TouchableOpacity 
          onPress={isFromArticles ? () => router.push('/articles/myArticles') : () => router.back() } 
          className="p-1 -ml-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text className="text-white text-lg font-bold tracking-wide">
          {auction.title}
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        <ImageCarousel images={mockImages} />

        <View className="w-full h-1 bg-[#2A2B30] mt-4 mb-6 rounded-full flex-row">
          <View className="w-1/3 h-full bg-[#E8B83C] rounded-full" />
        </View>

        <ProductDetailCard 
          price="15,450$" 
          date="Martes 5 de abril de 2026" 
          time="14:15 Hs" 
        />

        <View className="mt-6 mb-4 px-1">
          <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.15em] uppercase mb-2">
            Descripción Completa
          </Text>
          <Text className="text-[#D1D5DB] text-base italic leading-relaxed">
            "encara Messi y se va se va messi para el gol ta tan ta tan es un golazo noooo. Era el gol de la la fecha"
          </Text>
        </View>

        <View className="mt-4 mb-8">
          <CommissionRow percentage="X" /> 
        </View>

        <Button 
          label={!isFromArticles ? "Volver" : "Volver a mis artículos"}
          variant="primary" 
          onPress={isFromArticles ? () => router.push('/articles/myArticles') : () => router.back()} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}