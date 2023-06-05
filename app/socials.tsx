import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, Appbar } from "react-native-paper";
import { useSelector } from "react-redux";

import { Stack, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

import { selectAccount } from "../store/accountSlice";

import medias from "../data/medias";

type AccountProps = {
  account: {
    id: string;
    username: string;
    enabled: boolean;
  };
};

const Account = ({ account }: AccountProps) => {
  const icon = medias[account.id].icon;
  const color = medias[account.id].color;

  return (
    <View style={styles.accountContainer}>
      <FontAwesome5 color={color} name={icon} size={32} />
      <Text
        style={{
          fontWeight: "700",
          marginLeft: 30,
          color: "grey",
        }}
        variant="titleMedium"
      >
        {`@${account.username}`}
      </Text>
    </View>
  );
};

const socials = () => {
  const router = useRouter();

  const accounts = useSelector(selectAccount);
  const enabledAccounts = accounts.filter(
    (account) => account.enabled === true
  );
  const _goBack = () => router.back();
  const _goToAccounts = () => router.push("/accounts");

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Socials" titleStyle={{ fontWeight: "700" }} />
        <Appbar.Action
          icon="plus-circle"
          color="#5A3377"
          onPress={_goToAccounts}
          size={36}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <FlatList
          keyExtractor={({ id }) => id}
          data={enabledAccounts}
          renderItem={({ item }) => <Account account={item} />}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </>
  );
};

export default socials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  accountContainer: {
    marginLeft: 20,
    marginVertical: 20,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
});
