import { View, Text, Button } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const DetailsPage = () => {
  const { id } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
      <Text>My Details for: {id}</Text>
      <QRCode value="http://awesome.link.qr" />
    </View>
  );
};

export default DetailsPage;
