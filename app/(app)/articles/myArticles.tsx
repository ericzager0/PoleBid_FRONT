import ArticleMapModal from "@/components/articles/ArticleMapModal";
import ItemMenuCard from "@/components/articles/ItemMenuCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MapModalConfig {
  title: string;
  description: string;
  extraInfo: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rejectReason?: string;
}

export default function MyArticles() {
  const router = useRouter();
  const [mapModalVisible, setMapModalVisible] = useState(false);

  const constoEnvio = 7900;

  const [modalData, setModalData] = useState<MapModalConfig | null>(null);
  const handleOpenModal = (data: MapModalConfig) => {
    setModalData(data);
    setMapModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
    <View className="px-4 pt-4 pb-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#1C1C1E] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="items-center justify-center pt-1 pb-10">
          <Text className="text-white text-center text-4xl font-bold px-6 leading-relaxed ">
            Mis artículos
          </Text>
        </View>

        <View className="items-center justify-center pt-1 pb-10">
            <ItemMenuCard 
              title="Esperando Aprobación" 
              iconName="clock" articles={[{ id: "1", name: "Artículo 1", date: "2023-01-01" }]} 
              onPressItem={() => router.push(`/auctionStarted/catalogue/product/${1}?isArticles=true`)} 
              offeringArticle={true} 
              onPressOffer={() => router.push('/articles/briefDescription')}
            />
            
            <ItemMenuCard 
                title="Interes en subastar" 
                iconName="sticker-check-outline" 
                articles={[{ id: "1", name: "Artículo 2", date: "2023-01-01" }]} 
                onPressItem={(item) => router.push({
                  pathname: '/articles/interestBid',
                  params: { id: item.id }
                })} 
            />

            <ItemMenuCard 
                title="En inspección" 
                iconName="eye-outline" 
                articles={[{ id: "1", name: "Artículo 3", date: "2023-01-01" }]}
                 onPressItem={() => handleOpenModal({ 
                    title: "El artículo está siendo inspeccionado", 
                    description: "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires", 
                    extraInfo: "El inspector se encuentra en el lugar verificando el estado del artículo. Te notificaremos una vez que finalice la inspección.", 
                    coordinates: { latitude: -34.6169, longitude: -58.3813 } })} 
            />
            
            <ItemMenuCard 
              title="Listo para subastar" 
              iconName="calendar-clock" 
              articles={[{ id: "1", name: "Artículo 4", date: "2023-01-01" }]} 
              onPressItem={(item) => router.push({
                  pathname: '/articles/readyBid',
                  params: { id: item.id }
                })}  
            />

            <ItemMenuCard 
              title="Subasta Programada" 
              iconName="calendar-blank" 
              articles={[{ id: "1", name: "Artículo 5", date: "2023-01-01" }]} 
              onPressItem={(item) => router.push({
                  pathname: '/articles/scheduledBid',
                  params: { id: item.id }
                })} 
            />

            <ItemMenuCard title="Subasta Finalizada" iconName="calendar-check-outline" articles={[{ id: "1", name: "Artículo 5", date: "2023-01-01" }]} 
                onPressItem={(item) => router.push({
                  pathname: '/articles/bidEnded',
                  params: { id: item.id }
                })} 
            />
            
            <ItemMenuCard 
                title="Subasta no aceptada" 
                iconName="calendar-remove" 
                articles={[{ id: "1", name: "Artículo 6", date: "2023-01-01" }]} 
                 onPressItem={() => handleOpenModal({ 
                    title: "Usted rechazo subastar su artículo", 
                    description: "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires", 
                    extraInfo: `Enviaremos el articulo a tu direccion de residencia luego de que se acredite el pago del mismo. El costo del envio de devolucion tiene un valor de ${constoEnvio} ARS.`, 
                    coordinates: { latitude: -34.6169, longitude: -58.3813 } })} 
            />
            
            <ItemMenuCard 
                title="Rechazado tras inspección" 
                iconName="magnify-close" 
                articles={[{ id: "1", name: "Artículo 7", date: "2023-01-01" }]} 
                 onPressItem={() => handleOpenModal({ 
                    title: "Motivos de rechazo de producto:", 
                    rejectReason: "El articulo muestra muchos signos de desgaste claro.",
                    description: "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires", 
                    extraInfo: `Enviaremos el articulo a tu direccion de residencia luego de que se acredite el pago del mismo. El costo del envio de devolucion tiene un valor de ${constoEnvio} ARS.`, 
                    coordinates: { latitude: -34.6169, longitude: -58.3813 } })} 
            />
            
            <ItemMenuCard 
                title="No hay interés en subastar" 
                iconName="close-circle-outline" 
                articles={[{ id: "1", name: "Artículo 8", date: "2023-01-01" }]} 
                onPressItem={() => router.push(`/auctionStarted/catalogue/product/${1}?isArticles=true`)} 
            />

        </View>
      </ScrollView>

      {/* MODALS */}
      <ArticleMapModal
        visible={mapModalVisible}
        onClose={() => setMapModalVisible(false)}
        title={modalData?.title || ""}
        rejectReason={modalData?.rejectReason || ""}
        description={modalData?.description || ""}
        coordinates={modalData?.coordinates || { latitude: 0, longitude: 0 }}
        extraInfo={modalData?.extraInfo || ""}
      />
    </SafeAreaView>
  );
}