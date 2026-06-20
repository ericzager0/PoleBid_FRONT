import { auctionService, AuctionType } from "@/api/services/auction";
import { imageBase64Render } from "@/api/utils/imageBase64Render";
import Auction from "@/components/auctions/Auction";
import FilterButton from "@/components/home/FilterButton";
import SearchBar from "@/components/home/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
// 1. Agregamos ActivityIndicator a los imports
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // 2. NUEVO: Estado para controlar la carga inicial
  const [isLoading, setIsLoading] = useState(true); 
  
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const router = useRouter();
  
  const opcionesFiltro = ["Todas", "En vivo", "Agendadas", "Comun", "Plata", "Oro", "Platino", "Especial"];

  const fetchAuctions = async () => {
    try {
      const response = await auctionService.getAuctions();
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions: ", error);
    } finally {
      // 3. Apagamos el loading cuando termina la petición (sea éxito o error)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const filteredAuctions = auctions.filter((auction) => {
    let matchesFilter = true;

    if (filtroActivo === "En vivo") {
      matchesFilter = auction.estado === "abierta";
    } else if (filtroActivo === "Agendadas") {
      matchesFilter = auction.estado === "cerrada";
    } else if (filtroActivo !== "Todas") {
      matchesFilter = auction.categoria.toLowerCase() === filtroActivo.toLowerCase();
    }

    const matchesSearch = auction.descripcion
      ? auction.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    return matchesFilter && matchesSearch;
  });

  const renderItem = ({ item }: { item: AuctionType }) => (
    <Auction
      categoryId={item.categoria}
      imageSrc={imageBase64Render(item.foto)[0]}
      title={item.descripcion}
      fecha={item.fecha}
      hora={item.hora}
      isActive={item.estado}
      onPress={() => router.push(`/auctionStarted/${item.identificador}`)}
    />
  );

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchAuctions();
    setIsRefreshing(false);
  };

  // 4. Modificamos el componente vacío para que sea inteligente
  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 justify-center items-center pt-24 px-6">
          <ActivityIndicator size="large" color="#E8B83C" />
          <Text className="text-white text-lg font-bold tracking-wide mt-5 text-center">
            Buscando subastas...
          </Text>
          <Text className="text-[#9CA3AF] text-sm text-center mt-2">
            Preparando el catálogo para vos
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 justify-center items-center pt-24 px-6">
        <View className="w-20 h-20 rounded-full bg-[#1C1C1E] border border-[#2A2B30] items-center justify-center mb-6 shadow-xl">
          <Ionicons name="search-outline" size={36} color="#E8B83C" />
        </View>
        <Text className="text-white text-xl font-bold tracking-wide mb-3 text-center">
          Sin resultados
        </Text>
        <Text className="text-[#9CA3AF] text-base text-center leading-relaxed">
          {searchQuery.trim() !== "" 
            ? `No encontramos subastas que coincidan con "${searchQuery}".` 
            : "No hay subastas disponibles con este filtro por el momento."}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14191C] items-center">
      <View className="w-[90%] flex-1 pt-4">
        <View className="gap-y-4">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar subastas, items, categorías"
          />
          
          <View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="w-full mb-3"
            >
              <View className="flex-row gap-x-3 pr-4">
                {opcionesFiltro.map((opcion) => (
                  <FilterButton
                    key={opcion}
                    label={opcion}
                    isActive={filtroActivo === opcion}
                    onPress={() => setFiltroActivo(opcion)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <View className="flex-1 w-full mt-6">
          <FlatList
            data={filteredAuctions}
            keyExtractor={(item) => String(item.identificador)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor="#E8B83C"
                colors={["#E8B83C"]}
                progressBackgroundColor="#1C1C1E"
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}