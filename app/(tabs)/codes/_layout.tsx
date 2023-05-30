import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, Button } from "react-native-paper";

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
          presentation: "modal",
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
          presentation: "modal",
          headerTitle: "Create Code",
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <MaterialCommunityIcons name="close" color="white" size={28} />
              )}
            />
          ),
          headerRight: () => (
            <Button
              mode="text"
              onPress={() => router.push("/codes")}
              labelStyle={{ fontSize: 16, color: "#fff" }}
            >
              Clear
            </Button>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
