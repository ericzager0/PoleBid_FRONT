import client from "../client";

export const auctionService = {
  getAuctions: async () => {
    const response = await client.get("/auctions");
    return response;
  },
};
