import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { FAB, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectLibrary } from "../../../store/librarySlice";
import medias from "../../../data/medias";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import { deleteCode } from "../../../store/librarySlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Code = {
  media: string;
  username: string;
  value: string;
}[];

export default function HomePage() {
  const router = useRouter();
  let prevOpenedRow;
  let refsArray: Array<any> = [];
  const library = useSelector(selectLibrary);

  console.log("LIBRARY", library);

  const ListItem = ({ item, index }: { item: Code; index: number }) => {
    const dispatch = useDispatch();
    const rightSwipeActions = () => {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <IconButton
            icon={() => (
              <MaterialCommunityIcons color="red" name="delete" size={30} />
            )}
            size={50}
            onPress={() => {
              dispatch(deleteCode({ index }));
              closeRow(index);
            }}
          />
        </View>
      );
    };

    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== refsArray[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = refsArray[index];
    };

    return (
      <Swipeable
        ref={(ref) => (refsArray[index] = ref)}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={rightSwipeActions}
      >
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
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={library}
        keyExtractor={(_item, index) => `code ${index}`}
        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
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
  },
  card: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
  },
  cardDelete: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
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
