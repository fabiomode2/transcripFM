import { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  View as DefaultView,
  ColorValue,
  useColorScheme,
} from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { tintColorLight, tintColorDark } from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Materia {
  id: string;
  nombre: string;
}

interface Dia {
  id: string;
  fecha: string;
}

export default function Index() {
  const MAINCOLOR: ColorValue =
    useColorScheme() == "light" ? tintColorDark : tintColorLight;

  const [materia, setMateria] = useState<string>(""); // Nombre de la materia
  const [materias, setMaterias] = useState<Materia[]>([]); // Lista de materias
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string | null>(
    null
  ); // Materia seleccionada
  const [dias, setDias] = useState<Dia[]>([]); // Lista de días de la materia seleccionada
  const [fechaDia, setFechaDia] = useState<string>(""); // Fecha del día nuevo

  // 🔹 Obtener lista de materias en Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "materias"), (snapshot) => {
      const materiasArray: Materia[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setMaterias(materiasArray);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Obtener lista de días de la materia seleccionada
  useEffect(() => {
    if (!materiaSeleccionada) return;

    const unsubscribe = onSnapshot(
      collection(db, "materias", materiaSeleccionada, "dias"),
      (snapshot) => {
        const diasArray: Dia[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          fecha: doc.data().fecha,
        }));
        setDias(diasArray);
      }
    );

    return () => unsubscribe();
  }, [materiaSeleccionada]);

  // 🔹 Función para agregar una nueva materia
  const agregarMateria = async () => {
    if (materia.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "materias"), {
        nombre: materia,
      });
      console.log("Materia agregada con ID:", docRef.id);
      setMateria(""); // Limpiar el input
    } catch (error) {
      console.error("Error al agregar materia:", error);
    }
  };

  // 🔹 Función para agregar un nuevo día a la materia seleccionada
  const agregarDia = async () => {
    if (fechaDia.trim() === "" || !materiaSeleccionada) return;

    try {
      await addDoc(collection(db, "materias", materiaSeleccionada, "dias"), {
        fecha: fechaDia,
      });
      console.log("Día agregado en materia:", materiaSeleccionada);
      setFechaDia(""); // Limpiar el input
    } catch (error) {
      console.error("Error al agregar día:", error);
    }
  };

  return (
    <View style={styles.scroll_container}>
      {/* 🔹 Agregar Materia */}
      <DefaultView style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre de la materia"
          value={materia}
          onChangeText={setMateria}
          style={styles.input}
        />
        <Button title="Agregar Materia" onPress={agregarMateria} />
      </DefaultView>

      <View style={styles.container}>
        <Text>Home screen</Text>
        <Link href="/modal" style={styles.link}>
          Open modal
        </Link>
      </View>
      <View style={styles.separator} />

      {/* 🔹 Lista de Materias */}
      <ScrollView>
        <Text style={styles.text_medium}>Materias Disponibles:</Text>
        {materias.map((mat) => (
          <Button
            key={mat.id}
            title={mat.nombre}
            onPress={() => setMateriaSeleccionada(mat.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.separator} />

      {/* 🔹 Mostrar los Días de la Materia Seleccionada */}
      {materiaSeleccionada && (
        <>
          <Text style={styles.text_medium}>
            Días de {materias.find((m) => m.id === materiaSeleccionada)?.nombre}
            :
          </Text>

          {/* 🔹 Agregar Día */}
          <DefaultView style={styles.inputContainer}>
            <TextInput
              placeholder="Fecha del día (Ej: 2024-03-12)"
              value={fechaDia}
              onChangeText={setFechaDia}
              style={styles.input}
            />
            <Button title="Agregar Día" onPress={agregarDia} />
          </DefaultView>

          {/* 🔹 Lista de Días */}
          <ScrollView>
            {dias.map((dia) => (
              <View key={dia.id} style={styles.diaItem}>
                <Text>{dia.fecha}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll_container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  text_medium: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  diaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
