import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import documentFront from "../../../assets/images/document-front.png";

export default function DocumentationFront() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  // Sin permiso concedido
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center gap-4 bg-black px-6">
        <Text className="text-white text-base text-center">
          Se necesita acceso a la cámara
        </Text>
        <TouchableOpacity
          className="bg-white w-full py-4 rounded-xl items-center"
          onPress={requestPermission}
        >
          <Text className="text-black text-lg font-semibold">
            Conceder permiso
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
      base64: false,
      skipProcessing: false,
    });

    setCapturedPhoto(photo.uri);
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-black items-center justify-center gap-12 p-4">
      <View className="border border-white rounded-xl overflow-hidden w-full">
        {capturedPhoto ? (
          <Image
            source={{ uri: capturedPhoto }}
            style={{ width: "100%", aspectRatio: 1 }}
          />
        ) : (
          <View style={{ width: "100%", aspectRatio: 1 }}>
            <CameraView
              ref={cameraRef}
              style={{ width: "100%", aspectRatio: 1 }}
              facing="back"
              autofocus="on"
            />
          </View>
        )}
        <View className="bg-white flex-row items-center justify-center gap-4 px-10">
          <Image
            source={documentFront}
            style={{ width: 65, height: 65 }}
            resizeMode="contain"
          />
          <Text className="flex-1">
            Centrá toda tu identificación en el marco.
          </Text>
        </View>
      </View>

      {/* ── Botones ── */}
      <View className="w-full h-[100px] justify-center">
        {capturedPhoto ? (
          <View>
            <TouchableOpacity
              className="bg-white mx-5 my-2 py-4 rounded-xl items-center"
              onPress={handleRetake}
            >
              <Text className="text-black text-lg font-semibold">
                Utilizar esta foto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white mx-5 my-2 py-4 rounded-xl items-center"
              onPress={handleRetake}
            >
              <Text className="text-black text-lg font-semibold">
                Volver a tomar la foto
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-white h-14 w-14 rounded-full self-center"
            onPress={handleCapture}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
