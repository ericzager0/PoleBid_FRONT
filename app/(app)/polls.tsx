import Auction from "@/components/Auction";
import FilterButton from "@/components/FilterButton";
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { f1AuctionsData } from "../data/auctions";

interface AuctionItem {
  id: string;
  categoryId: number;
  imageSrc: string;
  title: string;
  fecha: string;
  hora: string;
  owner: string;
  onPress?: () => void;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const categorias = ['Todas', 'Silver', 'Gold', 'Platinum'];

  const router = useRouter();

  const renderItem = ({ item }: { item: AuctionItem }) => (
    <Auction 
      categoryId={item.categoryId}
      imageSrc={item.imageSrc}
      title={item.title}
      fecha={item.fecha}
      hora={item.hora}
      owner={item.owner}
      onPress={() => router.push(`/auction/${item.id}`)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-[#14191C] items-center">
      <View className="w-[90%] flex-1 pt-4">
    
        <View className="gap-y-5">
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar subastas, items, categorías" 
          />
          <View className="flex-row justify-center gap-x-3 w-full">
            {categorias.map((cat) => (
              <FilterButton 
                key={cat}
                label={cat}
                isActive={filtroActivo === cat}
                onPress={() => setFiltroActivo(cat)}
              />
            ))}
          </View>
        </View>
        
        <View className="flex-1 w-full mt-6">
          <FlatList
            data={f1AuctionsData} 
            keyExtractor={(item) => item.id} 
            renderItem={renderItem} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}
