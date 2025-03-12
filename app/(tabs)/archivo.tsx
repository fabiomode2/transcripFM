import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import { Button } from "react-native";
import { tintColorDark, tintColorLight } from "@/constants/Colors";
import { ColorValue, useColorScheme } from "react-native";

export default function archivo() {
  const MAINCOLOR: ColorValue =
    useColorScheme() == "light" ? tintColorDark : tintColorLight;
  return (
    <View style={styles.container}>
      <Button title="Crear Materia" color={MAINCOLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
