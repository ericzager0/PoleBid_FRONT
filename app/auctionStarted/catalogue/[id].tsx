import NoAuction from '@/components/common/NoAuction';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { f1AuctionsData } from '@/app/data/auctions';
import CatalogueProductCard from '@/components/auctions/CatalogueProductCard';
import CatalogueTitle from '@/components/auctions/CatalogueTitle';
import { useAuth } from '@/context/AuthContext';

export default function CatalogueScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {user} = useAuth();

  const auction = f1AuctionsData.find((item) => item.id === id);
  if (!auction) {
     return (
     <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction />
     </SafeAreaView>
    );
  }

  const catalogueHeader = {
    title: "Exclusive Collection 2026",
    subtitle: "Global Prestige Motorsports & Luxury Horology",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop", 
    isLive: false
  };

  const featuredItems = [
    {
      id: '1',
      title: "Vintage Chronograph 1958",
      description: "Breve descripción: Edición limitada restaurada con componentes originales.",
      price: "15,450$",
      date: "Martes 5 de abril de 2026",
      time: "14:15 Hs",
      imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop" 
    },
    {
      id: '2',
      title: "Racing Helm Elite G5",
      description: "Breve descripción: Casco de competición profesional con firma certificada.",
      price: "2,100$",
      date: "Martes 5 de abril de 2026",
      time: "15:30 Hs",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop" 
    },
    {
      id: '3',
      title: "Concept Sketch NFT",
      description: "Breve descripción: Arte conceptual original firmado por el diseñador jefe.",
      price: "850$",
      date: "Miércoles 6 de abril de 2026",
      time: "10:00 Hs",
      imageUrl: "https://images.unsplash.com/photo-1618177580436-09756b3e6c0c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="px-4 pt-2 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="self-start p-1 -ml-1">
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        <CatalogueTitle 
          title={auction.title}
          subtitle={catalogueHeader.subtitle}
          imageUrl={catalogueHeader.imageUrl}
          isLive={catalogueHeader.isLive}
        />

        <View className="flex-row justify-between items-center mt-8 mb-5">
          <Text className="text-white text-lg font-bold tracking-wide">
            Featured Items <Text className="text-[#E8B83C]">({featuredItems.length} Items)</Text>
          </Text>
          
          <TouchableOpacity 
            className="p-1"
            onPress={() => console.log('Abrir filtros...')}
          >
            <MaterialCommunityIcons name="tune-variant" size={24} color="#E8B83C" />
          </TouchableOpacity>
        </View>

        <View className="gap-y-1">
          {featuredItems.map((item) => (
            <CatalogueProductCard
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              date={item.date}
              time={item.time}
              imageUrl={item.imageUrl}
              onPress={() => router.push(`/auctionStarted/catalogue/product/${auction.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}