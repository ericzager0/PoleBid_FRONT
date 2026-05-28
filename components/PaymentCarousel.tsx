import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PaymentCarouselProps {
  title: string;
  data: any[];
  placeholderData: any;
  renderItem: (item: any) => React.ReactNode;
  showAddIcon?: boolean;
  showArrows?: boolean; 
}

export default function PaymentCarousel({ title, data, placeholderData, renderItem, showAddIcon = true, showArrows = true }: PaymentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isEmpty = data.length === 0;
  const disableArrows = isEmpty || data.length === 1;
  const currentItem = isEmpty ? placeholderData : data[currentIndex];

  const handleNext = () => {
    if (!disableArrows) {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }
  };

  const handlePrev = () => {
    if (!disableArrows) {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }
  };

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-base font-bold tracking-wide">
          {title}
        </Text>
        <View className="flex-row items-center">
          {showAddIcon && (
            <TouchableOpacity className="mr-3 bg-white rounded-full">
              <MaterialCommunityIcons name="plus-circle" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <MaterialCommunityIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center justify-between px-2">
        {showArrows && (
          <TouchableOpacity onPress={handlePrev} disabled={disableArrows} className="p-2">
            <MaterialCommunityIcons 
              name="chevron-left" 
              size={32} 
              color={disableArrows ? "#333333" : "white"} 
            />
          </TouchableOpacity>
        )}

        <View className="flex-1 px-2">
          {renderItem(currentItem)}
        </View>

        {showArrows && (
          <TouchableOpacity onPress={handleNext} disabled={disableArrows} className="p-2">
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={32} 
              color={disableArrows ? "#333333" : "white"} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};