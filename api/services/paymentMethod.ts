import client from "../client";

export const paymentMethodService = {
  addCard: async (body: {
    number: string;
    expMonth: string;
    expYear: string;
    owner: string;
  }) => {
    return await client.post("/payment-methods/cards", body);
  },
  addBank: async (body: {
    bankName: string;
    owner: string;
    cuil: string;
    cbu: string;
    reservedFunds: number;
  }) => {
    return await client.post("/payment-methods/bank-accounts", body);
  },
  addCheck: async (body: {
    bankName: string;
    owner: string;
    number: number;
    currency: string;
    amount: number;
    issueDate: string;
  }) => {
    return await client.post("/payment-methods/checks", body);
  },
};
