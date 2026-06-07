import client from "../client";

export const userService = {
  me: async () => {
    const response = await client.get("/users/me");
    return response;
  },
};
