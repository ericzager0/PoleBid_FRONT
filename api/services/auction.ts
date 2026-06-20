import client from "../client";

export type AuctionType = {
  identificador: number;
  fecha: string;
  hora: string;
  estado: string;
  subastador: string;
  ubicacion: string;
  capacidadasistentes: number;
  tienedeposito: boolean;
  seguridadpropia: boolean;
  categoria: string;
  idCatalogo: number;
  descripcion: string;
  foto: string;
  items: [
    {
      idProducto: number;
      precioBase: number;
      descripcioncatalogo: string;
      descripcioncompleta: string;
      fotos: string[];
    },
  ];
};

export const auctionService = {
  getAuctions: async () => {
    const response = await client.get("/auctions");
    return response;
  },
  getAuctionById: async (id: number) => {
    const response = await client.get(`/auctions/${id}`);
    return response;
  },
};
