import { Button, StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as DP from "expo-document-picker";
import { useState } from "react";
import {} from "@/components/API";
import * as FileSystem from "expo-file-system";

import { Platform } from "react-native";

export default function grabar() {
  const [t, st] = useState<string>("");

  const uploadAudio = async (blob: Blob, fileName: string) => {
    const formData = new FormData();
    formData.append("file", blob, fileName);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Fi le uploaded successfully:", data);
      st(data.response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
