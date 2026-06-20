import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface BidInputProps {
  value: number;
  setValue: (val: number) => void;
  min: number;
  max: number;
  enabled?: boolean;
}

export default function BidInput({
  value,
  setValue,
  min,
  max,
  enabled = true,
}: BidInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formatMoney = (val: number) => {
    return "$" + val.toLocaleString("en-US");
  };

  const handleTextChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setValue(0);
      return;
    }

    const formatted = parseInt(numericValue, 10).toLocaleString("en-US");
    setValue(parseInt(formatted, 10));
  };

  const activeColor = "#E8B83C";
  const inactiveColor = "#757575";
  const currentColor = isFocused ? activeColor : inactiveColor;

  return (
    <View className="w-full my-2">
      <View
        className={`flex-row items-center border-2 rounded-xl px-4 py-3 bg-[#36393F] ${
          !enabled
            ? "opacity-50 border-[#2A2B30] bg-[#2A2B30]"
            : isFocused
              ? "border-[#E8B83C]"
              : "border-[#757575]"
        }`}
      >
        <Text
          className="text-2xl font-medium mr-2"
          style={{ color: !enabled ? inactiveColor : currentColor }}
        >
          $
        </Text>

        <TextInput
          className="flex-1 text-2xl font-medium"
          style={{ color: !enabled ? inactiveColor : currentColor }}
          keyboardType="numeric"
          value={String(value)}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={enabled}
          placeholder="0"
          placeholderTextColor={inactiveColor}
          returnKeyType="done"
        />

        <View className="ml-2">
          <MaterialCommunityIcons
            name="swap-vertical"
            size={28}
            color={!enabled ? inactiveColor : currentColor}
          />
        </View>
      </View>

      <View className="flex-row justify-between px-2 mt-2">
        <Text className="text-[#9CA3AF] text-sm">Min: {formatMoney(min)}</Text>
        <Text className="text-[#9CA3AF] text-sm">Max: {formatMoney(max)}</Text>
      </View>
    </View>
  );
}
