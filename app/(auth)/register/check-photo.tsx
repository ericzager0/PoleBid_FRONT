import Button from "@/components/common/Button";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckPhoto() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const result = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setPhoto(result.uri);
      } catch (error) {
        console.error("Error al tomar la foto:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const handleSave = () => {
    console.log("Guardando foto:", photo);
  };

  if (!permission) {
    return <SafeAreaView className="bg-[#14191C] flex-1" />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="bg-[#14191C] flex-1 p-8 justify-center gap-6">
        <Text className="text-white text-3xl font-bold text-center">
          Acceso a la cámara
        </Text>
        <Text className="text-white text-lg text-center mb-4">
          Necesitamos acceso a tu cámara para poder escanear el cheque.
        </Text>
        <Button label="Otorgar permiso" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#14191C] flex-1">
      <View className="flex-1 justify-between p-8">
        <View className="gap-6">
          <Text className="text-white text-5xl font-bold tracking-tight leading-[55px]">
            Foto de cheque
          </Text>
          <Text className="text-[#9CA3AF] text-xl leading-7">
            Ahora vamos a pedirte una foto del cheque para comprobar si es real y validar los datos.
          </Text>
        </View>

        <View className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-[#2A2B30] bg-black my-8 shadow-xl">
          {photo ? (
            <Image source={{ uri: photo }} className="flex-1 w-full h-full object-cover" />
          ) : (
            <CameraView 
              ref={cameraRef} 
              style={{ flex: 1 }} 
              facing="back" 
            />
          )}
        </View>

        <View className="gap-4">
          {photo ? (
            <>
              <Button
                label="Guardar foto"
                onPress={handleSave}
              />
              <Button
                label="Volver a sacar"
                variant="secondary"
                onPress={retakePicture}
              />
            </>
          ) : (
            <Button
              label="Sacar foto"
              loading={loading}
              disabled={loading}
              onPress={takePicture}
            />
          )}
        </View>
        
      </View>
    </SafeAreaView>
  );
}