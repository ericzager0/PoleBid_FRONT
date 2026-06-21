import BankDetailsModal from "@/components/common/BankDetailsModal";
import CardDetailsModal from "@/components/common/CardDetailsModal";
import CheckDetailsModal from "@/components/common/CheckDetailsModal";
import { useAuth } from "@/context/AuthContext";
import { CommonActions } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentDetailsScreen() {
  const { method } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { getMe } = useAuth();

  const handleConfirm = async (data: any) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(app)" }],
      }),
    );

    await getMe(); // Refresca los datos del usuario para incluir el nuevo método de pago
  };

  const renderPaymentInput = () => {
    switch (method) {
      case "card":
        return (
          <CardDetailsModal
            isRegister={true}
            onConfirm={handleConfirm}
            visible={true}
            label="Finalizar registro"
          />
        );
      case "bank":
        return (
          <BankDetailsModal
            isRegister={true}
            onConfirm={handleConfirm}
            visible={true}
            label="Finalizar registro"
          />
        );
      case "check":
        return (
          <CheckDetailsModal
            isRegister={true}
            onConfirm={() => router.push("/(auth)/register/check-photo")}
            visible={true}
            label="Finalizar registro"
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14191C] p-8">
      <View className="flex-1">{renderPaymentInput()}</View>
    </SafeAreaView>
  );
}
