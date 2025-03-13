import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TextInput, Button } from "react-native";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";
import { agregarMateria } from "./utils/funcionesFB"; // 👈 Importamos la función de Firestore

export default function ModalScreen() {
  const [materia, setMateria] = useState<string>("");
  const navigation = useNavigation();

  // 🔹 Llamar a la función importada para agregar la materia
  const handleAgregarMateria = async () => {
    try {
      await agregarMateria(materia);
      setMateria(""); // Limpiar input después de guardar
      navigation.goBack(); // 👈 Volver a la pantalla anterior
    } catch (error) {
      console.error("Error en el modal al agregar materia:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Materia</Text>

      {/* Input para ingresar el nombre de la materia */}
      <TextInput
        placeholder="Nombre de la materia"
        value={materia}
        onChangeText={setMateria}
        style={styles.input}
      />

      {/* Botón para guardar la materia */}
      <Button title="Guardar" onPress={handleAgregarMateria} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
});
