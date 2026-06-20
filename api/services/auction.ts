import client from "../client";

export type AuctionType = {
  identificador: string;
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
