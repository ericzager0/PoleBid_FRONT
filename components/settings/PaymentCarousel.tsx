import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PaymentCarouselProps {
  title: string;
  data: any[];
  placeholderData: any;
  renderItem: (item: any) => React.ReactNode;
  showAddIcon?: boolean;
  showEditIcon?: boolean;
  showArrows?: boolean; 
  onPressAdd?: () => void;
  onPressEdit?: (item: any) => void;
  onIndexChange?: (index: number) => void; // <-- Declarado en la interfaz
}

export default function PaymentCarousel({ 
  title, 
  data, 
  placeholderData, 
  renderItem, 
  showAddIcon = true,
  showEditIcon = true, 
  showArrows = true, 
  onPressAdd, 
  onPressEdit,
  onIndexChange // <-- Lo extraemos de las props
}: PaymentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isEmpty = data.length === 0;
  const disableArrows = isEmpty || data.length === 1;
  const currentItem = isEmpty ? placeholderData : data[currentIndex];

  const isEditDisabled = isEmpty || currentItem?.isRevision === true;

  const handleNext = () => {
    if (!disableArrows) {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      onIndexChange?.(nextIndex); // <-- Le avisamos a la pantalla de pago el nuevo índice
    }
  };

  const handlePrev = () => {
    if (!disableArrows) {
      const prevIndex = (currentIndex - 1 + data.length) % data.length;
      setCurrentIndex(prevIndex);
      onIndexChange?.(prevIndex); // <-- Le avisamos a la pantalla de pago el nuevo índice
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
            <TouchableOpacity className="mr-3 bg-white rounded-full" onPress={onPressAdd}>
              <MaterialCommunityIcons name="plus-circle" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          )}
          {showEditIcon && (
            <TouchableOpacity 
              onPress={() => onPressEdit?.(currentItem)} 
              disabled={isEditDisabled}
            >
              <MaterialCommunityIcons 
                name="pencil" 
                size={24} 
                color={isEditDisabled ? "#4B4E54" : "white"} 
              />
            </TouchableOpacity>
          )}
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
}