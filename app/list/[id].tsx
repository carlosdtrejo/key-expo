import React, { useRef, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { selectLibrary } from "../../store/librarySlice";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import {
  IconButton,
  Button,
  Dialog,
  Portal,
  PaperProvider,
} from "react-native-paper";

import medias from "../../data/medias";

const DetailsPage = () => {
  const { id } = useSearchParams();

  const viewShot = useRef();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [textDialog, setDialog] = useState("");

  const library = useSelector(selectLibrary);
  const code = library[Number(id)];

  const allValues = [];

  code.forEach((item) => allValues.push(item));

  const finalQrCodeValue = allValues.join("?");

  const onDownloadPressed = async () => {
    try {
      const localUri = await captureRef(viewShot, {
        height: 440,
        quality: 1,
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          setDialog("You have successfully saved your code to photos.");
          showDialog();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSharePressed = async () => {
    try {
      const localUri = await captureRef(viewShot, {
        height: 440,
        quality: 1,
      });

      await Sharing.shareAsync("file://" + localUri);
      if (localUri) {
        setDialog("You have successfully shared your code.");
        showDialog();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getIcon = (item) => {
    const value = item.split(":");
    return medias[value[0]].icon;
  };
  const getColor = (item) => {
    const value = item.split(":");
    return medias[value[0]].color;
  };
  const getUsername = (item) => {
    const value = item.split(":");
    return value[1];
  };
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
          }}
        />
        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
          <View style={styles.qrcode}>
            <QRCode size={200} value={finalQrCodeValue} />
          </View>
          <View style={styles.accounts}>
            {code.map((acc, idx) => (
              <View key={idx} style={styles.accountContent}>
                <FontAwesome5
                  name={getIcon(acc)}
                  size={28}
                  color={getColor(acc)}
                />
                <Text style={styles.username}>{getUsername(acc)}</Text>
              </View>
            ))}
          </View>
        </ViewShot>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Success!</Dialog.Title>
            <Dialog.Content>
              <Text>{textDialog}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.actions}>
          <IconButton
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                color="#fff"
                name="export-variant"
                size={30}
              />
            )}
            containerColor="#212121"
            size={50}
            onPress={onSharePressed}
          />
          <IconButton
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons color="#fff" name="download" size={30} />
            )}
            containerColor="#212121"
            size={50}
            onPress={onDownloadPressed}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  qrcode: {
    margin: 80,
  },
  accounts: {
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  accountContent: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
});
