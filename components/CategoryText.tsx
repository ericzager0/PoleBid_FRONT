import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Text, View } from 'react-native';

const categories = [
    { id: 1, name: 'Silver', colorClass: 'text-[#B6BABD]', hex: '#B6BABD' },
    { id: 2, name: 'Gold', colorClass: 'text-[#E8B83C]', hex: '#E8B83C' },
    { id: 3, name: 'Platinum', colorClass: 'text-[#B8C1E8]', hex: '#B8C1E8' },
];

interface CategoryTextProps {
    categoryId: number;
}

export default function CategoryText({ categoryId }: CategoryTextProps) {
    const category = categories.find((c) => c.id === categoryId);
    return (
        <View className="w-full px-6 mt-4 gap-y-6">
            <View className="flex-row items-center gap-x-2">
                {category && (
                    <FontAwesome6 
                        name="award" 
                        size={22} 
                        color={category.hex} 
                    />
                
                )}

                <Text className={`text-white text-lg font-bold ${category?.colorClass}`}>
                    Categoría {category?.name}
                </Text>
            </View>
        </View>
    );
};
