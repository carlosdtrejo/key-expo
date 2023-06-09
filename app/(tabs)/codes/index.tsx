import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Divider } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Link } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { selectLibrary, deleteCode } from "../../../store/librarySlice";

import medias from "../../../data/medias";

type Code = {
  media: string;
  username: string;
  value: string;
}[];

interface ListItemProps {
  item: Code;
  index: number;
};

export default function HomePage() {
  // Delete operation
  let prevOpenedRow;
  let refsArray: Array<any> = [];

  // State of Codes list (library)
  const library = useSelector(selectLibrary);

  const ListItem = ({ item, index }: ListItemProps) => {
    const dispatch = useDispatch();
    const RightSwipeActions = () => {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Ionicons name="trash" size={32} color="#fff" />
        </View>
      );
    };

    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== refsArray[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = refsArray[index];
    };

    const swipeFromRightOpen = () => {
      dispatch(deleteCode({index}));
      closeRow(index);
    };

    const getIcon = (item) => {
      const value = item.split(":");
      return medias[value[0]].icon;
    };
    const getColor = (item) => {
      const value = item.split(":");
      return medias[value[0]].color;
    };
    return (
      <Swipeable
        ref={(ref) => (refsArray[index] = ref)}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={RightSwipeActions}
        onSwipeableRightOpen={swipeFromRightOpen}
      >
        <Link href={`/list/${index}`} asChild>
          <Pressable style={styles.itemContainer}>
            <View style={styles.card}>
              <Ionicons name="qr-code" size={52} color="#212121" />
              <View style={styles.accounts}>
                {item.map((acc, idx) => (
                  <FontAwesome5
                    key={idx}
                    name={getIcon(acc)}
                    size={28}
                    color={getColor(acc)}
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
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 4,
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
});
