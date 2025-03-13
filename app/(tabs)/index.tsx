import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  View as DefaultView,
  ColorValue,
  useColorScheme,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { tintColorLight, tintColorDark } from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CalendarEvent } from "@/components/Calendar_Event";

// 🔹 Definir el tipo de mensaje para TypeScript
interface Mensaje {
  id: string;
  texto: string;
}

export default function Index() {
  const MAINCOLOR: ColorValue =
    useColorScheme() == "light" ? tintColorDark : tintColorLight;

  const [mensaje, setMensaje] = useState<string>(""); // Estado para el input
  const [mensajes, setMensajes] = useState<Mensaje[]>([]); // Estado para los mensajes de Firestore

  // 🔹 Obtener mensajes en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mensajes"), (snapshot) => {
      const mensajesArray: Mensaje[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Mensaje, "id">; // 👈 Excluir 'id'
        return {
          id: doc.id, // 👈 Asignamos 'id' manualmente
          texto: data.texto, // 👈 Extraemos solo 'texto' de Firestore
        };
      });
  
      setMensajes(mensajesArray);
    });
  
    return () => unsubscribe(); // Limpiar la suscripción al desmontar
  }, []);

  // 🔹 Función para agregar un mensaje a Firestore
  const agregarMensaje = async () => {
    if (mensaje.trim() === "") return; // Evitar mensajes vacíos

    try {
      const docRef = await addDoc(collection(db, "mensajes"), {
        texto: mensaje,
        timestamp: new Date(),
      });

      console.log("Mensaje agregado con ID:", docRef.id);
      setMensaje(""); // Limpiar el input después de enviar
    } catch (error) {
      console.error("Error al agregar mensaje:", error);
    }
  };

  return (
    <View style={styles.scroll_container}>
      {/* 🔹 Botones superiores */}
      <View style={styles.hcontainer}>
        <Link href="/archivo">
          <AntDesign name="folder1" size={24} color={MAINCOLOR} />
          <Text style={styles.text_medium}>Ver archivo</Text>
        </Link>

        <Link href="/grabar">
          <AntDesign name="plus" size={24} color={MAINCOLOR} />
          <Text style={styles.text_medium}>Subir audio</Text>
        </Link>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* 🔹 Lista de Eventos */}
      <ScrollView contentContainerStyle={styles.topdown_container}>
        <View style={styles.topdown_container}>
          <AntDesign name="calendar" size={32} color={MAINCOLOR} />
          <Text style={styles.text_medium}>Próximos eventos</Text>
        </View>
        <View style={styles.vspace} />
        <CalendarEvent text="Tarea 1 Cálculo" date={new Date()} />
        <CalendarEvent text="Tarea 2 Álgebra" date={new Date()} />
      </ScrollView>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* 🔹 Enviar mensaje a Firestore */}
      <DefaultView style={styles.mensajesContainer}>
        <Text style={styles.text_medium}>Escribe un mensaje:</Text>
        <TextInput
          placeholder="Escribe aquí..."
          value={mensaje}
          onChangeText={setMensaje}
          style={styles.input}
        />
        <Button title="Enviar" onPress={agregarMensaje} />
      </DefaultView>

      {/* 🔹 Mostrar mensajes desde Firestore */}
      <ScrollView>
        {mensajes.map((msg) => (
          <View key={msg.id} style={styles.mensajeItem}>
            <Text>{msg.texto}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll_container: {
    flex: 1,
  },
  hcontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    padding: 20,
  },
  topdown_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text_medium: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  vspace: {
    height: 20,
  },
  mensajesContainer: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
  mensajeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
