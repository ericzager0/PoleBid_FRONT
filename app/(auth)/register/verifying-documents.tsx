import { onboardingService } from "@/api/services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import documentFront from "../../../assets/images/document-front.png";

const IMG_HEIGHT = 250;
const RECT_HEIGHT = 60;
const POLL_INTERVAL = 5000;

export default function VerifyingDocuments() {
  const { data: rawData } = useLocalSearchParams();
  const prevData = JSON.parse(rawData as string);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // escribimos que el usuario se encuentra en esta parte del flujo
    AsyncStorage.setItem("awaiting_approval", prevData.email);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: IMG_HEIGHT - RECT_HEIGHT,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    const interval = setInterval(async () => {
      try {
        const response = await onboardingService.status(prevData.email);

        if (response.data?.status === "documents_approved") {
          // si los documentos fueron aprobados, limpiamos el estado de "awaiting_approval" y redirigimos al usuario a la pantalla de éxito
          await AsyncStorage.removeItem("awaiting_approval");

          router.replace({
            pathname: "/(auth)/register/documents-success",
            params: { data: JSON.stringify(prevData) },
          });
        } else if (response.data?.status === "documents_rejected") {
          await AsyncStorage.removeItem("awaiting_approval");
          router.replace({
            pathname: "/(auth)/register/documents-rejected",
          });
        }
      } catch (error) {
        console.error("Error status:", error);
      }
    }, POLL_INTERVAL);

    return () => {
      animation.stop();
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView className="bg-[#14191C] justify-center flex-1 gap-12 p-8">
      <View
        className="self-center relative overflow-hidden rounded-xl"
        style={{ width: 250, height: IMG_HEIGHT }}
      >
        <Image
          source={documentFront}
          style={{ width: 250, height: IMG_HEIGHT }}
          resizeMode="contain"
        />

        <Animated.View
          className="absolute inset-x-0 overflow-hidden border rounded-full border-green-400/50"
          style={{ height: RECT_HEIGHT, top: 0, transform: [{ translateY }] }}
        >
          <BlurView intensity={15} tint="light" className="absolute inset-0" />
          <View className="absolute inset-0 bg-green-500/25" />
        </Animated.View>
      </View>
      <View className="gap-8">
        <Text className="text-white text-5xl font-bold">
          Estamos verificando tus documentos
        </Text>
        <Text className="text-white text-2xl">
          ¡Listo por ahora! Te enviaremos un correo cuando los resultados estén
          disponibles para que finalices tu registro. Puedes cerrar la
          aplicación mientras tanto.
        </Text>
      </View>
    </SafeAreaView>
  );
}
