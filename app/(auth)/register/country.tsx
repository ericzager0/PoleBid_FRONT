import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COUNTRIES = [
  { code: 1, name: "Argentina", flag: "🇦🇷" },
  { code: 2, name: "Bolivia", flag: "🇧🇴" },
  { code: 3, name: "Brasil", flag: "🇧🇷" },
  { code: 4, name: "Chile", flag: "🇨🇱" },
  { code: 5, name: "Paraguay", flag: "🇵🇾" },
  { code: 6, name: "Uruguay", flag: "🇺🇾" },
];

type Country = (typeof COUNTRIES)[number];

export default function Country() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [open, setOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openSheet = () => {
    setOpen(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setOpen(false);
      callback?.();
    });
  };

  const handleSelect = (country: Country) => {
    setSelected(country);
    closeSheet();
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">País de origen</Text>
        <Text className="text-white text-2xl">
          Necesitamos un poco de información para saber si sos elegible para una
          cuenta.
        </Text>

        {/* Trigger */}
        <TouchableOpacity
          onPress={openSheet}
          activeOpacity={0.8}
          className="flex-row items-center justify-between border border-white/20 bg-white/5 rounded-2xl px-5 py-4 mt-2"
        >
          {selected ? (
            <View className="flex-row items-center gap-3">
              <Text className="text-3xl">{selected.flag}</Text>
              <Text className="text-white text-lg font-medium">
                {selected.name}
              </Text>
            </View>
          ) : (
            <Text className="text-white/40 text-lg">Seleccioná tu país</Text>
          )}
          <Text className="text-white/40 text-base">▾</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom sheet manual */}
      <Modal visible={open} transparent onRequestClose={() => closeSheet()}>
        {/* Backdrop */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute inset-0 bg-black/70"
        >
          <Pressable className="flex-1" onPress={() => closeSheet()} />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={{ transform: [{ translateY: slideAnim }] }}
          className="absolute bottom-0 left-0 right-0 bg-[#1E2528] rounded-t-3xl pt-3 pb-10"
        >
          {/* Handle */}
          <View className="w-10 h-1 rounded-full bg-white/20 self-center mb-5" />

          <Text className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2 px-6">
            Países disponibles
          </Text>

          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item.code.toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => {
              const isSelected = selected?.code === item.code;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.6}
                  className={`flex-row items-center justify-between px-4 py-4 rounded-2xl mb-1 ${
                    isSelected ? "bg-white/10" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <Text className="text-3xl">{item.flag}</Text>
                    <Text
                      className={`text-lg font-medium ${
                        isSelected ? "text-white" : "text-white/70"
                      }`}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {isSelected && (
                    <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      </Modal>

      <Button
        label="Comenzar"
        variant="secondary"
        disabled={!selected}
        onPress={() =>
          router.push({
            pathname: "/(auth)/register/name",
            params: { data: JSON.stringify({ country: selected?.code }) },
          })
        }
      />
    </SafeAreaView>
  );
}
