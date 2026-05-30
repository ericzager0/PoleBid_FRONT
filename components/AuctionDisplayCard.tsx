import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface AuctionDisplayCardProps {
  money: boolean;
  initialTime?: number; // En segundos
  amount?: number;
}

export default function AuctionDisplayCard({ 
  money, 
  initialTime = 0, 
  amount = 0 
}: AuctionDisplayCardProps) {
  
  const safeInitialTime = Math.max(0, initialTime);
  const [timeLeft, setTimeLeft] = useState(safeInitialTime);

  useEffect(() => {
    if (money) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [money]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatMoney = (value: number) => {
    return '$' + value.toLocaleString('en-US');
  };

  return (
    <View className="w-full bg-[#1C1D21] rounded-xl py-4 items-center justify-center my-2 shadow-sm">
      <Text 
        className={`text-xl font-bold tracking-wide mb-1 ${
          money ? 'text-[#DDAA33]' : 'text-white'
        }`}
      >
        {money ? 'Puja actual más alta' : 'Tiempo Restante'}
      </Text>
      
      <Text 
        className={`text-3xl font-extrabold tracking-wider ${
          money ? 'text-[#DDAA33]' : 'text-white'
        }`}
      >
        {money ? formatMoney(amount) : formatTime(timeLeft)}
      </Text>
    </View>
  );
}