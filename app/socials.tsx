import { Stack, useRouter } from "expo-router";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectAccount } from "../store/accountSlice";
import medias from "../data/medias";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Divider, Text, IconButton } from "react-native-paper";

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
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Socials",
          headerShadowVisible: false,
          headerBackTitle: "Codes",
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon={() => <Ionicons color="#212121" name="chevron-back" size={32} />}
            />
          ),
          headerRight: () => (
            <IconButton
              onPress={() => router.push("/accounts")}
              icon={() => <Ionicons color="#212121" name="add-circle" size={32} />}
            />
          ),
        }}
      />
      <FlatList
        keyExtractor={({ id }) => id}
        data={enabledAccounts}
        renderItem={({ item }) => <Account account={item} />}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

export default socials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  accountContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
  },
});
