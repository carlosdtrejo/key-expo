import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import store from "../store/store";
import { Provider } from "react-redux";

const theme = {
  dark: true,
  colors: {
    primary: "rgb(255, 255, 255)",
    background: "rgb(18,18,18)",
    card: "rgb(18,18,18)",
    text: "rgb(255, 255, 255)",
    border: "rgb(18,18,18)",
    notification: "rgb(255, 69, 58)",
  },
};

const StackLayout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default StackLayout;
