import { LOGOS_DICT } from "@/api/utils/bank_logos";
import React from "react";
import { Image, Text, View } from "react-native";

interface CreditCardProps {
  brand: string;
  owner: string;
  lastFour: string;
  expMonth: string;
  expYear: string;
}

export default function CreditCard({
  brand,
  owner,
  lastFour,
  expMonth,
  expYear,
}: CreditCardProps) {
  const getLogo = (name: string) => {
    const normalizedName = name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return LOGOS_DICT[normalizedName] || LOGOS_DICT["mastercard"];
  };

  return (
    <View
      className="relative w-full aspect-[1.6] rounded-[32px] bg-[#10B981] overflow-hidden p-5 justify-between shadow-lg"
      style={{
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
      }}
    >
      <View className="absolute -bottom-32 -left-10 w-[120%] h-64 bg-[#047857] rounded-[100px] opacity-80" />
      <View className="absolute -top-24 -right-16 w-80 h-80 bg-[#34D399] rounded-full opacity-50" />

      <View className="flex-row justify-between items-start">
        <Text
          className="text-white/80 text-lg font-bold tracking-wider flex-1 mr-4"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {brand}
        </Text>

        <View className="items-center justify-center">
          <Image
            source={brand ? getLogo(brand) : LOGOS_DICT["mastercard"]}
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View className="mt-2">
        <Text
          className="text-white text-2xl tracking-widest shadow-sm"
          style={{ fontFamily: "SpaceMono-Regular" }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          **** **** **** {lastFour}
        </Text>
      </View>

      <View className="flex-row justify-between items-end">
        <Text
          className="text-white/90 text-xs font-medium tracking-widest uppercase flex-1 mr-4"
          numberOfLines={2}
        >
          {owner}
        </Text>

        <Text className="text-white text-base font-bold tracking-widest">
          {expMonth}/{expYear}
        </Text>
      </View>
    </View>
  );
}
