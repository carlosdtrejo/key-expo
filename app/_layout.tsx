import React, { useState, useEffect, useRef } from "react";

import { Platform, Linking } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider, Portal } from "react-native-paper";

import { Stack } from "expo-router";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";

import medias from "../data/medias";

const theme = {
  dark: false,
  colors: {
    primary: "rgb(18,18,18)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(18,18,18)",
    border: "rgb(18,18,18)",
    notification: "rgb(255, 69, 58)",
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const StackLayout = () => {

  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content.data.url);
        const notificationURL = response.notification.request.content.data.url;
        Linking.openURL(notificationURL);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={theme}>
          <PaperProvider>
            <Portal>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </Portal>
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export async function schedulePushNotification(data) {
  const array = data.split("?");
  for (const item of array) {
    const [account, username] = item.split(":");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Key",
        body: `Follow ${username} on ${medias[account].name}`,
        data: { url: medias[account].url + username },
      },
      trigger: { seconds: 1 },
    });
  }
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default StackLayout;
