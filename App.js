import React, { useRef } from "react";

// eslint-disable-next-line
import { extendTheme, NativeBaseProvider } from "native-base";

import { AppProvider } from "./src/contexts/AppContext";
import { createNavigationContainerRef } from "@react-navigation/native";

import { DrawerLayoutAndroid } from "react-native";

import DrawerLayout from "./src/components/DrawerLayout";
import MainScreen from "./src/screens/MainScreen";

export default function App() {
  const drawer = useRef(null);

  const navigationRef = createNavigationContainerRef();

  const theme = extendTheme({
    colors: {
      primary: {
        50: "#FFF5F5",
        100: "#FED7D7",
        200: "#FEB2B2",
        300: "#FC8181",
        400: "#F56565",
        500: "#E53E3E",
        600: "#C53030",
        700: "#9B2C2C",
        800: "#822727",
        900: "#63171B",
      },
    },
    config: {
      initialColorMode: "light",
    },
  });

  return (
    <AppProvider>
      <NativeBaseProvider theme={theme}>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition={"left"}
          renderNavigationView={(props) => (
            <DrawerLayout
              {...props}
              navigation={navigationRef}
              drawer={drawer}
            />
          )}
        >
          <MainScreen navigationRef={navigationRef} drawer={drawer} />
        </DrawerLayoutAndroid>
      </NativeBaseProvider>
    </AppProvider>
  );
}
