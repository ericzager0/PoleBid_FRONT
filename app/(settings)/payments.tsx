import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardDetailsModal, {
  CardData,
} from "@/components/common/CardDetailsModal";
import CheckDetailsModal, {
  CheckData,
} from "@/components/common/CheckDetailsModal";
import BankDetailsModal, {
  BankData,
} from "../../components/common/BankDetailsModal";

import { useAuth } from "@/context/AuthContext";
import RoundedButton from "../../components/common/RoundedButton";
import BankPlaceholder from "../../components/settings/BankPlaceholder";
import CheckPlaceholder from "../../components/settings/CheckPlaceholder";
import CreditCard from "../../components/settings/CreditCard";
import PaymentCarousel from "../../components/settings/PaymentCarousel";

const CardPlaceholderData = {
  brand: "---",
  owner: "---",
  lastFour: "****",
  expMonth: "--",
  expYear: "----",
};
const CheckPlaceholderData = {
  bankName: "---",
  titular: "---",
  checkNumber: "---",
  currency: "$",
  monto: "0,00",
  emision: "--/--/----",
};
const BankPlaceholderData = {
  bank_name: "---",
  owner: "---",
  cuil_cuit: "--",
  cbu: "*** ----",
  reserved_funds: "$0,00",
};

export default function PaymentsScreen() {
  const { user, signOut, getMe } = useAuth();
  const router = useRouter();

  const [showCardModal, setShowCardModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardData | null>(null);
  const [checkToEdit, setCheckToEdit] = useState<CheckData | null>(null);
  const [bankToEdit, setBankToEdit] = useState<BankData | null>(null);

  const [misTarjetas, setMisTarjetas] = useState<CardData[]>([]);
  const [misBancos, setMisBancos] = useState<BankData[]>([]);

  const userChecks = [
    {
      bankName: "BANCO NACIONAL",
      titular: "Martin Mazini",
      checkNumber: "00482931",
      currency: "$",
      monto: "125000",
      emision: "16/04/2026",
      isRevision: true,
    },
    {
      bankName: "visa",
      titular: "Chiqui Tapia",
      checkNumber: "00482931",
      currency: "$",
      monto: "500000",
      emision: "16/04/2026",
      isRevision: false,
    },
  ];

  const userBankAccounts = user?.paymentMethods.banksAccounts || [];

  useEffect(() => {
    if (user?.paymentMethods.cards) {
      setMisTarjetas(user.paymentMethods.cards as unknown as CardData[]);
    }
    if (user?.paymentMethods.banksAccounts) {
      setMisBancos(user.paymentMethods.banksAccounts as unknown as BankData[]);
    }
  }, [user]);

  const handleAddCard = () => {
    setCardToEdit(null);
    setShowCardModal(true);
  };
  const handleEditCard = (card: CardData) => {
    setCardToEdit(card);
    setShowCardModal(true);
  };

  const handleAddCheck = () => {
    setCheckToEdit(null);
    setShowCheckModal(true);
  };
  const handleEditCheck = (check: CheckData) => {
    setCheckToEdit(check);
    setShowCheckModal(true);
  };

  const handleAddBank = () => {
    setBankToEdit(null);
    setShowBankModal(true);
  };
  const handleEditBank = (bank: BankData) => {
    setBankToEdit(bank);
    setShowBankModal(true);
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <RoundedButton onPress={() => signOut()} />
      </View>

      <View className="px-5 pb-6">
        <Text className="text-white text-4xl font-bold tracking-tight">
          Métodos de pago:
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <PaymentCarousel
          title="Administrar Tarjetas:"
          data={misTarjetas}
          placeholderData={CardPlaceholderData}
          renderItem={(item) => <CreditCard {...item} />}
          onPressAdd={handleAddCard}
          onPressEdit={(item) => handleEditCard(item)}
        />

        <PaymentCarousel
          title="Administrar cheques:"
          data={userChecks}
          placeholderData={CheckPlaceholderData}
          renderItem={(item) => <CheckPlaceholder {...item} />}
          onPressAdd={handleAddCheck}
          onPressEdit={(item) => handleEditCheck(item)}
        />

        <PaymentCarousel
          title="Administrar cuenta Bancaria:"
          data={misBancos}
          placeholderData={BankPlaceholderData}
          renderItem={(item) => <BankPlaceholder {...item} />}
          onPressAdd={handleAddBank}
          onPressEdit={(item) => handleEditBank(item)}
        />
      </ScrollView>

      {/* MODALES */}
      <CardDetailsModal
        visible={showCardModal}
        initialData={cardToEdit}
        onClose={() => setShowCardModal(false)}
        onConfirm={async (data) => {
          if (cardToEdit) {
            setMisTarjetas((prev) =>
              prev.map((tarjeta) =>
                tarjeta.lastFour === cardToEdit.lastFour ? data : tarjeta,
              ),
            );
          } else {
            setMisTarjetas((prev) => [...prev, data]);
          }
          setShowCardModal(false);
          await getMe();
        }}
      />

      <CheckDetailsModal
        visible={showCheckModal}
        initialData={checkToEdit}
        onClose={() => {
          setShowCheckModal(false);
        }}
        onConfirm={(data) => {
          console.log("Cheque confirmado:", data);
          router.push({
            pathname: "/register/check-photo",
            params: { isProfile: "true" },
          });
        }}
      />

      <BankDetailsModal
        visible={showBankModal}
        initialData={bankToEdit}
        onClose={() => setShowBankModal(false)}
        onConfirm={async (data) => {
          if (bankToEdit) {
            setMisBancos((prev) =>
              prev.map((banco) =>
                banco.cbu === bankToEdit.cbu ? data : banco,
              ),
            );
          } else {
            setMisBancos((prev) => [...prev, data]);
          }
          setShowBankModal(false);
          await getMe();
        }}
      />
    </SafeAreaView>
  );
}
