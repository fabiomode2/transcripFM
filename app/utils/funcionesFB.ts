import { db } from "../../firebaseConfig"; // Ajustá la ruta según la ubicación de firebaseConfig.ts
import { collection, addDoc } from "firebase/firestore";

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