import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Button, View as DefaultView } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router"; // 👈 Importamos useRouter

interface Materia {
  id: string;
  nombre: string;
}

export default function Index() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const router = useRouter(); // 👈 Inicializar el router

  // 🔹 Obtener la lista de materias en tiempo real
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materias Disponibles:</Text>
      <ScrollView>
        {materias.map((materia) => (
          <DefaultView key={materia.id} style={styles.materiaItem}>
            <Button
              title={materia.nombre}
              onPress={() => router.push(`./materia/${materia.id}`)} // 👈 Navegar a la página de la materia
            />
          </DefaultView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  materiaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

