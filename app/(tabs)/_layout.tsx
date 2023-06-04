import { Tabs, useRouter } from "expo-router";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { View } from "react-native";

export default () => {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="codes"
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarLabel: "My Codes",
          headerTitle: "Codes",
          headerTitleAlign: "left",
          headerTitleStyle: { fontSize: 32 },
          tabBarLabelStyle: { fontWeight: "700" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code" size={32} color={color} />
          ),
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#F2F2F2",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <IconButton
              onPress={() => router.push("/socials")}
              icon={() => (
                <Ionicons color="#212121" name="person-circle" size={38} />
              )}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "Create code",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "absolute",
                bottom: 0, // space from bottombar
                height: 68,
                width: 68,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onPress={() => router.push("/codes/create")}
                icon={() => (
                  <Ionicons color="#212121" name="add-circle" size={70} />
                )}
                size={90}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          headerShown: false,
          tabBarLabel: "Scanner",
          tabBarLabelStyle: { fontWeight: "700" },
          tabBarShowLabel: false,
          headerShadowVisible: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#F2F2F2",
            display: "none",
          },
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <Ionicons
                  color="#212121"
                  name="chevron-back-circle"
                  size={32}
                />
              )}
            />
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="camera-outline"
              size={32}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
