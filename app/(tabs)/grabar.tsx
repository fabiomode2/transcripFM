import { Button, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import * as DP from "expo-document-picker";
import { useState } from "react";
import {} from "@/components/API";

import { uploadAudio } from "../utils/funcionesFB";

export default function grabar() {
  const [t, st] = useState<string>("");

  const pickAudio = async () => {
    try {
      const result = await DP.getDocumentAsync({
        type: "audio/*", // Solo permite archivos de audio
        copyToCacheDirectory: false, // Evita copiar a caché innecesariamente
      });

      if (result.canceled) {
        console.log("Selección cancelada");
        return;
      }

      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();
      uploadAudio(blob, "audio.mp3");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Subir audio" onPress={() => pickAudio()} />

      <Text>{t}</Text>
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
