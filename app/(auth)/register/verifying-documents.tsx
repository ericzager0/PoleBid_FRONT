import { onboardingService } from "@/api/services/onboarding";
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

    onboardingService
      .documents({ ...prevData })
      .then(() => {})
      .catch((error) => {
        console.error("Error documents:", error.message); // ← acá
      });

    const interval = setInterval(async () => {
      try {
        const response = await onboardingService.status(prevData.email);

        if (response.data?.status === "documents_approved") {
          router.replace({
            pathname: "/(auth)/register/documents-success",
            params: { data: JSON.stringify(prevData) },
          });
        }
      } catch (error) {
        // Seguimos polling ante un error puntual
        console.error("Error status:", error); // ← acá
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
          Te enviaremos un correo cuando los resultados estén disponibles para
          que finalices tu registro.
        </Text>
      </View>
    </SafeAreaView>
  );
}
