export const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const formatearFecha = (fechaString: string): string => {
  if (!fechaString) return ""; 
  const fecha = new Date(fechaString);

  if (isNaN(fecha.getTime())) return "Fecha inválida";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
};