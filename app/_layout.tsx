import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider, Portal } from "react-native-paper";

const theme = {
  dark: false,
  colors: {
    primary: "rgb(18,18,18)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(18,18,18)",
    border: "rgb(18,18,18)",
    notification: "rgb(255, 69, 58)",
  },
};

const StackLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={theme}>
          <PaperProvider>
            <Portal>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </Portal>
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default StackLayout;
