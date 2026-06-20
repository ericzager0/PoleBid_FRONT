import client from "../client";

export type ItemType = {
  identificador: number;
  fecha: string;
  disponible: string;
  descripcion: string;
  descripcioncatalogo: string;
  descripcioncompleta: string;
  revisor: number;
  duenio: number;
  seguro: string;
  idSubasta: number;
  estado: string;
  motivo_rechazo: string;
  preciobase: number;
  comision: number;
  hora: string;
  estadoSubasta: string;
  categoria: string;
  fotos: {
    foto: string;
  };
};

export const itemsService = {
  getItem: (id: number) => {
    return client.get(`/me/items/${id}`);
  },
  updateItem: (id: number, body: { estado: string }) => {
    return client.patch(`/me/items/${id}`, body);
  },
  postItem: (body: {
    descripcioncatalogo: string;
    descripcioncompleta: string;
    foto1: string;
    foto2: string;
    foto3: string;
    foto4: string;
    foto5: string;
    foto6: string;
  }) => {
    const formData = new FormData();

    formData.append("descripcioncatalogo", body.descripcioncatalogo);
    formData.append("descripcioncompleta", body.descripcioncompleta);

    formData.append("foto1", {
      uri: body.foto1,
      name: "foto1.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("foto2", {
      uri: body.foto2,
      name: "foto2.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("foto3", {
      uri: body.foto3,
      name: "foto3.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("foto4", {
      uri: body.foto4,
      name: "foto4.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("foto5", {
      uri: body.foto5,
      name: "foto5.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("foto6", {
      uri: body.foto6,
      name: "foto6.jpg",
      type: "image/jpeg",
    } as any);

    return client.post("/me/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
