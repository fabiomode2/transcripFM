import { db } from "../../firebaseConfig"; // Ajustá la ruta según la ubicación de firebaseConfig.ts
import { collection, addDoc } from "firebase/firestore";
import { python_server } from "./constanst";

/**
 * Función para agregar una materia a Firestore
 * @param nombreMateria Nombre de la materia a agregar
 * @returns ID de la materia agregada o un error en consola
 */
export const agregarMateria = async (nombreMateria: string) => {
  if (nombreMateria.trim() === "") return;

  try {
    const docRef = await addDoc(collection(db, "materias"), { nombre: nombreMateria });
    console.log("Materia agregada con ID:", docRef.id);
    return docRef.id; // Retorna el ID de la materia creada (opcional)
  } catch (error) {
    console.error("Error al agregar materia:", error);
    throw error; // Opcional, en caso de querer manejar errores en la UI
  }
};



export const uploadAudio = async (blob: Blob, fileName: string) => {
    const formData = new FormData();
    formData.append("file", blob, fileName);

    try {
      const response = await fetch(python_server + "/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Fi le uploaded successfully:", data);
      return data.response
    } catch (error) {
      console.error(error)
      return "ERROR en la transcripcion"
    }
  };