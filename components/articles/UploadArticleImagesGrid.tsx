import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Linking, Text, TouchableOpacity, View } from 'react-native';

interface UploadArticleImagesProps {
  onImagesChange?: (images: (string | null)[]) => void; 
}

export default function UploadArticleImages({ onImagesChange }: UploadArticleImagesProps) {
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null]);

  const pickImage = async (index: number) => {
    let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (!permissionResult.granted) {
      Alert.alert(
        "Acceso a la galería",
        "Necesitamos acceso a tus fotos para que puedas subir las imágenes del artículo. Por favor, habilítalo en los ajustes de tu dispositivo.",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Ir a Ajustes", 
            onPress: () => Linking.openSettings() 
          }
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
      if (onImagesChange) onImagesChange(newImages);
    }
  };

  const handleAddSquare = () => {
    if (images.length < 12) {
      const newImages = [...images, null];
      setImages(newImages);
      if (onImagesChange) onImagesChange(newImages);
    }
  };

  return (
    <View className="flex-row flex-wrap justify-between gap-y-4 w-full items-start">
      {images.map((imageUri, index) => {
        const isCover = index === 0;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => pickImage(index)}
            className="w-[48%] rounded-[24px] bg-[#2A2B30] overflow-hidden border border-transparent"
            style={{ aspectRatio: 1 }} 
          >
            {imageUri ? (
              <Image 
                source={{ uri: imageUri }} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <View className="flex-1 items-center justify-center relative">
                <Ionicons
                  name={isCover ? "image-outline" : "camera-outline"}
                  size={32}
                  color="#A68A36" 
                />
                
                {isCover && (
                  <View className="absolute bottom-4 w-full items-center">
                    <Text className="text-[#A68A36] text-[11px] font-bold tracking-widest">
                      PORTADA
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {images.length < 12 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleAddSquare}
          className="w-[48%] rounded-[24px] items-center justify-center border-2 border-dashed border-[#4B4E54] bg-transparent"
          style={{ aspectRatio: 1 }} 
        >
          <Ionicons name="add" size={36} color="#4B4E54" />
        </TouchableOpacity>
      )}
    </View>
  );
}