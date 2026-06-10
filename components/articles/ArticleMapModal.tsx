import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

interface ArticleMapModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  coordinates: LocationCoordinates;
  extraInfo?: string;
  rejectReason?: string;
}

export default function ArticleMapModal({
  visible,
  onClose,
  title,
  description,
  coordinates,
  extraInfo = "",
  rejectReason = "",    
}: ArticleMapModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center px-4 py-12">
        <View className="bg-[#1C1C1E] w-full max-h-full rounded-3xl p-6 border border-[#2A2B30] shadow-xl">
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={28} color="#D1D5DB" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <Text className="text-white text-2xl font-bold tracking-wide text-center mb-6">
              {title}
            </Text>

            {rejectReason ? (
              <View className="bg-[#E83C3C]/10 border border-[#E83C3C]/30 rounded-xl p-4 mb-6">
                <Text className="text-[#E83C3C] text-base leading-6 font-medium">
                  {rejectReason}
                </Text>
              </View>
            ) : null}

            <Text className="text-[#D1D5DB] text-base font-semibold mb-3">
              Ubicación del artículo:
            </Text>

            {/* Mapa */}
            <View className="w-full h-64 rounded-2xl overflow-hidden mb-3 border border-[#2A2B30]">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.005, //ZOOM
                  longitudeDelta: 0.005, //ZOOM
                }}
              >
                <Marker
                  coordinate={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  }}
                  title="Ubicación"
                  description={description}
                />
              </MapView>
            </View>

            <Text className="text-[#9CA3AF] text-sm leading-5 mb-6">
              {description}
            </Text>

            {extraInfo ? (
              <Text className="text-[#D1D5DB] text-sm leading-6">
                {extraInfo}
              </Text>
            ) : null}

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}