export interface RequisitosCategoria {
  nombre: string;
  minParticipaciones: number; 
  minGanadas: number;         
}

export const CATEGORIAS_USUARIO: Record<string, RequisitosCategoria> = {
  comun: {
    nombre: "comun",
    minParticipaciones: 0,
    minGanadas: 0,
  },
  plata: {
    nombre: "plata",
    minParticipaciones: 15,
    minGanadas: 5,
  },
  oro: {
    nombre: "oro",
    minParticipaciones: 30,
    minGanadas: 10,
  },
  platino: {
    nombre: "platino",
    minParticipaciones: 50,
    minGanadas: 20,
  },
  especial: {
    nombre: "especial",
    minParticipaciones: 100,
    minGanadas: 50,
  }
};

export type CategoriaUsuario = "comun" | "plata" | "oro" | "platino" | "especial";

export const obtenerSiguienteCategoria = (categoriaActual: string): CategoriaUsuario | null => {
  const orden: CategoriaUsuario[] = ["comun", "plata", "oro", "platino", "especial"];
  const indiceActual = orden.indexOf(categoriaActual.toLowerCase() as CategoriaUsuario);

  if (indiceActual === -1 || indiceActual === orden.length - 1) {
    return null; 
  }

  return orden[indiceActual + 1];
};