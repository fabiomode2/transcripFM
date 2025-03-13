import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // 👈 Importamos Picker correctamente
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";
import { agregarMateria } from "./utils/funcionesFB"; // 👈 Importamos la función de Firestore

export default function ModalScreen() {
  const [materia, setMateria] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [profesor, setProfesor] = useState<string>("");
  const [semestre, setSemestre] = useState<string>("Primer semestre"); // Valor por defecto
  const navigation = useNavigation();

  // 🔹 Llamar a la función importada para agregar la materia
  const handleAgregarMateria = async () => {
    try {
      await agregarMateria(materia, descripcion, profesor, semestre);
      setMateria("");
      setDescripcion("");
      setProfesor("");
      setSemestre("Primer semestre");
      navigation.goBack(); // 👈 Volver al index después de agregar
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

      {/* Input para ingresar la descripción */}
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />

      {/* Input para ingresar el nombre del profesor */}
      <TextInput
        placeholder="Profesor"
        value={profesor}
        onChangeText={setProfesor}
        style={styles.input}
      />

      {/* Selector para el semestre */}
      <Picker
        selectedValue={semestre}
        onValueChange={(itemValue) => setSemestre(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Primer semestre" value="Primer semestre" />
        <Picker.Item label="Segundo semestre" value="Segundo semestre" />
      </Picker>

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
