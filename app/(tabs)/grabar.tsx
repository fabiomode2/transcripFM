import { Button, StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as DP from "expo-document-picker";
import { useState } from "react";
import {} from "@/components/API";

export default function grabar() {
  const [file, setFile] = useState<DP.DocumentPickerAsset>();
  const [t, st] = useState<string>("");

  const uploadAudio = async () => {
    if (!file) {
      console.error("No hay archivo seleccionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name || "audiofile",
      type: file.mimeType || "audio/mpeg", // Ajusta según el tipo de archivo
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      st(data); // Guardar la transcripción en el estado si es texto
    } catch (error) {
      console.error("Error subiendo el archivo:", error);
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

      setFile(result.assets[0]); // Guarda el archivo seleccionado
      // let trans = getData("http://127.0.0.1:5000/t/" + result.assets[0].file);
      // st(trans.toString());

      console.log("Archivo seleccionado");
      uploadAudio();
    } catch (error) {
      console.error("Error seleccionando el archivo:", error);
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
