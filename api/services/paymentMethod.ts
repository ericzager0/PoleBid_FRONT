import client from "../client";

export const paymentMethodService = {
  addCard: async (body: {
    number: string;
    expMonth: string;
    expYear: string;
  }) => {
    return await client.post("/payment-methods/cards", body);
  },
};
