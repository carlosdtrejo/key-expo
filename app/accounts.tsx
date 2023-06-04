import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { TextInput, Divider, Text, IconButton } from "react-native-paper";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import medias from "../data/medias";
import { enable, disable, selectAccount } from "../store/accountSlice";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Stack, useRouter } from "expo-router";

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
      <Stack.Screen
        options={{
          headerShown: true,
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
        placeholder="@username"
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
  return (
    <>
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
            style={{ marginHorizontal: 15 }}
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
    height: 100,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 30,
    fontWeight: "700",
  },
});

export default AccountsPage;
