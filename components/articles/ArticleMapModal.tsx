import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
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
      <View className="flex-1 bg-black/80 justify-center px-4">
        <View className="bg-[#1C1C1E] w-full rounded-3xl p-6 border border-[#2A2B30] shadow-xl gap-4">
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={28} color="#D1D5DB" />
            </TouchableOpacity>
          </View>

          <Text className="text-white text-xl font-bold tracking-wide text-center mb-6">
            {title}
          </Text>

          <Text className="text-[#D1D5DB] text-base font-semibold mb-3">
            {rejectReason}
          </Text>

          <Text className="text-[#D1D5DB] text-base font-semibold mb-3">
            Ubicación del artículo:
          </Text>

          {/* Mapa */}
          <View className="w-full h-72 rounded-2xl overflow-hidden mb-4 border border-[#2A2B30]">
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.005, //ZOOM DEL MAPA
                longitudeDelta: 0.005,
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

          <Text className="text-[#9CA3AF] text-sm leading-5">
            {description}
          </Text>

          <Text className="text-[#D1D5DB] text-base font-semibold mb-3">
            {extraInfo}
          </Text>
          
        </View>
      </View>
    </Modal>
  );
}