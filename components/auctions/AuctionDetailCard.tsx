import React from "react";
import { Text, View } from "react-native";
import ImageCarousel from "../common/ImageCarousel";

interface AuctionDetailCardProps {
  fecha: string;
  estado: string;
  descripcion: string;
  images: string[];
}

export default function AuctionDetailCard({
  fecha,
  estado,
  descripcion,
  images,
}: AuctionDetailCardProps) {
  return (
    <View className="bg-[#36393F] rounded-[8px] p-4 w-[90%] gap-y-4">
      <View>
        <Text className="text-white text-base">
          <Text className="font-bold">Fecha: </Text>
          {fecha}
        </Text>
        <Text className="text-white text-base mt-1">
          <Text className="font-bold">Estado: </Text>
          {estado}
        </Text>
        <Text className="text-white text-base mt-1 leading-relaxed">
          <Text className="font-bold">Descripción: </Text>
          {descripcion}
        </Text>
      </View>

      <ImageCarousel images={images} />
    </View>
  );
}
