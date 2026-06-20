import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import ChatBubble from "@/components/chat/ChatBubble";
import ChatDate from "@/components/chat/ChatDate";
import ChatInput from "@/components/chat/ChatInput";
import SalesmanDetails from "@/components/chat/SalesmanDetails";
import TypingAnimation from "@/components/chat/TypingAnimation";

import { auctionService, AuctionType } from "@/api/services/auction";
import { itemsService, ItemType } from "@/api/services/items";
import CatalogueProductCard from "@/components/auctions/CatalogueProductCard";
import NoAuction from "@/components/common/NoAuction";
import { useEffect, useState } from "react";
import fotoPerfil from "../../../assets/images/la_nueva_seguros.png";

export default function ChatScreen() {
  const { text, id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets(); 

  const [product, setproduct] = useState<ItemType | null>(null);
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
          setproduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchproduct();
  }, [id]);
    
  const productId = Number(id);

  const messageText = Array.isArray(text) ? text[0] : text;

  const auction = auctions.find((item) => Number(item.identificador) === productId);
    if(!auction) {
      return <NoAuction />;
    }
  
  return (
    <View style={{ flex: 1, backgroundColor: '#14191C' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#14191C' }}>
          <View className="px-4 py-3 border-b border-[#1D2127] flex-row items-center">
            <TouchableOpacity 
              className="mr-3" 
              onPress={() => router.push({
                  pathname: '/articles/scheduledBid',
                  params: { id: id }
              })}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <SalesmanDetails
              name="La nueva seguros"
              image={fotoPerfil}
            />
          </View>
        </SafeAreaView>

        <ScrollView
          style={{ flex: 1 }}
          className="px-4"
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CatalogueProductCard
              key={product?.identificador}
              title={product?.descripcioncatalogo || " - "}
              description={product?.descripcioncompleta || " - "}
              price={product?.preciobase ? `$${product.preciobase}` : " - "}
              imageUrl={auction.foto}
              onPress={() => router.push(`/auctionStarted/catalogue/product/${product?.identificador}?isArticles=true`)}
          />

          <ChatDate date={new Date()} />

          <ChatBubble
            isMe={true}
            text={messageText ?? ""}
            time="14:25"
          />

          <ChatBubble
            isMe={false}
            text="Hola! Gracias por comunicarte con La nueva seguros. Para proteger tu artículo durante la subasta, te recomendamos contratar una póliza de seguro que cubra daños y robos. ¿Te gustaría que te envíe más información sobre nuestras opciones de seguro?"
            time="14:26"
          />

          <ChatBubble
            isMe={true}
            text="Claro, me interesa saber más sobre las opciones de seguro que ofrecen."
            time="14:27"
          />

          <View className="mt-3 self-start">
            <TypingAnimation />
          </View>
        </ScrollView>

        <View 
          className="px-4 pt-3" 
          style={{ 
            backgroundColor: '#14191C',
            paddingBottom: Math.max(insets.bottom, 32) 
          }}
        >
          <ChatInput onSend={(message) => console.log(message)} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}