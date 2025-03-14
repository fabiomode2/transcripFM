import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { python_server } from "./constanst";

/**
 * Función para agregar una materia a Firestore
 * @param nombreMateria Nombre de la materia
 * @param descripcion Descripción de la materia
 * @param profesor Nombre del profesor
 * @param semestre "Primer semestre" o "Segundo semestre"
 * @returns ID de la materia agregada
 */
export const agregarMateria = async (
  nombreMateria: string,
  descripcion: string,
  profesor: string,
  semestre: string
) => {
  if (nombreMateria.trim() === "" || semestre.trim() === "") return;

  try {
    const docRef = await addDoc(collection(db, "materias"), {
      nombre: nombreMateria,
      descripcion,
      profesor,
      semestre,
    });

    console.log("Materia agregada con ID:", docRef.id);
    return docRef.id; // Retorna el ID de la materia creada
  } catch (error) {
    console.error("Error al agregar materia:", error);
    throw error;
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