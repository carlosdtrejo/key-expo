import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const results = await BarCodeScanner.scanFromURLAsync(
        result.assets[0].uri
      );
      console.log(results[0].data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          // style={{ height: 400, width: 400 }}
        />
      </View>
      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
      <View style={styles.actions}>
        <IconButton
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons color="#fff" name="image" size={38} />
          )}
          onPress={pickImage}
          containerColor="#212121"
          size={50}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 275,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 200,
  },
  actions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Button, Image } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import MaskedView from "@react-native-masked-view/masked-view";
// import { IconButton, MD3Colors } from "react-native-paper";
// import { FontAwesome5 } from "@expo/vector-icons";

// interface MaskedViewFix extends React.Component {}
// const MaskedViewed: any = MaskedView as any as { new (): MaskedViewFix };

// const scanner = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <MaskedViewed
//         style={styles.maskedView}
//         maskElement={
//           <View style={styles.maskWrapper}>
//             <View style={styles.mask} />
//             <View style={styles.actions}>
//               <IconButton
//                 mode="contained"
//                 icon="camera"
//                 iconColor="white"
//                 size={60}
//                 onPress={() => console.log("Pressed")}
//               />
//               <IconButton
//                 mode="contained"
//                 icon="camera"
//                 iconColor="white"
//                 size={60}
//                 onPress={() => console.log("Pressed")}
//               />
//             </View>
//             {/* <Image
//               source={require("../../../assets/rectangle.png")}
//               style={styles.mask}
//             /> */}
//           </View>
//         }
//       >
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//         {scanned && (
//           <Button
//             title={"Tap to Scan Again"}
//             onPress={() => setScanned(false)}
//           />
//         )}
//         <View style={styles.actions}>
//           <IconButton
//             icon={() => <FontAwesome5 color="#fff" name="camera" size={28} />}
//             onPress={() => console.log("Pressed")}
//           />
//           <IconButton
//             icon={() => <FontAwesome5 color="#fff" name="camera" size={28} />}
//             iconColor="white"
//             size={60}
//             onPress={() => console.log("Pressed")}
//           />
//         </View>
//       </MaskedViewed>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgb(33,33,33)",
//   },
//   maskedView: {
//     flex: 1,
//     flexDirection: "row",
//     height: "100%",
//   },
//   maskWrapper: {
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   mask: {
//     width: 300,
//     height: 300,
//     marginTop: 100,
//     borderRadius: 10,
//     backgroundColor: "#000",
//   },
//   actions: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 80,
//     // backgroundColor: "red"
//   },
// });

// export default scanner;
