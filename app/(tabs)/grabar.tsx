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
      const response = await fetch("http://127.0.0.1/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      console.log("Fi le uploaded successfully:", data);
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

      let file: File;

      if (Platform.OS === "web") {
        // En web, result es un objeto File diarectamente
        file = result as unknown as File; // Forzar el tipo a File
      } else {
        // En móvil, convertir DocumentPickerSuccessResult a File
        const fileData = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        // Convertir base64 a Blob
        const byteCharacters = atob(fileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: result.assets[0].mimeType || "audio/mpeg",
        });

        // Crear un objeto File desde el Blob
        file = new File([blob], result.assets[0].name || "audio.mp3", {
          type: result.assets[0].mimeType || "audio/mpeg",
        });
      }

      // Subir el archivo a la API
      uploadAudio(file, "audio.mpr");
    } catch (error) {
      console.error("Error seleccionando el archivo:", error);
    }

    // let trans = getData("http://127.0.0.1:5000/t/" + result.assets[0].file);
    // st(trans.toString());

    console.log("Archivo seleccionado");
    // uploadAudio();
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
