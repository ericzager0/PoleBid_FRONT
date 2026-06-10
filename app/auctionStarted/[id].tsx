import AuctionDetailCard from '@/components/auctions/AuctionDetailCard';
import Button from '@/components/common/Button';
import NoAuction from '@/components/common/NoAuction';
import SimpleModal from '@/components/common/SimpleModal';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { f1AuctionsData } from "../data/auctions";

const categoryIdUser = 1;

export default function AuctionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  const [isLogged, setLogged] = useState(user ? true : false);

  const auction = f1AuctionsData.find((item) => item.id === id);
  if (!auction) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction />
      </SafeAreaView>
    );
  }

  const handleActionButtonLogic = () => {
    if (auction.live) {
      router.push(`/auctionStarted/live/${auction.id}?readonly=true`);
    } else{
      router.push(`/auctionStarted/catalogue/${auction.id}`);
    }
  };

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

      <ScrollView>
        <View className="flex-1 items-center gap-y-4 py-5">
          <Text className="font-bold text-[32px] text-white text-center px-4">
            {auction.title}
          </Text>
          <AuctionDetailCard
          fecha={auction.fecha}
          estado={auction.state}
          descripcion={auction.description}
          images={auction.images}
        />

        <View className="w-full gap-y-3 px-4 mt-2">
          {(isLogged && auction.live) && 
          <Button
            label="Ingresar a la subasta"
            onPress={() => {
              if (auction.categoryId !== categoryIdUser) {
                setModalVisible(true);
              } else {
                router.push(`/auctionStarted/live/${auction.id}`);
              }
            }}
            variant='primary'
          />}
          <Button
            label={(isLogged && auction.live) ? "Solo vengo a ver" : "Ver catálogo"}
            onPress={handleActionButtonLogic}
            variant='secondary'
          />
        </View>
      </View>
      </ScrollView>

      <SimpleModal
        visible={modalVisible}
        texto="Su categoria no corresponde a esta subasta. Aun asi puede verla"
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}