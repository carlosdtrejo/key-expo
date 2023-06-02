import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, Button } from "react-native-paper";
import { Platform } from "react-native";

const StackLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitleStyle: { fontSize: 20 },
        }}
      />
      <Stack.Screen
        name="scanner"
        options={{
          headerTitle: "",
          presentation: Platform.OS === "ios" ? "modal" : undefined,
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <MaterialCommunityIcons color="white" name="close" size={28} />
              )}
            />
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          presentation: Platform.OS === "ios" ? "modal" : undefined,
          headerTitle: "Create Code",
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <MaterialCommunityIcons name="close" color="white" size={28} />
              )}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
