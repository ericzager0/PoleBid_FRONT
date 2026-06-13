import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COUNTRYS_DICT } from "@/api/utils/counrty_dic";
import { useAuth } from "@/context/AuthContext";
import RoundedButton from "../../components/common/RoundedButton";
import UserInfoCard from "../../components/profile/UserInfoCard";
import UserStatusCard from "../../components/profile/UserStatusCard";
import MethodsSettings from "../../components/settings/MethodsSettings";

export default function AjustesScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const {user} = useAuth();

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FACC15"
            />
          </TouchableOpacity>
          <Text className="text-gray-100 text-2xl font-bold ml-4">Ajustes</Text>
        </View>

        <RoundedButton variant="primary" onPress={signOut} />
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mb-4">
          <MethodsSettings
            text="Administrar métodos de pago"
            frontalIcon="credit-card-outline"
            backgroundIcon="cash-multiple"
            onPress={() => router.push("/(settings)/payments")}
          />
        </View>

        <View className="mb-8">
          <MethodsSettings
            text="Administrar cuenta de vendedor"
            frontalIcon="gavel"
            backgroundIcon="storefront-outline"
            onPress={() => router.push("/(settings)/sellerOptions")}
          />
        </View>

        <View className="flex-row items-center mb-6">
          <View className="w-1 h-4 bg-[#FACC15] mr-2 rounded-full" />
          <Text
            className="text-[#FACC15] uppercase tracking-widest text-sm font-bold"
            style={{ fontFamily: "SpaceMono-Bold" }}
          >
            DATOS PERSONALES:
          </Text>
        </View>

        <UserInfoCard title="D.N.I." value={user?.documento || "No disponible"} />

        <UserInfoCard
          title="Nombre completo"
          value={`${user?.firstName} ${user?.lastName}` || "No disponible"}
        />

        <UserInfoCard title="Dirección" value={user?.direccion || "No disponible"} />

        <UserInfoCard title="Pais" value={COUNTRYS_DICT[user?.numeropais || 1] || "No disponible"} />

        <View className="mt-8 mb-4">
          <UserStatusCard status="verificado" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
