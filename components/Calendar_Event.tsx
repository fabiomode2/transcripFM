import { Text, TextProps, View } from "./Themed";
import { StyleSheet } from "react-native";
import { CalendarEventProps } from "./types";

export function CalendarEvent({ text, date }: CalendarEventProps) {
  return (
    <View style={styles.pad20}>
      <Text style={[styles.text_medium, { fontFamily: "Verdana" }]}>
        {date.toDateString() + " - " + text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text_medium: {
    fontSize: 16,
    textAlign: "center",
  },
  pad20: {
    padding: 20,
  },
});
