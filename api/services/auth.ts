import client from "../client";

export const authService = {
  register: (body: { email: string; password: string }) =>
    client.post("/auth/register", body),

  login: async (body: { email: string; password: string }) => {
    const response = await client.post("/auth/login", body);
    return response;
  },
};
