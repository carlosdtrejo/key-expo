import { Tabs, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, Button } from "react-native-paper";
import { Platform } from "react-native";
export default () => {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="codes"
        options={{
          headerShown: true,
          tabBarShowLabel: true,
          tabBarLabel: "My Library",
          headerTitle: "Library",
          headerTitleAlign: "left",
          headerTitleStyle: { fontSize: 32 },
          headerRight: () => (
            <IconButton
              style={{ marginRight: 10 }}
              onPress={() =>
                Platform.OS === "ios"
                  ? router.push("/codes/scanner")
                  : router.push("/scanner")
              }
              icon={() => (
                <MaterialCommunityIcons
                  color="#fff"
                  name="camera-outline"
                  size={32}
                />
              )}
            />
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-multiple"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          tabBarShowLabel: true,
          tabBarLabel: "Accounts",
          headerTitle: "Accounts",
          headerTitleAlign: "left",
          headerTitleStyle: { fontSize: 32 },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              size={28}
              color={color}
            />
          ),
          headerRight: () => (
            <Button
              style={{ marginRight: 10 }}
              mode="text"
              onPress={() => router.push("/codes")}
              labelStyle={{ fontSize: 18, color: "#fff" }}
            >
              Done
            </Button>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          href: null,
          headerShown: true,
          headerTitle: "",
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
      <Tabs.Screen
        name="create"
        options={{
          href: null,
          headerShown: true,
          headerTitle: "Create Code",
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
    </Tabs>
  );
};
