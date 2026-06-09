import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ArticleItem {
  id: string | number;
  name: string;
  date: string;
}

interface ItemMenuCardProps {
  title: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  articles: ArticleItem[];
  onPressItem?: (item: ArticleItem) => void;
  offeringArticle?: boolean;
  onPressOffer?: () => void;
}

export default function ItemMenuCard({
  title,
  iconName = 'check-circle',
  articles,
  onPressItem,
  offeringArticle = false,
  onPressOffer
}: ItemMenuCardProps) {
  return (
    <View className="w-full bg-[#1C1C1E] rounded-[24px] p-5 shadow-sm border border-[#2A2B30]">
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center flex-1">
          <View className="bg-[#E8B83C]/20 p-2 rounded-xl mr-3 items-center justify-center">
            <MaterialCommunityIcons name={iconName} size={24} color="#E8B83C" />
          </View>
          <Text 
            className="text-white text-xl font-bold tracking-wide flex-shrink"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {offeringArticle && (
          <TouchableOpacity
            onPress={onPressOffer}
            activeOpacity={0.8}
            className="flex-row items-center border border-white rounded-full px-3 py-1.5 ml-2"
          >
            <MaterialCommunityIcons name="plus" size={16} color="white" />
            <Text className="text-white text-sm font-medium ml-1 tracking-wide">
              Ofrecer
            </Text>
          </TouchableOpacity>
        )}

      </View>

      <View className="gap-y-3">
        {articles.length > 0 ? (
          articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              activeOpacity={0.8}
              onPress={() => onPressItem && onPressItem(article)}
              className="w-full bg-[#B6BABD] rounded-2xl py-4 px-5" 
            >
              <Text className="text-[#1A1A1A] text-lg font-bold mb-1 tracking-tight">
                {article.name}
              </Text>
              <Text className="text-[#4B4E54] text-sm font-medium">
                {article.date}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-[#6B7280] italic text-center py-2">
            No hay artículos por el momento.
          </Text>
        )}
      </View>
    </View>
  );
}