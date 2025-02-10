import { url } from "./compounds.ts";

export const fetchUsers = async (token: string) => {
  const response = await fetch(`${url}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
