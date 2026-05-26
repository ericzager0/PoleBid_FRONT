import client from "../client";

export const onboardingService = {
  email: (body: { email: string }) => client.post("/onboarding/email", body),
  verifyEmail: (body: { email: string; code: string }) =>
    client.post("/onboarding/verify-email", body),
  status: (email: string) =>
    client.get("/onboarding/status", { params: { email } }),
};
