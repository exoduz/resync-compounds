import { url } from "./compounds.ts";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${url}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "password",
      username,
      password,
      scope: "",
      client_id: "",
      client_secret: "",
    }).toString(),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const logout = async (token: string) => {
  const response = await fetch(`${url}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
};
