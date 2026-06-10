import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/Button';
import ImageCarousel from '@/components/common/ImageCarousel';

import ConfirmModal from '@/components/common/ConfirmModal';
import NoAuction from '@/components/common/NoAuction';
import { f1AuctionsData } from "../../data/auctions";

export default function InterestBid() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modal, setModal] = React.useState(false);

  const auction = f1AuctionsData.find((item) => item.id === id);
  if(!auction) {
    return <NoAuction />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => setModal(true)}
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
        <View className="items-center mb-6">
          <Text className="text-[#D1D5DB] text-lg text-center">
            {auction.title}
          </Text>
        </View>

        <View className="mb-6 h-64 w-full rounded-2xl overflow-hidden">
          <ImageCarousel images={auction.images || []} />
        </View>

        <View className="mt-2 mb-8">
          <Text className="text-white text-5xl font-bold mb-4 tracking-tight leading-[55px]">
            Programar envío
          </Text>
          <Text className="text-[#9CA3AF] text-lg leading-6 pr-4">
            La empresa está interesada en subastar tu artículo. Deberás programar un envío para que podamos inspeccionarlo y tasarlo.
          </Text>
        </View>

        <View className="items-center justify-center gap-4 mb-10">
         <Button
            label="Programar envío" 
            onPress={() => router.push({
              pathname: '/articles/schedulePickup',
              params: { id: auction.id }
            })} 
          />
        </View>
      </ScrollView>
      
    {/* Modal */}
    <ConfirmModal
        visible={modal}
        onClose={() => setModal(false)}
        title="Salir sin guardar"
        description="Si sale se perderán los datos ingresados. Seguro que quiere salir?"
        confirmText="Salir"
        cancelText="Cancelar"
        onConfirm={() => {
        setModal(false);
            router.push("/(app)/articles/myArticles");
        }}
        onCancel={() => setModal(false)}
    />
    </SafeAreaView>
  );
}