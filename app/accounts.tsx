import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Divider,
  Text,
  IconButton,
  Appbar,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import { Stack, useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { enable, disable, selectAccount } from "../store/accountSlice";

import medias from "../data/medias";

type AccountProps = {
  account: {
    id: string;
    username: string;
    enabled: boolean;
  };
};

const Account = ({ account }: AccountProps) => {
  const router = useRouter();

  const [username, setUsername] = useState(account?.username || "");

  const dispatch = useDispatch();

  const onChangeUsername = (username) => {
    setUsername(username);
    if (username === "") {
      dispatch(disable({ id: account.id, username: username }));
    } else {
      dispatch(enable({ id: account.id, username: username }));
    }
  };

  const icon = medias[account.id].icon;
  const color = medias[account.id].color;

  return (
    <View style={styles.accountContainer}>
      
      <FontAwesome5
        color={username ? color : "#212121"}
        name={icon}
        size={25}
      />
      <TextInput
        style={{
          flex: 1,
          marginHorizontal: 20,
          width: "100%",
          backgroundColor: "#fff",
          fontWeight: username ? "700" : "400",
        }}
        placeholder="username"
        value={username}
        onChangeText={(username) => onChangeUsername(username)}
        activeUnderlineColor={color}
        textColor="#212121"
        placeholderTextColor={"#D9DAD8"}
        underlineColor={"transparent"}
      />
    </View>
  );
};

const AccountsPage = () => {
  const router = useRouter();
  const accounts = useSelector(selectAccount);

  const _goBack = () => router.back();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Accounts" titleStyle={{ fontWeight: "700" }} />
      </Appbar.Header>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "Accounts",
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
          }}
        >
          <KeyboardAwareFlatList
            removeClippedSubviews={false}
            keyExtractor={({ id }) => id}
            data={accounts}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => <Account account={item} />}
            style={{ marginLeft: 15 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/socials")}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accountContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 95,
    backgroundColor: "#5A3377",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
  },
});

export default AccountsPage;
