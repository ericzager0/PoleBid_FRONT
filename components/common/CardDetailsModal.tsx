import { paymentMethodService } from "@/api/services/paymentMethod";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import ErrorMessege from "./ErrorMessege";
import { Input } from "./Input";
import KeyboardWrapper from "./KeyboardWrapper";

export interface CardData {
  brand: string;
  lastFour: string;
  owner: string;
  expMonth: string;
  expYear: string;
  cvv?: string;
}

interface CardDetailsModalProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm: (data: CardData) => void;
  initialData?: CardData | null;
  isRegister?: boolean;
  label?: string;
}

export default function CardDetailsModal({
  visible,
  onClose,
  onConfirm,
  initialData,
  isRegister = false,
  label = "Guardar",
}: CardDetailsModalProps) {
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [titular, setTitular] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setBankName(initialData.brand);
      setCardNumber(initialData.lastFour);
      setTitular(initialData.owner);
      setExpiry(`${initialData.expMonth}/${initialData.expYear}`);
      setCvv(initialData.cvv || "");
    } else {
      setBankName("");
      setCardNumber("");
      setTitular("");
      setExpiry("");
      setCvv("");
    }
    setError(null);
  }, [initialData, visible]);

  const handleConfirm = async () => {
    if (!cardNumber || !titular || !expiry || !cvv) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    setError(null);

    // aca llamo al backend addCard y tras exito continuo, y con error seteo error.
    try {
      // setLoading(true);
      setError(null);

      // Registramos al usuario
      await paymentMethodService.addCard({
        number: cardNumber.replace(/\s/g, ""),
        expMonth: expiry.split("/")[0],
        expYear: `20${expiry.split("/")[1]}`,
        owner: titular,
      });
    } catch (e: any) {
      setError(
        "Error al agregar tarjeta: " + (e.response?.data?.message || e.message),
      );
    } finally {
      // setLoading(false);
    }

    onConfirm({
      brand: bankName,
      lastFour: cardNumber,
      owner: titular,
      expMonth: expiry.split("/")[0],
      expYear: `20${expiry.split("/")[1]}`,
      cvv,
    });
    onClose?.();
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
    if (error) setError(null);
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 2) {
      const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      setExpiry(formatted);
    } else {
      setExpiry(cleaned);
    }
    if (error) setError(null);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        if (!isRegister) onClose?.();
      }}
    >
      <View className={`flex-1 ${!isRegister ? "bg-black/80" : ""}`}>
        <KeyboardWrapper>
          <View className="flex-1 justify-center px-4 py-8">
            <View className="bg-[#1C1C1E] w-full rounded-2xl p-6 border border-[#2A2B30] shadow-xl">
              {!isRegister ? (
                <View className="flex-row justify-end mb-2">
                  <TouchableOpacity onPress={onClose} className="p-1">
                    <Ionicons name="close" size={28} color="#D1D5DB" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="mb-4" />
              )}

              <Text className="text-white text-lg font-medium tracking-wide mb-6">
                Ingrese los datos de la tarjeta:
              </Text>

              <View className="gap-y-6">
                <Input
                  label="Nro tarjeta"
                  variant="register"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  keyboardType="numeric"
                  maxLength={19}
                />

                <Input
                  label="Titular"
                  variant="register"
                  placeholder="Nombre como aparece en la tarjeta"
                  value={titular}
                  onChangeText={(text) => {
                    setTitular(text);
                    if (error) setError(null);
                  }}
                  autoCapitalize="words"
                />

                <View className="flex-row gap-x-4">
                  <View className="flex-1">
                    <Input
                      label="Fecha"
                      variant="register"
                      placeholder="MM/AA"
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>

                  <View className="flex-1">
                    <Input
                      label="Cv"
                      variant="register"
                      placeholder="123"
                      value={cvv}
                      onChangeText={(text) => {
                        setCvv(text);
                        if (error) setError(null);
                      }}
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>

              {error && <ErrorMessege error={error} />}

              <View className="mt-6">
                <Button
                  label={label}
                  variant="primary"
                  onPress={handleConfirm}
                />
              </View>
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </Modal>
  );
}
