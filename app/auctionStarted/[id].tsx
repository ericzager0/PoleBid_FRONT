import { auctionService, AuctionType } from "@/api/services/auction";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import AuctionDetailCard from "@/components/auctions/AuctionDetailCard";
import AlertModal from "@/components/common/AlertModal";
import Button from "@/components/common/Button";
import NoAuction from "@/components/common/NoAuction";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuctionDetailScreen() {
  const { id } = useLocalSearchParams();
  console.log(id);
  const router = useRouter();
  const { user } = useAuth();

  const [alertType, setAlertType] = useState<"none" | "category" | "full">(
    "none",
  );
  const [auctions, setAuctions] = useState<AuctionType[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auctionService.getAuctions();
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions: ", error);
      }
    };
    fetchAuctions();
  }, []);

  const [isLogged] = useState(user ? true : false);

  {
    /* A futuro cuando lleguen los miembros y tengasmos hecho subastas 
  if ((user?.subastas[id]).cantidadmiembres === (user?.subastas[id]).miembros) {
    setAlertType('full');
  }
  */
  }

  const auction = auctions.find((item) => item.identificador === Number(id));
  if (!auction || auctions.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
        <NoAuction />
      </SafeAreaView>
    );
  }

  const handleActionButtonLogic = () => {
    if (auction.estado === "abierta") {
      router.push(
        `/auctionStarted/live/${auction.identificador}?readonly=true`,
      );
    } else {
      router.push(`/auctionStarted/catalogue/${auction.identificador}`);
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
            {auction.descripcion}
          </Text>
          <AuctionDetailCard
            fecha={auction.fecha}
            estado={auction.estado}
            descripcion={auction.descripcion}
            images={imageBase64Render(auction)}
          />

          <View className="w-full gap-y-3 px-4 mt-2">
            {isLogged && auction.estado === "abierta" && (
              <Button
                label="Ingresar a la subasta"
                onPress={() => {
                  if (auction.categoria !== user?.categoria) {
                    setAlertType("category");
                  } else {
                    router.push(
                      `/auctionStarted/live/${auction.identificador}`,
                    );
                  }
                }}
                variant="primary"
              />
            )}
            <Button
              label={
                isLogged && auction.estado === "abierta"
                  ? "Solo vengo a ver"
                  : "Ver catálogo"
              }
              onPress={handleActionButtonLogic}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>

      {/* MODALES */}
      <AlertModal
        visible={alertType === "full"}
        title="Subasta sin cupo"
        description="Lo sentimos, esta subasta ya ha alcanzado el límite máximo de participantes. Te invitamos a explorar otras opciones en el catálogo."
        iconName="account-group-outline"
        iconColor="#F97316"
        buttonText="Volver al catálogo"
        onClose={() => setAlertType("none")}
      />

      <AlertModal
        visible={alertType === "category"}
        title="Acceso restringido"
        description="Tu categoría actual de usuario no cumple con los requisitos mínimos para participar en esta subasta premium. Continúa operando para subir de nivel."
        iconName="lock-outline"
        iconColor="#EF4444"
        buttonText="Entendido"
        onClose={() => setAlertType("none")}
      />
    </SafeAreaView>
  );
}
