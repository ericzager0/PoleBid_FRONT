import Button from "@/components/common/Button";
import ConfirmModal from "@/components/common/ConfirmModal";
import { CommonActions } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckPhoto() {
  const navigation = useNavigation();
  const cameraRef = useRef<any>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


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
    //LOGICA BACK
    setModalVisible(true);
  };

  const handleContinue = () => {
    navigation.dispatch(
        CommonActions.reset({
        index: 0,
        routes: [{ name: "(app)" }],
        }),
    );
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
            Validación de método de pago
          </Text>
          <Text className="text-[#9CA3AF] text-xl leading-7">
            Capturá una foto clara de tu cheque. Este paso es fundamental para proteger tu transacción y comprobar la autenticidad del documento.
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

      {/* MODAL */}
      <ConfirmModal
            visible={modalVisible}
            title="¿La foto es clara y legible?"
            description="Ahora podrás usar la App pero el cheque estará inbhabilitado hasta que un administrador valide la foto."
            confirmText="Continuar a la app"
            cancelText="No, volver a sacar"
            onConfirm={handleContinue}
            onCancel={() => setModalVisible(false)}
            onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}