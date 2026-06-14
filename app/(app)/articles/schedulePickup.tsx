import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/Button';
import TermsCheckbox from '@/components/common/TermsCheckbox';

const DEFAULT_COORD = {
  latitude: -34.603722,
  longitude: -58.381592,
};

export default function SchedulePickup() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const {user} = useAuth();
  
   const productsList = Array.isArray(user?.products) ? user.products : (user?.products ? [user.products] : []);
    const product = productsList.find((item) => String(item.identificador) === String(id));
    
    if (!product) {
      return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <Text className="text-white">Producto no encontrado</Text>
      </SafeAreaView>
      );
    }
  

  const [selectedCoord, setSelectedCoord] = useState(DEFAULT_COORD);
  const [addressDesc, setAddressDesc] = useState("Ubicación por defecto (Obelisco)");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleMapPress = (e: any) => {
    const newCoord = e.nativeEvent.coordinate;
    setSelectedCoord(newCoord);
    setAddressDesc("Ubicación marcada en el mapa");
    
    mapRef.current?.animateToRegion({
      ...newCoord,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 500);
  };

  const handleMarkerDragEnd = (e: any) => {
    const newCoord = e.nativeEvent.coordinate;
    setSelectedCoord(newCoord);
    setAddressDesc("Ubicación ajustada manualmente");
  };

  const handleConfirm = () => {
    console.log("Coordenadas hardcodeadas listas para el contexto:", selectedCoord);
    router.push('/articles/myArticles'); 
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="px-4 pt-4 pb-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.push({
                  pathname: '/articles/interestBid',
                  params: { id: product.identificador }
                })}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center mr-4 border border-[#2A2B30]"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-white text-xl font-bold tracking-wide">Punto de retiro</Text>
          <Text className="text-[#9CA3AF] text-xs mt-1">Toca el mapa o arrastra el marcador</Text>
        </View>
      </View>

      {/* MAPA INTERACTIVO */}
      <View className="flex-1 overflow-hidden border-t border-[#2A2B30]">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            ...DEFAULT_COORD,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}
          userInterfaceStyle="dark"
        >
          <Marker
            coordinate={selectedCoord}
            title="Punto de Retiro"
            description="Mantén presionado para arrastrar"
            draggable 
            onDragEnd={handleMarkerDragEnd}
          />
        </MapView>
      </View>

      <View className="bg-[#14191C] px-6 pt-6 pb-8 border-t border-[#2A2B30]">
        
        <View className="mb-5">
          <Text className="text-[#E8B83C] text-xs font-bold uppercase tracking-[0.15em] mb-1">
            Lugar seleccionado
          </Text>
          <Text className="text-white text-base font-medium leading-relaxed" numberOfLines={2}>
            {addressDesc}
          </Text>
        </View>

        <View className="mb-6">
          <TermsCheckbox
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
            text="Estoy de acuerdo que en caso de no aceptar el bien enviado la empresa lo devolverá con cargo al usuario."
          />
        </View>
        
        <Button 
          label="Confirmar Ubicación" 
          disabled={!acceptedTerms}
          variant={acceptedTerms ? "primary" : "blocked"}
          onPress={handleConfirm} 
        />
      </View>
    </SafeAreaView>
  );
}