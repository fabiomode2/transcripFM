import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Materia {
  nombre: string;
  descripcion: string;
  profesor: string;
  semestre: string;
}

export default function MateriaScreen() {
  const { id } = useLocalSearchParams(); // 👈 Obtener el ID de la URL
  const navigation = useNavigation();
  const [materia, setMateria] = useState<Materia | null>(null);

  // 🔹 Obtener los datos de la materia desde Firestore
  useEffect(() => {
    if (!id) return;
    
    const fetchMateria = async () => {
      try {
        const docRef = doc(db, "materias", id as string);
        const docSnap = await getDoc(docRef);
        console.log(docSnap)
        if (docSnap.exists()) {
          setMateria(docSnap.data() as Materia); // 👈 Solo guardamos los datos, sin ID
        } else {
          console.error("No se encontró la materia");
        }
      } catch (error) {
        console.error("Error al obtener la materia:", error);
      }
    };

    fetchMateria();
  }, [id]);

  if (!materia) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{materia.nombre}</Text>
      <Text>📄 Descripción: {materia.descripcion}</Text>
      <Text>👨‍🏫 Profesor: {materia.profesor}</Text>
      <Text>📅 Semestre: {materia.semestre}</Text>

      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
