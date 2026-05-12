import { View } from "react-native";
import { Button } from "../components/Button";
import Message from "../components/Message";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Message message="Descubrí oportunidades y empezá a pujar." />
      <Button label="Pujar" onPress={() => {}} />
    </View>
  );
}
