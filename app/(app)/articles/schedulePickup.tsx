import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/Button';
import TermsCheckbox from '@/components/common/TermsCheckbox';

export default function SchedulePickup() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  //MOCK
  const epigrafo = "Mercedes, C16 y C39 Buenos Aires, Argentina";
  const coordinates = { latitude: -34.652901, longitude: -59.445859 };


  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.push({
                  pathname: '/articles/interestBid',
                  params: { id }
                })}
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
        <View className="mt-2 mb-8">
          <Text className="text-white text-5xl font-bold mb-4 tracking-tight leading-[55px]">
            Dirección
          </Text>
          <Text className="text-[#9CA3AF] text-lg leading-6 pr-4">
            Deberás enviar el artículo a la siguiente dirección:
          </Text>

          <View className="w-full h-64 rounded-2xl overflow-hidden mb-3 border border-[#2A2B30] mt-4">
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
        </View>

        <View className="items-center justify-center gap-4 mb-10">
          <TermsCheckbox
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
            text="Estoy de acuerdo que en caso de no aceptar el bien enviado la empresa lo devolverá con cargo al usuario."
          />
          <Button
            label="Hecho"
            disabled={!acceptedTerms}
            variant={acceptedTerms ? "primary" : "blocked"}
            onPress={() => router.push('/articles/myArticles')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}