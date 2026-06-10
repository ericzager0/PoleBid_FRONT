import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ConfirmButtonProps extends TouchableOpacityProps {
  isAccepted: boolean;
  label?: string; 
}

export default function ConfirmButton({
  isAccepted,
  label,
  className = "",
  ...props
}: ConfirmButtonProps) {
  const bgStyle = isAccepted 
    ? "bg-[#4ADE80]/15 border border-[#4ADE80]/40" 
    : "bg-[#E83C3C]/15 border border-[#E83C3C]/40"; 

  const textStyle = isAccepted 
    ? "text-[#4ADE80]" 
    : "text-[#E83C3C]";

  const defaultText = isAccepted ? "Aceptar" : "Rechazar";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex-1 items-center justify-center rounded-full py-4 ${bgStyle} ${className}`}
      {...props}
    >
      <Text className={`text-lg font-bold tracking-wider ${textStyle}`}>
        {label || defaultText}
      </Text>
    </TouchableOpacity>
  );
}