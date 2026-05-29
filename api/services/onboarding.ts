import client from "../client";

export const onboardingService = {
  email: (body: { email: string }) => client.post("/onboarding/email", body),
  verifyEmail: (body: { email: string; code: string }) =>
    client.post("/onboarding/verify-email", body),
  status: (email: string) =>
    client.get("/onboarding/status", { params: { email } }),
  documents: (body: {
    country: string | number;
    firstName: string;
    lastName: string;
    email: string;
    address: object | string;
    documentFront: string;
    documentBack: string;
  }) => {
    const formData = new FormData();

    formData.append("country", String(body.country));
    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    formData.append("email", body.email);

    const addressString =
      typeof body.address === "object"
        ? JSON.stringify(body.address)
        : body.address;
    formData.append("address", addressString);

    formData.append("documentFront", {
      uri: body.documentFront,
      name: "documentFront.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("documentBack", {
      uri: body.documentBack,
      name: "documentBack.jpg",
      type: "image/jpeg",
    } as any);

    return client.post("/onboarding/documents", formData, {});
  },
};
