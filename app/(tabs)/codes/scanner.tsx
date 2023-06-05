import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";

import { IconButton } from "react-native-paper";

import { useRouter } from "expo-router";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";

import MaskedView from "@react-native-masked-view/masked-view";

import { schedulePushNotification } from "../../../app/_layout";

export default function scanner() {
  const router = useRouter();

  interface MaskedViewFix extends React.Component {}
  const MaskedViewed: any = MaskedView as any as { new (): MaskedViewFix };

  const [hasPermission, setHasPermission] = useState(null);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    await schedulePushNotification(data);
    router.back();
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
    <MaskedViewed
      style={styles.maskedView}
      maskElement={
        <View style={styles.maskWrapper}>
          <View style={styles.mask} />
        </View>
      }
    >
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.barcodebox} />
        {Platform.OS === "ios" && (
          <View style={styles.actions}>
            <IconButton
              mode="contained"
              iconColor="#fff"
              icon="image"
              onPress={pickImage}
              containerColor="#rrggbbaa"
              size={42}
            />
          </View>
        )}
      </View>
    </MaskedViewed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 180,
  },
  maskedView: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
  maskWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  mask: {
    width: 300,
    height: 300,
    marginTop: 180,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  actions: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 50,
  },
});
