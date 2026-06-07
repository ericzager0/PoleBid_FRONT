import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Button from '../common/Button';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ConfirmPayModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmPayModal({
  visible,
  onClose,
  onConfirm,
}: ConfirmPayModalProps) {
  
  // Valor animado que irá de 0 a 1
  const fillAnimation = useRef(new Animated.Value(0)).current;

  // Configuración del círculo SVG
  const circleRadius = 34;
  const circleCircumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    if (visible) {
      // Reseteamos la animación a 0 cada vez que se abre el modal
      fillAnimation.setValue(0);
      
      // Iniciamos la animación de llenado
      Animated.timing(fillAnimation, {
        toValue: 1,
        duration: 1200, // 1.2 segundos para que el usuario aprecie cómo se llena
        useNativeDriver: false, // Debe ser false para animar propiedades de SVG (strokeDashoffset)
      }).start();
    }
  }, [visible]);

  // Interpolamos de 1 a 0 para ir reduciendo el offset (lo que hace que la línea "crezca")
  const strokeDashoffset = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [circleCircumference, 0], 
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro translúcido */}
      <View className="flex-1 bg-black/85 justify-center px-4">
        
        {/* Contenedor del Modal (con el borde inferior amarillo sutil) */}
        <View className="bg-[#1C1C1E] w-full rounded-2xl p-6 pt-10 items-center border border-[#2A2B30] border-b-[3px] border-b-[#E8B83C] shadow-2xl relative">
          
          {/* Cruz para cerrar */}
          <TouchableOpacity 
            onPress={onClose} 
            className="absolute top-4 right-4 p-2 z-10"
          >
            <MaterialCommunityIcons name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* ÍCONO ANIMADO */}
          <View className="relative w-20 h-20 items-center justify-center mb-4">
            {/* SVG para el anillo de progreso */}
            <Svg width="80" height="80" className="absolute">
              {/* Círculo de fondo (Gris oscuro) */}
              <Circle
                cx="40"
                cy="40"
                r={circleRadius}
                stroke="#2A2B30"
                strokeWidth="3"
                fill="#14191C" // Fondo oscuro del círculo
              />
              {/* Círculo animado (Amarillo brillante) */}
              <AnimatedCircle
                cx="40"
                cy="40"
                r={circleRadius}
                stroke="#E8B83C"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                // Rotamos -90deg para que empiece a llenarse desde arriba
                originX="40"
                originY="40"
                rotation="-90"
              />
            </Svg>
            
            {/* Ícono de Martillo de Subasta */}
            <MaterialCommunityIcons name="gavel" size={32} color="#E8B83C" />
          </View>

          {/* Textos Principales */}
          <Text className="text-white text-2xl font-bold tracking-wide mb-3 text-center">
            Ya casi está!
          </Text>
          
          <Text className="text-[#9CA3AF] text-sm text-center mb-6 leading-relaxed px-2">
            Está a punto de completar la compra.{'\n'}
            Asegúrese de que los datos{'\n'}
            ingresados sean correctos.
          </Text>

          {/* Caja de Advertencia */}
          <View className="w-full bg-[#14191C] border-l-2 border-l-[#E8B83C] p-4 rounded-r-xl mb-8">
            <Text className="text-[#9CA3AF] text-xs leading-relaxed italic">
              Tener en cuenta si se rechaza el método de pago se cobrara una penalización y en caso de no presentar un método de pago alternativo dentro de las 72Hs se comenzarán métodos legales.
            </Text>
          </View>

          {/* Botón de Confirmación */}
          <View className="w-full">
            <Button 
              label="Finalizar Compra >" 
              variant="primary" 
              onPress={onConfirm} 
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}