import { itemsService } from "@/api/services/items";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/common/Button";
import TermsCheckbox from "@/components/common/TermsCheckbox";
import { useAuth } from "@/context/AuthContext";

const DEFAULT_COORD = {
  latitude: -34.603722,
  longitude: -58.381592,
};

const PREDEFINED_LOCATIONS = [
  {
    id: 1,
    title: "Sucursal Centro",
    address: "Av. Independencia 1141",
    coord: { latitude: -34.61757, longitude: -58.382251 },
  },
  {
    id: 2,
    title: "Sucursal Mercedes",
    address: "C.11 y C.16",
    coord: { latitude: -34.654785, longitude: -59.423942 },
  },
  {
    id: 3,
    title: "Sucursal Puerto Madero",
    address: "Puente de la Mujer",
    coord: { latitude: -34.6083, longitude: -58.3639 },
  },
  {
    id: 4,
    title: "Sucursal Recoleta",
    address: "Cementerio de la Recoleta",
    coord: { latitude: -34.5883, longitude: -58.3934 },
  },
  {
    id: 5,
    title: "Sucursal San Telmo",
    address: "Plaza Dorrego",
    coord: { latitude: -34.6212, longitude: -58.3731 },
  },
];

export default function SchedulePickup() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { id } = useLocalSearchParams();
  const itemId = Number(id);
  const { getMe } = useAuth();

  const [selectedCoord, setSelectedCoord] = useState(DEFAULT_COORD);
  const [addressDesc, setAddressDesc] = useState(
    "Ubicación por defecto (Centro)",
  );
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleMapPress = (e: any) => {
    const newCoord = e.nativeEvent.coordinate;
    setSelectedCoord(newCoord);
    setAddressDesc("Ubicación marcada libremente en el mapa");

    mapRef.current?.animateToRegion(
      {
        ...newCoord,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      500,
    );
  };

  const handleMarkerDragEnd = (e: any) => {
    const newCoord = e.nativeEvent.coordinate;
    setSelectedCoord(newCoord);
    setAddressDesc("Ubicación ajustada manualmente");
  };

  const handlePredefinedPress = (loc: any) => {
    setSelectedCoord(loc.coord);
    setAddressDesc(`📍 ${loc.title} - ${loc.address}`);

    mapRef.current?.animateToRegion(
      {
        ...loc.coord,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
  };

  const handleConfirm = async () => {
    await itemsService.updateItem(itemId, { estado: "in_inspection" });
    await getMe(); // Refrescar datos del usuario para actualizar estados
    router.push("/articles/myArticles");
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="px-4 pt-4 pb-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center mr-4 border border-[#2A2B30]"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-white text-xl font-bold tracking-wide">
            Punto de retiro
          </Text>
          <Text className="text-[#9CA3AF] text-xs mt-1">
            Elíge un punto de retiro predeterminado
          </Text>
        </View>
      </View>

      {/* MAPA INTERACTIVO */}
      <View className="flex-1 overflow-hidden border-t border-[#2A2B30]">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            ...DEFAULT_COORD,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
          onPress={handleMapPress}
          userInterfaceStyle="dark"
        >
          {PREDEFINED_LOCATIONS.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={loc.coord}
              onPress={() => handlePredefinedPress(loc)}
              zIndex={1}
            >
              <View className="bg-[#1C1C1E] p-2 rounded-full border-2 border-[#E8B83C] shadow-xl items-center justify-center">
                <Ionicons name="star" size={16} color="#E8B83C" />
              </View>
            </Marker>
          ))}

          <Marker
            coordinate={selectedCoord}
            title="Tu Selección"
            description="Mantén presionado para arrastrar"
            draggable
            onDragEnd={handleMarkerDragEnd}
            zIndex={10}
          />
        </MapView>
      </View>

      <View className="bg-[#14191C] px-6 pt-6 pb-8 border-t border-[#2A2B30]">
        <View className="mb-5">
          <Text className="text-[#E8B83C] text-xs font-bold uppercase tracking-[0.15em] mb-1">
            Lugar seleccionado
          </Text>
          <Text
            className="text-white text-base font-medium leading-relaxed"
            numberOfLines={2}
          >
            {addressDesc}
          </Text>
        </View>

        <View className="mb-6">
          <TermsCheckbox
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
            text="Estoy de acuerdo que en caso de no aceptar el bien, la empresa lo devolverá con cargo al usuario."
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
