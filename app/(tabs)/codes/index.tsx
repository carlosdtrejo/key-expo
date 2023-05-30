import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectLibrary } from "../../../store/librarySlice";
import medias from "../../../data/medias";

const renderItem = (item: any, index: any) => (
  <Link href={`/list/${index}`} asChild>
    <Pressable style={styles.itemContainer}>
      <View style={styles.card}>
        <FontAwesome5 name="qrcode" size={52} color="#fff" />
        <View style={styles.accounts}>
          {item.map((acc, idx) => (
            <FontAwesome5
              key={idx}
              name={medias[acc.media].icon}
              size={28}
              color={medias[acc.media].color}
            />
          ))}
        </View>
      </View>
    </Pressable>
  </Link>
);

export default function HomePage() {
  const router = useRouter();

  const library = useSelector(selectLibrary);

  console.log("LIBRARY", library);

  return (
    <View style={styles.container}>
      <FlatList
        data={library}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/codes/create")}
        label="Create"
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    width: "100%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#212121",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
  },
  card: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
  },
  accounts: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#212121",
  },
});
