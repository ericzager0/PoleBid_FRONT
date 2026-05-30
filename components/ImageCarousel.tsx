import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  if (!images || images.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <View className="relative w-full h-64 rounded-[8px] overflow-hidden bg-[#222]">
        <Image
          source={{ uri: images[currentIndex] }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => setIsExpanded(true)}
          activeOpacity={0.7}
          className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
        >
          <Ionicons name="expand" size={20} color="white" />
        </TouchableOpacity>

        {images.length > 1 && (
          <>
            <TouchableOpacity
              onPress={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full"
            >
              <Ionicons name="chevron-back" size={24} color="#757575" />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full"
            >
              <Ionicons name="chevron-forward" size={24} color="#757575" />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Modal de pantalla completa */}
      <Modal visible={isExpanded} transparent={true} animationType="fade">
        <View className="flex-1 bg-black/95 justify-center items-center">
          <TouchableOpacity
            onPress={() => setIsExpanded(false)}
            className="absolute top-12 right-6 z-10 p-2"
          >
            <Ionicons name="contract" size={32} color="white" />
          </TouchableOpacity>

          <View className="w-full h-[80%] justify-center relative">
            <Image
              source={{ uri: images[currentIndex] }}
              className="w-full h-full"
              resizeMode="contain" 
            />
            
            {images.length > 1 && (
              <>
                <TouchableOpacity
                  onPress={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
                >
                  <Ionicons name="chevron-back" size={32} color="#757575" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
                >
                  <Ionicons name="chevron-forward" size={32} color="#757575" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}