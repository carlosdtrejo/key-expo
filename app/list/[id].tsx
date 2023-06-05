import React, { useRef, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { selectLibrary } from "../../store/librarySlice";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import {
  IconButton,
  Button,
  Dialog,
  Appbar,
  Chip,
  Card,
} from "react-native-paper";
import { deleteCode } from "../../store/librarySlice";

import medias from "../../data/medias";

import { useRouter } from "expo-router";

const DetailsPage = () => {
  const { id } = useSearchParams();
  const router = useRouter();

  const library = useSelector(selectLibrary);
  const code = library[Number(id)];
  const dispatch = useDispatch();

  const _goBack = () => router.back();

  const _delete = () => {
    dispatch(deleteCode(id));
    router.back();
  };

  const viewShot = useRef();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [textDialog, setDialog] = useState("");

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
    return `@${value[1]}`;
  };
  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="My Code" titleStyle={{ fontWeight: "700" }} />
        <Appbar.Action icon="delete" color="#5A3377" onPress={_delete} />
      </Appbar.Header>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
          {/* <Card
            style={{
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.34,
              shadowRadius: 12,
              marginTop: 25,
              marginHorizontal: 100,
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 30,
            }}
          >
            <Card.Content>
              
            </Card.Content>
          </Card> */}
          <View
            style={{
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.34,
              shadowRadius: 12,
              paddingBottom: 40,
              marginHorizontal: 100,
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 30,
            }}
          >
            <View style={styles.qrcode}>
              <QRCode size={200} value={finalQrCodeValue} />
            </View>
            <View style={styles.accounts}>
              {code.map((acc, idx) => (
                <View key={idx} style={styles.accountContent}>
                  <Chip
                    mode="outlined"
                    disabled={true}
                    icon={() => (
                      <FontAwesome5
                        name={getIcon(acc)}
                        size={30}
                        color={getColor(acc)}
                      />
                    )}
                    onPress={() => console.log("Pressed")}
                  >
                    {getUsername(acc)}
                  </Chip>
                </View>
              ))}
            </View>
          </View>
        </ViewShot>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Success!</Dialog.Title>
          <Dialog.Content>
            <Text>{textDialog}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        <View style={styles.actions}>
          <IconButton
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                color="#212121"
                name="export-variant"
                size={24}
              />
            )}
            containerColor="#F2F2F2"
            size={40}
            onPress={onSharePressed}
          />
          <IconButton
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                color="#212121"
                name="download"
                size={24}
              />
            )}
            containerColor="#F2F2F2"
            size={40}
            onPress={onDownloadPressed}
          />
        </View>
      </View>
    </>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrcode: {
    margin: 80,
  },
  accounts: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  accountContent: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "#212121",
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
