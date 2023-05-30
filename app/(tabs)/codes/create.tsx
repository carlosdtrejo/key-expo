import { View, FlatList, StyleSheet } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { IconButton, Button, Snackbar, Text } from "react-native-paper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../store/accountSlice";
import medias from "../../../data/medias";

import {
  createCode,
  deleteCode,
  selectLibrary,
} from "../../../store/librarySlice";

const Modal = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const dispatch = useDispatch();

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page.
  const isPresented = navigation.canGoBack();

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [selectedMedias, setSelectedMedias] = useState(new Set());

  const accounts = useSelector(selectAccount);
  const enabledAccounts = accounts.filter(
    (account) => account.enabled === true
  );

  const handleCreateCode = () => {
    const codeAccounts = [];
    console.log("selectedMedias", selectedMedias);
    if (selectedMedias.size === 0) {
      console.log("TESTING");
      onToggleSnackBar();
    } else {
      selectedMedias.forEach((media, idx) => {
        codeAccounts.push({
          media: media,
          username: enabledAccounts
            .find((acc) => acc.id === media)
            .username.toLowerCase(),
          value:
            media +
            ":" +
            enabledAccounts
              .find((acc) => acc.id === media)
              .username.toLowerCase(),
        });
      });
      dispatch(createCode(codeAccounts));
      router.back();
    }
  };

  const renderItem = ({ item }) => {
    const media = medias[item.id];
    const mediaColor = media.color;
    const mediaName = media.icon;
    const mediaId = item.id;
    return (
      <View style={{ padding: 10 }}>
        <IconButton
          mode="contained"
          icon={() => <FontAwesome5 color="#fff" name={mediaName} size={28} />}
          size={40}
          containerColor={selectedMedias.has(mediaId) ? mediaColor : "#212121"}
          onPress={() => {
            if (selectedMedias.size >= 3 && !selectedMedias.has(mediaId)) {
              onToggleSnackBar();
            } else if (selectedMedias.has(mediaId)) {
              selectedMedias.delete(mediaId);
              setSelectedMedias(new Set(selectedMedias));
            } else {
              setSelectedMedias(new Set(selectedMedias.add(mediaId)));
            }
          }}
          selected={selectedMedias.has(mediaId)}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <FlatList
        keyExtractor={({ id }) => id}
        data={enabledAccounts}
        renderItem={renderItem}
        horizontal={false}
        numColumns={4}
        ItemSeparatorComponent={() => <View style={{ height: 50 }} />}
      />
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
          textColor: "#fff",
        }}
        duration={4000}
      >
        {selectedMedias.size === 0 && (
          <Text style={{ color: "#fff" }}>
            You must select at least one account.
          </Text>
        )}
        {selectedMedias.size >= 3 && (
          <Text style={{ color: "#fff" }}>
            You can only select up to 3 accounts.
          </Text>
        )}
      </Snackbar>
      {enabledAccounts.size !== 0 && (
        <Button
          icon="qrcode"
          mode="contained"
          uppercase={true}
          onPress={handleCreateCode}
          labelStyle={{ fontWeight: "bold", fontSize: 22, paddingTop: 5 }}
          contentStyle={{ margin: 10, flexDirection: "row-reverse" }}
          style={{
            marginBottom: 50,
            backgroundColor: "#212121",
            width: 300,
            borderRadius: 90,
          }}
        >
          Create
        </Button>
      )}
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  snackbar: {
    color: "#fff",
    fontWeight: 700,
    marginBottom: 100,
  },
});
