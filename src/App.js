import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MainScreen from "./Components/MainScreen";

function App() {
  return (
    <View style={styles.app}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
