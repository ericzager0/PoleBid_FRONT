import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import ViewBidButton from '@/components/articles/ViewBidButton';
import CommissionRow from '@/components/auctions/CommissionRow';
import ChatInput from '@/components/chat/ChatInput';
import ImageCarousel from '@/components/common/ImageCarousel';
import KeyboardWrapper from '@/components/common/KeyboardWrapper';
import NoAuction from '@/components/common/NoAuction';
import { f1AuctionsData } from "../../data/auctions";

export default function ScheduledBid() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const auction = f1AuctionsData.find((item) => item.id === id);
  if(!auction) {
    return <NoAuction />;
  }

  //Mock data
  const epigrafo = "Mercedes, C16 y C39 Buenos Aires, Argentina";
  const detallesPoliza = `La empresa contrata una poliza por el valor base del articulo para protegerse frente a cualquier dano o robo que pueda sufrir del articulo. Te aseguramos que recibiras por lo menos el valor del precio base menos la comision.`;
  const coordinates = { latitude: -34.652901, longitude: -59.445859 };

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

      <KeyboardWrapper>
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-2 mb-8">
            <Text className="text-white text-5xl font-bold mb-4 tracking-tight leading-[55px]">
              Subasta programada
            </Text>
            <Text className="text-[#9CA3AF] text-lg leading-6 pr-4">
              Tu articulo sera subastado en la siguiente subasta:
            </Text>
          </View>

          <View className="items-center mb-6">
            <Text className="text-white text-xl font-medium mb-1 text-center">
              {auction.fecha}
            </Text>
            <Text className="text-[#D1D5DB] text-lg text-center">
              {auction.title}
            </Text>
          </View>

          <View className="mb-6 h-64 w-full rounded-2xl overflow-hidden">
            <ImageCarousel images={auction.images || []} />
          </View>

          <View className="items-center justify-center gap-4 mb-10">
            <ViewBidButton
              label="Ver subasta" 
              className="self-center"
              onPress={() => router.push(`/auctionStarted/${auction.id}`)}
            />
          
            <View className="w-full mt-4 mb-8">
                <CommissionRow percentage={10}/>
            </View>

            <Text className="w-full text-left text-[#D1D5DB] text-base font-semibold mb-3">
              Ubicación del artículo:
            </Text>

            {/* Mapa */}
            <View className="w-full h-64 rounded-2xl overflow-hidden mb-3 border border-[#2A2B30]">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  }}
                  title="Ubicación"
                  description={epigrafo}
                />
              </MapView>
            </View>

            <Text className="w-full text-left text-[#9CA3AF] text-sm leading-5 mb-6">
              {epigrafo}
            </Text>
            
            <Text className="w-full text-left text-[#D1D5DB] text-base font-semibold mb-3">
              Detalles de la póliza de seguro:
            </Text>
            <Text className="w-full text-left text-[#D1D5DB] text-sm leading-6">
                {detallesPoliza}
            </Text>

            <Text className="w-full text-left text-[#D1D5DB] text-base font-semibold mb-3">
              Comunicate con la empresa de seguro:
            </Text>
            
            <ChatInput onSend={(message) => router.push({
                  pathname: '/articles/chat',
                  params: { text: message, id: auction.id }
                })} />
          </View>
        </ScrollView>
      </KeyboardWrapper>
    </SafeAreaView>
  );
}