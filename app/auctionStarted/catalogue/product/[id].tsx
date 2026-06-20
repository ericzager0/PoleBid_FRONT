import { imageBase64Render } from '@/api/utils/imageBase64Render';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auctionService, AuctionType } from '@/api/services/auction';
import { itemsService, ItemType } from '@/api/services/items';
import CommissionRow from '@/components/auctions/CommissionRow';
import ProductDetailCard from '@/components/auctions/ProductDetailCard';
import Button from '@/components/common/Button';
import ImageCarousel from '@/components/common/ImageCarousel';
import { useAuth } from '@/context/AuthContext';

export default function AuctionItemScreen() {
  const { id, isArticles } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const isFromArticles = isArticles === 'true';

  const productsList = Array.isArray(user?.products) ? user.products : (user?.products ? [user.products] : []);
  const baseProduct = productsList.find((item) => String(item.identificador) === String(id));

  const [extraProduct, setExtraProduct] = useState<ItemType | null>(null);
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

  useEffect(() => {
    const fetchproduct = async () => {
      if (id) {
        try {
          const response = await itemsService.getItem(Number(id));
          setExtraProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchproduct();
  }, [id]);
    
  const product = (baseProduct && extraProduct) ? { ...baseProduct, ...extraProduct } : baseProduct;
  
  if (!product) {
    return (
    <SafeAreaView className="flex-1 bg-[#14191C] items-center justify-center">
      <Text className="text-white">Producto no encontrado</Text>
    </SafeAreaView>
    );
  }

  const imagesToDisplay = imageBase64Render(product);

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1C1C1E]">
        <TouchableOpacity 
          onPress={isFromArticles ? () => router.push('/articles/myArticles') : () => router.back() } 
          className="p-1 -ml-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text className="text-white text-lg font-bold tracking-wide">
          {product.descripcioncatalogo}
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        <ImageCarousel images={imagesToDisplay} />

        <View className="w-full h-1 bg-[#2A2B30] mt-4 mb-6 rounded-full flex-row">
          <View className="w-1/3 h-full bg-[#E8B83C] rounded-full" />
        </View>

        <ProductDetailCard 
          price={product.precio ? `${product.precio}$` : 'A definir'}
          date={product.fecha}
        />

        <View className="mt-6 mb-4 px-1">
          <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.15em] uppercase mb-2">
            Descripción Completa
          </Text>
          <Text className="text-[#D1D5DB] text-base italic leading-relaxed">
            {product.descripcioncompleta}
          </Text>
        </View>

        <View className="mt-4 mb-8">
          <CommissionRow percentage={product.comision ? product.comision.toString() : 'A definir'} /> 
        </View>

        <Button 
          label={!isFromArticles ? "Volver" : "Volver a mis artículos"}
          variant="primary" 
          onPress={isFromArticles ? () => router.push('/articles/myArticles') : () => router.back()} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}