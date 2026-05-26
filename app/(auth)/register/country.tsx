import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COUNTRIES = [
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
];

type Country = (typeof COUNTRIES)[number];

export default function Country() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (country: Country) => {
    setSelected(country);
    setOpen(false);
  };

  return (
    <SafeAreaView className="bg-[#14191C] flex-1 justify-between p-8">
      <View className="gap-6">
        <Text className="text-white text-5xl font-bold">País de origen</Text>
        <Text className="text-white text-2xl">
          Necesitamos un poco de información para saber si sos elegible para una
          cuenta.
        </Text>

        {/* Select trigger */}
        <TouchableOpacity
          onPress={() => setOpen(true)}
          activeOpacity={0.8}
          className={`flex-row items-center justify-between border rounded-2xl px-4 py-4 mt-2 ${
            selected
              ? "border-white/40 bg-white/5"
              : "border-white/20 bg-white/5"
          }`}
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
          {/* Chevron */}
          <Text className={`text-white/50 text-lg ${open ? "rotate-180" : ""}`}>
            ▾
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={() => {}}>
            <View className="bg-[#1E2528] rounded-t-3xl px-4 pt-3 pb-8">
              {/* Handle */}
              <View className="w-10 h-1 rounded-full bg-white/20 self-center mb-4" />
              <Text className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-3 px-2">
                Países disponibles
              </Text>
              <FlatList
                data={COUNTRIES}
                keyExtractor={(item) => item.code}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const isSelected = selected?.code === item.code;
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                      className={`flex-row items-center justify-between px-4 py-4 rounded-2xl mb-1 ${
                        isSelected ? "bg-white/10" : ""
                      }`}
                    >
                      <View className="flex-row items-center gap-4">
                        <Text className="text-3xl">{item.flag}</Text>
                        <Text className="text-white text-lg font-medium">
                          {item.name}
                        </Text>
                      </View>
                      {isSelected && (
                        <Text className="text-white text-lg">✓</Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Pressable>
        </Pressable>
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
