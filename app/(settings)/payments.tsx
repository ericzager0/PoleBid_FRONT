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

import SimpleModal from "@/components/common/SimpleModal";
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
  bank_name: "---",
  owner: "---",
  number: 0,
  currency: "ARS$",
  amount: 0,
  issueDate: "--/--/----",
};
const BankPlaceholderData = {
  bank_name: "---",
  owner: "---",
  cuil_cuit: "--",
  cbu: "*** ----",
  reserved_funds: "$0,00",
  is_verified: true,
};

export default function PaymentsScreen() {
  const { user,  signOut, getMe} = useAuth();
  const router = useRouter();

  const [showCardModal, setShowCardModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardData | null>(null);
  const [checkToEdit, setCheckToEdit] = useState<CheckData | null>(null);
  const [bankToEdit, setBankToEdit] = useState<BankData | null>(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [misTarjetas, setMisTarjetas] = useState<CardData[]>([]);
  const [misBancos, setMisBancos] = useState<BankData[]>([]);
  const [misCheques, setMisCheques] = useState<CheckData[]>([]);

  useEffect(() => {
    if (user?.paymentMethods.cards) {
      setMisTarjetas(user.paymentMethods.cards as unknown as CardData[]);
    }
    if (user?.paymentMethods.banksAccounts) {
      setMisBancos(user.paymentMethods.banksAccounts as unknown as BankData[]);
    }
    if (user?.paymentMethods.checks) {
      setMisCheques(user.paymentMethods.checks as unknown as CheckData[]);
    }
  }, [user]);

  const handleAddCard = async () => {
    setCardToEdit(null);
    setShowCardModal(true);
    await getMe();
  };

  const handleEditCard = async (card: CardData) => {
    setCardToEdit(card);
    setShowCardModal(true);
    await getMe();
  };

  const handleAddCheck = async () => {
    
    setCheckToEdit(null);
    setShowCheckModal(true);
    await getMe();
  };

  const handleEditCheck = async (check: CheckData) => {
    if (check.is_verified === false) {
      setEditModalVisible(true);
      return;
    }
    setCheckToEdit(check);
    setShowCheckModal(true);
    await getMe();
  };

  const handleAddBank = async() => {
    setBankToEdit(null);
    setShowBankModal(true);
    await getMe();
  };
  const handleEditBank = async (bank: BankData) => {
    setBankToEdit(bank);
    setShowBankModal(true);
    await getMe();
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
          data={misCheques}
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
          
          if (checkToEdit) {
            setMisCheques((prev) => prev.map(cheque => cheque.number === checkToEdit.number ? data : cheque));
          } else {
            setMisCheques((prev) => [...prev, data]);
          }
          
          setShowCheckModal(false);
          router.push({ pathname: "/register/check-photo", params: { isProfile: "true" } });
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

      <SimpleModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        texto="Este cheque está siendo revisado por nuestro equipo y no puede ser editado en este momento."
      />
    </SafeAreaView>
  );
}
