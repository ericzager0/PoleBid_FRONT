import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const categories = [
    { id: "plata", name: 'Silver', hex: '#B6BABD' },
    { id: "oro", name: 'Gold',  hex: '#E8B83C' },
    { id: "platino", name: 'Platinum', hex: '#B8C1E8' },
];

interface AuctionProps {
    categoryId: string;
    imageSrc: string;
    title: string;
    fecha: string;
    hora: string;
    owner: string;
    isActive?: boolean; 
    onPress?: () => void;
}

export default function Auction({ 
    categoryId, 
    imageSrc, 
    title, 
    fecha, 
    hora, 
    owner,
    isActive = false, 
    onPress 
}: AuctionProps) {
    const category = categories.find((c) => c.id === categoryId) || categories[0];

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.8} 
            className={`w-[100%] bg-[#2C2D32] rounded-[8px] p-3 flex-row mb-4 ${
              isActive ? 'border border-[#E8B83C]' : ''
            }`}
        >
            <View className="relative w-32 h-20 rounded-[8px] overflow-hidden">
                <Image 
                    source={{ uri: imageSrc }} 
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View 
                    className="absolute top-1.5 right-1.5 px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: category.hex }}
                >
                    <Text className="text-[#1C1C1E] text-xs font-semibold">
                        {category.name}
                    </Text>
                </View>
            </View>

            <View className="flex-1 ml-4 justify-between py-0.5">
                <View>
                    <Text className="text-white text-lg font-bold leading-tight" numberOfLines={1}>
                        {title}
                    </Text>
                    
                    {isActive ? (
                        <View className="flex-row items-center mt-1">
                            <View className="w-2 h-2 bg-red-500 rounded-full mr-1.5" />
                            <Text className="text-red-500 text-sm font-bold tracking-widest">
                                EN VIVO
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-[#ACB0B3] text-sm mt-1">
                            {fecha}, {hora}
                        </Text>
                    )}
                </View>
                <Text className="text-[#E8B83C] text-sm font-medium mt-2">
                    {owner}
                </Text>
            </View>

        </TouchableOpacity>
    );
}