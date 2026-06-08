import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface KeyboardWrapperProps {
  children: React.ReactNode;
  offset?: number; 
}

export default function KeyboardWrapper({ children, offset = 0 }: KeyboardWrapperProps) {
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      // LA SOLUCIÓN: Forzamos a Android a reducir la altura ('height') en lugar de no hacer nada
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Agregamos un pequeño offset para compensar la barra de estado en Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? offset : offset + 25}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" 
        bounces={false} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}