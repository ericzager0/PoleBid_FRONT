import { getArticlesByState } from "@/api/utils/articleshelper";
import ArticleMapModal from "@/components/articles/ArticleMapModal";
import ItemMenuCard from "@/components/articles/ItemMenuCard";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();
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

        <View className="items-center justify-center pt-1 pb-10 gap-6">
          <ItemMenuCard
            title="Esperando Aprobación"
            iconName="clock"
            articles={getArticlesByState("pending_approval", user)}
            onPressItem={(item) =>
              router.push(
                `/auctionStarted/catalogue/product/${item.identificador}?isArticles=true`,
              )
            }
            offeringArticle={true}
            onPressOffer={() => router.push("/articles/briefDescription")}
          />

          <ItemMenuCard
            title="Interes en subastar"
            iconName="sticker-check-outline"
            articles={getArticlesByState("interested", user)}
            onPressItem={(item) =>
              router.push({
                pathname: "/articles/interestBid",
                params: { id: item.identificador },
              })
            }
          />

          <ItemMenuCard
            title="En inspección"
            iconName="eye-outline"
            articles={getArticlesByState("in_inspection", user)}
            onPressItem={() =>
              handleOpenModal({
                title: "El artículo está siendo inspeccionado",
                description:
                  "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires",
                extraInfo:
                  "El inspector se encuentra en el lugar verificando el estado del artículo. Te notificaremos una vez que finalice la inspección.",
                coordinates: { latitude: -34.6169, longitude: -58.3813 },
              })
            }
          />

          <ItemMenuCard
            title="Listo para subastar"
            iconName="calendar-clock"
            articles={getArticlesByState("ready_auction", user)}
            onPressItem={(item) =>
              router.push({
                pathname: "/articles/readyBid",
                params: { id: item.identificador },
              })
            }
          />

          <ItemMenuCard
            title="Subasta Programada"
            iconName="calendar-blank"
            articles={getArticlesByState("scheduled_auction", user)}
            onPressItem={(item) =>
              router.push({
                pathname: "/articles/scheduledBid",
                params: { id: item.identificador },
              })
            }
          />

          <ItemMenuCard
            title="Subasta Finalizada"
            iconName="calendar-check-outline"
            articles={getArticlesByState("bid_ended", user)}
            onPressItem={(item) =>
              router.push({
                pathname: "/articles/bidEnded",
                params: { id: item.identificador },
              })
            }
          />

          <ItemMenuCard
            title="Subasta no aceptada"
            iconName="calendar-remove"
            articles={getArticlesByState("rejected_auction", user)}
            onPressItem={() =>
              handleOpenModal({
                title: "Usted rechazo subastar su artículo",
                description:
                  "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires",
                extraInfo: `Enviaremos el articulo a tu direccion de residencia luego de que se acredite el pago del mismo. El costo del envio de devolucion tiene un valor de ${constoEnvio} ARS.`,
                coordinates: { latitude: -34.6169, longitude: -58.3813 },
              })
            }
          />

          <ItemMenuCard
            title="Rechazado tras inspección"
            iconName="magnify-close"
            articles={getArticlesByState("rejected_after_inspection", user)}
            onPressItem={(item) =>
              handleOpenModal({
                title: "Motivos de rechazo de producto:",
                rejectReason: item.motivo_rechazo || "No se especificó un motivo de rechazo.",
                description:
                  "Lima 757/775, Monserrat, Ciudad Autónoma de Buenos Aires",
                extraInfo: `Enviaremos el articulo a tu direccion de residencia luego de que se acredite el pago del mismo. El costo del envio de devolucion tiene un valor de ${constoEnvio} ARS.`,
                coordinates: { latitude: -34.6169, longitude: -58.3813 },
              })
            }
          />

          <ItemMenuCard
            title="No hay interés en subastar"
            iconName="close-circle-outline"
            articles={getArticlesByState("no_interest", user)}
            onPressItem={(item) =>
              router.push(
                `/auctionStarted/catalogue/product/${item.identificador}?isArticles=true`,
              )
            }
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