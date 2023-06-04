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
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          presentation: Platform.OS === "ios" ? "modal" : undefined,
          headerTitle: "Create Code",
          headerShown: false,
          headerTransparent: true,
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <MaterialCommunityIcons
                  name="close"
                  color="#212121"
                  size={28}
                />
              )}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
