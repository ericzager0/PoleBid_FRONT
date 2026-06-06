import { Text } from "react-native";

type Props = {
  message: string;
};

export default function Message({ message }: Props) {
  return <Text className="text-white text-5xl font-semibold">{message}</Text>;
}
