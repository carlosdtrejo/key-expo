import { Platform, View } from "react-native";

import { IconButton } from "react-native-paper";

import { Tabs, useRouter } from "expo-router";
import {
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

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
          headerTitleStyle: { fontSize: 34 },
          tabBarLabelStyle: { fontWeight: "700", fontSize: 10 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code" size={32} color={color} />
          ),
          tabBarStyle: {
            borderTopColor: "#F2F2F2",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.74,
            shadowRadius: 14,
            elevation: 24,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            padding: 10,
            width: "100%",
            height: 90,
            zIndex: 0,
            justifyContent: "center",
            alignItems: "center",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <IconButton
              onPress={() => router.push("/socials")}
              icon="account-circle"
              iconColor="#5A3377"
              size={38}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "Create Code",
          headerShown: false,
          tabBarLabel: "Create",
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: "red", fontWeight: "700", fontSize: 14 },
          tabBarStyle: {
            borderTopColor: "#F2F2F2",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.74,
            shadowRadius: 14,
            elevation: 24,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            padding: 10,
            width: "100%",
            height: 90,
            zIndex: 0,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "absolute",
                bottom: 0, // space from bottombar
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                mode="contained"
                containerColor="#5A3377"
                onPress={() => router.push(Platform.OS === "ios" ? "/codes/create" : "/create")}
                iconColor="#fff"
                icon="plus"
                size={60}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          tabBarLabel: "Scanner",
          tabBarLabelStyle: { fontWeight: "700", fontSize: 10 },
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
              icon="chevron-left"
              iconColor="#fff"
              containerColor="#212121"
              size={28}
            />
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="camera-outline"
              size={38}
              color={color}
              onPress={() => router.push('/codes/scanner')}
            />
          ),
        }}
      />
    </Tabs>
  );
};
