import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import medias from "../../data/medias";
import { Subscription } from "expo-modules-core";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function scanner() {
  const router = useRouter();

  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();

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

  const handleBarCodeScanned = async ({ data }) => {
    // router.back()
    setScanned(true);
    await schedulePushNotification(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const results = await BarCodeScanner.scanFromURLAsync(
        result.assets[0].uri
      );
      handleBarCodeScanned({ data: results[0].data });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 60, left: 15 }}>
        <IconButton
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons color="#fff" name="chevron-left" size={30} />
          )}
          onPress={() => router.back()}
          containerColor="#212121"
          size={24}
        />
      </View>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {/* {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )} */}
      {Platform.OS === "ios" && (
        <View style={styles.actions}>
          <IconButton
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons color="#212121" name="image" size={28} />
            )}
            onPress={pickImage}
            containerColor="#F2F2F2"
            size={40}
          />
        </View>
      )}
    </View>
  );
}

async function schedulePushNotification(data) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0.2, 0.2, 0.2, 0.2)"
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 275,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "white",
  },
  actions: {
    marginTop: 100,
  },
});
