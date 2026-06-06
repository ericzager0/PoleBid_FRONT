import Auction from '@/components/auctions/Auction';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();

  const activeAuctionsData = [
    { id: '1', categoryId: 2, imageSrc: 'https://imgs.search.brave.com/qyzM_SmMSFOiqbGUn8pnGunMSG1XFH0HHPjf0W_GGQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaWxv/ZHJvbWUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzEy/L0F5cnRvbi1TZW5u/YS1NY0xhcmVuLUhl/bG1ldC1TaWRlLTIt/NzQweDU5Mi5qcGc', title: 'Casco Fangio 1951', fecha: '12/05/2026', hora: '14:30', owner: 'Colección Privada' },
  ];

  const upcomingAuctionsData = [
    { id: '2', categoryId: 3, imageSrc: 'https://picsum.photos/seed/senna_1/400/200', title: 'Livery Alpine 2025', fecha: '14/05/2026', hora: '18:00', owner: 'Renault Group' },
    { id: '3', categoryId: 1, imageSrc: 'https://picsum.photos/seed/senna_1/400/200', title: 'Guantes Senna', fecha: '20/05/2026', hora: '10:00', owner: 'Instituto Ayrton Senna' },
    { id: '4', categoryId: 2, imageSrc: 'https://picsum.photos/seed/senna_1/400/200', title: 'Alerón Ferrari SF-23', fecha: '22/05/2026', hora: '15:00', owner: 'Scuderia Ferrari' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        
        <View className="items-center justify-center bg-[#14191C] ">
          <Image 
            source={require('../../assets/images/icon.png')} 
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        <Text className="text-white text-2xl font-bold tracking-wide mb-4">
          Subastas activas
        </Text>
        
        {activeAuctionsData.map(item => (
          <Auction 
            key={item.id}
            categoryId={item.categoryId}
            imageSrc={item.imageSrc}
            title={item.title}
            fecha={item.fecha}
            hora={item.hora}
            owner={item.owner}
            isActive={true} 
            onPress={() => router.push(`/auctionStarted/${item.id}`)}
          />
        ))}

        <Text className="text-white text-2xl font-bold tracking-wide mt-6 mb-4">
          Próximas subastas
        </Text>

        {upcomingAuctionsData.map(item => (
          <Auction 
            key={item.id}
            categoryId={item.categoryId}
            imageSrc={item.imageSrc}
            title={item.title}
            fecha={item.fecha}
            hora={item.hora}
            owner={item.owner}
            isActive={false}
            onPress={() => router.push(`/auctionStarted/${item.id}`)}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
