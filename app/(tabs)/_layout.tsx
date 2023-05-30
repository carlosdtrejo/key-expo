import { Tabs, useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, Button } from "react-native-paper";

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
          headerTitleStyle: { fontSize: 24 },
          headerRight: () => (
            <IconButton
              style={{ marginRight: 10 }}
              onPress={() => router.push("/codes/scanner")}
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
          headerTitleStyle: { fontSize: 24 },
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
    </Tabs>
  );
};
