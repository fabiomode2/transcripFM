import { StyleSheet, Button } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

import { ScrollView } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { CalendarEvent } from "@/components/Calendar_Event";
import { CalendarEventProps } from "@/components/types";

export default function index() {
  return (
    <View style={styles.scroll_container}>
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

      <ScrollView
        contentContainerStyle={styles.topdown_container}
        style={styles.scroll_container}
      >
        <View style={styles.topdown_container}>
          <AntDesign name="calendar" size={32} />
          <Text style={styles.text_medium}>Próximos eventos</Text>
        </View>
        <View style={styles.vspace} />

        <CalendarEvent text="Tarea 1 Cálculo" date={new Date()} />
        <CalendarEvent text="Tarea 1 Cálculo" date={new Date()} />
        <CalendarEvent text="Tarea 1 Cálculo" date={new Date()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll_container: {
    flex: 1,
  },
  vspace: {
    height: 20,
  },
  hcontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    padding: 20,
  },
  topdown_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 50,
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
    fontFamily: "SpaceMono",
  },
  pad20: {
    padding: 20,
  },
});
