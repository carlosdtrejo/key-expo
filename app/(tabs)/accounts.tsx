import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Switch } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import medias from "../../data/medias";
import { enable, disable, selectAccount } from "../../store/accountSlice";

const Account = ({ account }) => {
  const [username, setUsername] = useState(account.username || "");
  const [isSwitchOn, toggleSwitch] = useState<boolean>(account.enabled);

  const dispatch = useDispatch();

  const icon = medias[account.id].icon;
  const color = medias[account.id].color;

  return (
    <View style={styles.accountContainer}>
      <FontAwesome5 color="#fff" name={icon} size={24} />
      <TextInput
        style={styles.textInput}
        placeholder="@username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        activeUnderlineColor={color}
        textColor="#fff"
      />
      <Switch
        style={styles.switch}
        value={isSwitchOn}
        disabled={username.length === 0}
        onValueChange={() => {
          toggleSwitch(!isSwitchOn);
          if (!isSwitchOn) {
            dispatch(enable({ id: account.id, username: username }));
          } else {
            dispatch(disable({ id: account.id, username: username }));
          }
        }}
        color={color}
      />
    </View>
  );
};

const AccountsPage = () => {
  const accounts = useSelector(selectAccount);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 15,
      }}
    >
      <FlatList
        keyExtractor={({ id }) => id}
        data={accounts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <Account account={item} />}
        style={{ paddingLeft: 15 }}
      />
    </View>
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
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    width: "100%",
    backgroundColor: "rgb(18,18,18)",
  },
  switch: {
    marginTop: 15,
    marginRight: 15,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

export default AccountsPage;
