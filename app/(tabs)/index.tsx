import { StyleSheet, Button } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function index() {
  return (
    <View style={styles.container}>
      <View style={styles.hcontainer}>
        <Link href="/grabar">
          <AntDesign name="plus" size={24} />
          <Text style={styles.text_medium}> Subir audio </Text>
        </Link>

        <Link href="/archivo">
          <AntDesign name="folder1" size={24} />
          <Text style={styles.text_medium}> Ver archivo </Text>
        </Link>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <AntDesign name="calendar" size={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hcontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    padding: 20,
    maxHeight: "10%",
    position: "absolute",
    top: 0,
  },

  button1: {
    width: "40%", // Aproximadamente la mitad de la pantalla con márgenes
    aspectRatio: 1, // Hace que sea un cuadrado
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  text_medium: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Ubuntu-Regular",
  },
  topView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
