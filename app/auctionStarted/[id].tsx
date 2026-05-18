import AuctionDetailCard from '@/components/AuctionDetailCard';
import { Button } from '@/components/Button';
import SimpleModal from '@/components/SimpleModal';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { f1AuctionsData } from "../data/auctions";

const categoryIdUser = 1;

export default function AuctionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const auction = f1AuctionsData.find((item) => item.id === id);
  //NO Id
  if (!auction) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <Text className="text-white text-lg">Subasta no encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center gap-y-4 py-5">
        <Text className="font-bold text-[32px] text-white">{auction.title}</Text>
        <AuctionDetailCard 
          fecha={auction.fecha}
          estado={auction.state}
          descripcion={auction.description}
          images={auction.images}
        />

        <View className='flex-row gap-x-4 w-full justify-center'>
          <Button
            label="Ingresar a la subasta"
            onPress={() => {
              if (auction.categoryId !== categoryIdUser) {
                setModalVisible(true);
              } else {
                alert('Función de ingresar no implementada');
              }
            }}
            variant='primary'
          />
          <Button
            label="Solo vengo a ver"
            onPress={() => alert('Función de ver no implementada')}
            variant='secondary'
          />
        </View>
      </View>

      <SimpleModal
        visible = {modalVisible}
        texto="Su categoria no corresponde a esta subasta. Aun asi puede verla"
        onClose={() => setModalVisible(false)}
      />

    </SafeAreaView>
  );
}