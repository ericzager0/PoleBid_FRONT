import { auctionService, AuctionType } from "@/api/services/auction";
import perfilFoto from "@/assets/images/perfil.png";
import NoAuction from "@/components/common/NoAuction";
import SimpleModal from "@/components/common/SimpleModal";
import BidLog from "@/components/profile/BidLog";
import CategoryText from "@/components/profile/CategoryText";
import CustomProgressBar from "@/components/profile/CustomProgressBar";
import StatCard from "@/components/profile/StatCard";
import { useAuth } from "@/context/AuthContext";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { f1AuctionsData } from "../data/auctions";

export default function Home() {
  const router = useRouter();
  const [modalAssistVisible, setAssistModalVisible] = useState(false);
  const [modalWonVisible, setWonModalVisible] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState<string | null>(null);
  const { user } = useAuth();

  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auctionService.getAuctions();
        setAuctions(response.data);
        console.log("Fetched auctions: ", response.data);
      } catch (error) {
        console.error("Error fetching auctions: ", error);
      }
    };

    fetchAuctions();
  }, []);


  const isBanned = false;
  const adeudado = 15000;

  const noAuction = auctions.length === 0 || !auctions;

  const activatedIsSeller = user?.isSeller;
  let countArticles = Array.isArray(user?.products) ? user!.products.length : 0;
  if (!activatedIsSeller) {
    countArticles = 0;
  }

  const handleEditPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setNewProfilePhoto(uri);
      uploadPhotoToBackend(uri);
    }
  };

  const uploadPhotoToBackend = async (imageUri: string) => {
    try {
      console.log("Subiendo foto al servidor...", imageUri);
      // ACÁ IRÁ TU CÓDIGO DEL FETCH AL ENDPOINT
      // const formData = new FormData();
      // formData.append("profileImage", { uri: imageUri, name: 'profile.jpg', type: 'image/jpeg' });
      // await api.put("/user/avatar", formData);
    } catch (error) {
      console.error("Error al subir la foto", error);
      alert("Hubo un problema al subir la foto");
    }
  };

  const displayPhoto = newProfilePhoto ? { uri: newProfilePhoto } : perfilFoto;

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-[#14191C] px-6 justify-center items-center">
        <View className="w-full bg-[#1E1E1E] rounded-3xl p-8 items-center border border-white/10">
          <Ionicons
            name="person-circle-outline"
            size={64}
            color="#FFD874"
            className="mb-4"
          />
          <Text className="text-white text-center text-lg font-medium mb-8">
            Nada por acá. Entraste como invitado.
          </Text>

          <TouchableOpacity
            className="bg-[#FFD874] w-full py-4 rounded-full items-center"
            activeOpacity={0.8}
            onPress={() => {
              router.dismissAll();
              router.push("/");
            }}
          >
            <Text className="text-black font-bold text-lg uppercase tracking-wider">
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#14191C]">
      <View className="items-center pt-4 pb-4 bg-[#14191C]">
        <Pressable
          className="absolute top-4 right-4 p-2 z-10"
          onPress={() => router.push("/(settings)/settings")}
        >
          {({ pressed }) => (
            <Ionicons
              name="settings"
              color={pressed ? "white" : "gray"}
              size={28}
            />
          )}
        </Pressable>

        <View className="relative w-32 h-32 mt-6">
          <View
            className={`w-32 h-32 rounded-full border-4 shadow-lg overflow-hidden bg-gray-200 ${
              isBanned ? "border-[#E83C3C]" : "border-[#FFD874]"
            }`}
          >
            {displayPhoto ? (
              <Image
                source={displayPhoto}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="person" color="#9ca3af" size={64} />
              </View>
            )}
          </View>

          {!isBanned ? (
            <TouchableOpacity
              onPress={handleEditPhoto}
              className="absolute bottom-0 right-0 bg-[#FFD874] p-3 rounded-full border-2 border-white"
              activeOpacity={0.8}
            >
              <Ionicons name="pencil" color="black" size={18} />
            </TouchableOpacity>
          ) : (
            <View className="absolute -bottom-3 left-0 right-0 items-center">
              <View className="bg-[#14191C] rounded-full p-1">
                <Ionicons name="warning" color="#E83C3C" size={28} />
              </View>
            </View>
          )}
        </View>

        <Text className="text-2xl font-bold text-white mt-5">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className="text-base text-gray-400 mt-1">{user?.email}</Text>

        {!isBanned && (
          <View className="flex">
            <CategoryText categoryId={user.categoria} />
          </View>
        )}
      </View>

      <View className="h-[1px] w-[98%] bg-white/10 self-center mb-4" />

      {isBanned ? (
        // VISTA DE CUENTA BANEADA
        <View className="flex-1 px-6 pt-10 items-center">
          <View className="w-full bg-[#1E1E1E] rounded-3xl p-8 items-center border border-[#E83C3C]/30">
            <Ionicons
              name="lock-closed"
              size={48}
              color="#E83C3C"
              className="mb-4"
            />
            <Text className="text-white text-center text-lg font-medium mb-8">
              Para seguir utilizando la aplicación deberá abonar un total de ARS
              ${adeudado}
            </Text>

            <TouchableOpacity
              className="bg-[#E83C3C] w-full py-4 rounded-full items-center"
              activeOpacity={0.8}
            >
              <Text className="text-black font-bold text-lg uppercase tracking-wider">
                Pagar Ahora
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center gap-y-4 mt-2">
            <CustomProgressBar
              nombre="Subastas asistidas"
              porcentaje={75}
              onPress={() => setAssistModalVisible(true)}
            />
            <CustomProgressBar
              nombre="Subastas ganadas"
              porcentaje={30}
              onPress={() => setWonModalVisible(true)}
            />
          </View>

          <View className="w-full px-6 mt-4 gap-y-6">
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <StatCard
                  icono={
                    <AntDesign
                      name="unordered-list"
                      size={24}
                      color="#FFD874"
                    />
                  }
                  texto="Pujas Realizadas"
                  numero={500}
                />
              </View>
              <View className="flex-1">
                <StatCard
                  icono={
                    <FontAwesome6
                      name="money-check-dollar"
                      size={24}
                      color="#FFD874"
                    />
                  }
                  texto="Total invertido"
                  numero={500}
                  price={true}
                />
              </View>
            </View>
            <View>
              <StatCard
                icono={<Feather name="box" size={24} color="#FFD874" />}
                texto="Mis Artículos"
                numero={countArticles}
                blocked={!activatedIsSeller}
                onPress={() => router.push("/articles/myArticles")}
              />
            </View>
          </View>

          <View className="w-[95%] self-center mt-8 bg-[#1C1C1E] rounded-3xl p-5 gap-y-4">
            <View className="flex-row items-center gap-x-2 mb-2">
              <Octicons name="history" size={17} color="white" />
              <Text className="text-lg font-semibold text-white px-1">
                Historial
              </Text>
            </View>

            {!noAuction ? (
              f1AuctionsData.map((auction, index) => {
                const isWinner = index % 2 === 0;
                const myLastBid = "$ 1,250,000";

                return (
                  <BidLog
                    key={auction.id}
                    date={auction.fecha}
                    name={auction.title}
                    won={isWinner}
                    bid={myLastBid}
                    onPress={() =>
                      router.push({
                        pathname: "/bidHistory",
                        params: {
                          id: auction.id,
                          won: isWinner ? "true" : "false",
                        },
                      })
                    }
                  />
                );
              })
            ) : (
              <NoAuction isProfile={true} title="No has participado en ninguna subasta aún" text="Participa en una subasta para ver tu historial" />
            )}
          </View>

          <SimpleModal
            visible={modalAssistVisible}
            onClose={() => setAssistModalVisible(false)}
            texto="Te faltan 25 subastas asistidas para alcanzar el próximo nivel y obtener beneficios exclusivos!"
          />

          <SimpleModal
            visible={modalWonVisible}
            onClose={() => setWonModalVisible(false)}
            texto="Te faltan 30 subastas ganadas para alcanzar el próximo nivel y obtener beneficios exclusivos!"
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
