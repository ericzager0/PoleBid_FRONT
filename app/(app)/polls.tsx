import Auction from "@/components/Auction";
import FilterButton from "@/components/FilterButton";
import SearchBar from "@/components/SearchBar";
import React, { useState } from 'react';
import { FlatList, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuctionItem {
  id: string;
  categoryId: number;
  imageSrc: string;
  title: string;
  fecha: string;
  hora: string;
  owner: string;
}

const f1AuctionsData: AuctionItem[] = [
  { id: '1', categoryId: 3, imageSrc: 'https://imgs.search.brave.com/qyzM_SmMSFOiqbGUn8pnGunMSG1XFH0HHPjf0W_GGQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaWxv/ZHJvbWUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzEy/L0F5cnRvbi1TZW5u/YS1NY0xhcmVuLUhl/bG1ldC1TaWRlLTIt/NzQweDU5Mi5qcGc', title: 'Casco Ayrton Senna 1990', fecha: 'Nov 15', hora: '10:00', owner: 'Museo F1' },
  { id: '2', categoryId: 2, imageSrc: 'https://picsum.photos/seed/f1_2/400/200', title: 'Guantes de Lewis Hamilton', fecha: 'Nov 16', hora: '14:30', owner: 'Mercedes AMG' },
  { id: '3', categoryId: 1, imageSrc: 'https://picsum.photos/seed/f1_3/400/200', title: 'Neumático Pirelli Blando Usado', fecha: 'Nov 18', hora: '09:15', owner: 'Coleccionista Privado' },
  { id: '4', categoryId: 3, imageSrc: 'https://picsum.photos/seed/f1_4/400/200', title: 'Volante Ferrari F2004 (Schumacher)', fecha: 'Nov 20', hora: '18:00', owner: 'Jean Todt' },
  { id: '5', categoryId: 2, imageSrc: 'https://picsum.photos/seed/f1_5/400/200', title: 'Mono de Charles Leclerc 2023', fecha: 'Nov 22', hora: '11:45', owner: 'Scuderia Ferrari' },
  { id: '6', categoryId: 1, imageSrc: 'https://picsum.photos/seed/f1_6/400/200', title: 'Gorra firmada por Franco Colapinto', fecha: 'Nov 25', hora: '16:20', owner: 'Williams Racing' },
  { id: '7', categoryId: 3, imageSrc: 'https://picsum.photos/seed/f1_7/400/200', title: 'Alerón Trasero Red Bull RB19', fecha: 'Dic 01', hora: '20:00', owner: 'Christian Horner' },
  { id: '8', categoryId: 2, imageSrc: 'https://picsum.photos/seed/f1_8/400/200', title: 'Trofeo GP de Mónaco 2018', fecha: 'Dic 05', hora: '13:00', owner: 'Daniel Ricciardo' },
  { id: '9', categoryId: 1, imageSrc: 'https://picsum.photos/seed/f1_9/400/200', title: 'Buzo de Mecánico McLaren', fecha: 'Dic 08', hora: '10:30', owner: 'Zak Brown' },
  { id: '10', categoryId: 3, imageSrc: 'https://picsum.photos/seed/f1_10/400/200', title: 'Motor Renault V10 (2005)', fecha: 'Dic 12', hora: '15:00', owner: 'Flavio Briatore' },
  { id: '11', categoryId: 2, imageSrc: 'https://picsum.photos/seed/f1_11/400/200', title: 'Botas de Fernando Alonso', fecha: 'Dic 15', hora: '09:00', owner: 'Aston Martin F1' },
  { id: '12', categoryId: 1, imageSrc: 'https://picsum.photos/seed/f1_12/400/200', title: 'Radio de Kimi Räikkönen ("Leave me alone")', fecha: 'Dic 18', hora: '17:30', owner: 'Sauber Motorsport' },
  { id: '13', categoryId: 3, imageSrc: 'https://picsum.photos/seed/f1_13/400/200', title: 'Chasis Williams FW14B', fecha: 'Ene 10', hora: '12:00', owner: 'Sir Frank Estate' },
  { id: '14', categoryId: 2, imageSrc: 'https://picsum.photos/seed/f1_14/400/200', title: 'Entrada VIP Paddock Club 2026', fecha: 'Ene 15', hora: '08:00', owner: 'FIA' },
  { id: '15', categoryId: 1, imageSrc: 'https://picsum.photos/seed/f1_15/400/200', title: 'Taza rota de Toto Wolff', fecha: 'Ene 20', hora: '22:00', owner: 'Toto Wolff' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const categorias = ['Todas', 'Silver', 'Gold', 'Platinum'];

  const renderItem = ({ item }: { item: AuctionItem }) => (
    <Auction 
      categoryId={item.categoryId}
      imageSrc={item.imageSrc}
      title={item.title}
      fecha={item.fecha}
      hora={item.hora}
      owner={item.owner}
    />
  );

  return (
    // 1. Centramos todo el contenido de la pantalla desde el padre principal
    <SafeAreaView className="flex-1 bg-[#14191C] items-center">
      
      {/* 2. ÚNICA COLUMNA: Le damos un ancho fijo del 90% (sin padding). 
          Todo lo que esté acá adentro va a estar perfectamente alineado. */}
      <View className="w-[90%] flex-1 pt-4">
        
        <View className="gap-y-5">
          {/* Buscador alineado al 90% */}
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar subastas, items, categorías" 
          />

          {/* 3. FILTROS EN EL MEDIO: Sacamos el ScrollView. 
              Usamos flex-row y justify-center para que queden centrados en la pantalla. */}
          <View className="flex-row justify-center gap-x-3 w-full">
            {categorias.map((cat) => (
              <FilterButton 
                key={cat}
                label={cat}
                isActive={filtroActivo === cat}
                onPress={() => setFiltroActivo(cat)}
              />
            ))}
          </View>
        </View>
        
        {/* 4. LISTA ALINEADA: Como está adentro del View del 90%, 
            los bordes de las tarjetas van a coincidir milimétricamente con los bordes del buscador */}
        <View className="flex-1 w-full mt-6">
          <FlatList
            data={f1AuctionsData} 
            keyExtractor={(item) => item.id} 
            renderItem={renderItem} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>

      </View>

    </SafeAreaView>
  );
}