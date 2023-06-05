import { useState } from "react";

import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Button, Snackbar, Text, Appbar } from "react-native-paper";

import { Stack, useNavigation, useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { createCode } from "../../store/librarySlice";
import { selectAccount } from "../../store/accountSlice";

import medias from "../../data/medias";

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
    if (selectedMedias.size === 0) {
      onToggleSnackBar();
    } else {
      selectedMedias.forEach((media, idx) => {
        codeAccounts.push(
          media + ":" + enabledAccounts.find((acc) => acc.id === media).username
        );
      });
      codeAccounts.sort();
      dispatch(createCode(codeAccounts));
      setSelectedMedias(new Set());
      router.back();
    }
  };

  const renderItem = ({ item }) => {
    const media = medias[item.id];
    const mediaColor = media.color;
    const mediaName = media.icon;
    const mediaId = item.id;
    const isMediaSelected = selectedMedias.has(mediaId);
    return (
      <View style={{ padding: 10 }}>
        <IconButton
          mode="contained"
          icon={() => (
            <FontAwesome5
              color={isMediaSelected ? "#fff" : "#212121"}
              name={mediaName}
              size={32}
            />
          )}
          size={45}
          containerColor={isMediaSelected ? mediaColor : "#F2F2F2"}
          onPress={() => {
            if (selectedMedias.size >= 3 && !isMediaSelected) {
              onToggleSnackBar();
            } else if (isMediaSelected) {
              selectedMedias.delete(mediaId);
              setSelectedMedias(new Set(selectedMedias));
            } else {
              setSelectedMedias(new Set(selectedMedias.add(mediaId)));
            }
          }}
          selected={isMediaSelected}
          accessibilityLabel={mediaName}
        />
      </View>
    );
  };
  const _goBack = () => router.back();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          title="Create Code"
          titleStyle={{ fontWeight: "700" }}
        />
      </Appbar.Header>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "Create Code",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => (
                <Ionicons color="#212121" name="chevron-back" size={32} />
              )}
            />
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
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
            mode="contained"
            uppercase={true}
            onPress={handleCreateCode}
            labelStyle={{ fontWeight: "bold", fontSize: 22, paddingTop: 5 }}
            contentStyle={{ margin: 10 }}
            style={{
              marginBottom: 50,
              backgroundColor:
                selectedMedias.size === 0 ? "#D9DAD8" : "#5A3377",
              width: 300,
              borderRadius: 90,
            }}
            disabled={selectedMedias.size === 0}
          >
            Create
          </Button>
        )}
      </View>
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({
  snackbar: {
    color: "#212121",
    fontWeight: 700,
    marginBottom: 100,
  },
});
