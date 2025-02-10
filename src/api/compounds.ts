export const url = "http://localhost:9000";

export const fetchCompounds = async (token: string) => {
  try {
    const response = await fetch(`${url}/compounds`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch compounds");
    }

    const data = await response.json();
    return data; // Assuming response is an array of compounds
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
};

export const fetchSharedCompounds = async (token: string, userId: string) => {
  try {
    const response = await fetch(`${url}/users/${userId}/shares`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch shared compounds");
    }

    const data = await response.json();
    return data; // Assuming the response is an array of shared compounds
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
};

export const addCompound = async (
  token: string,
  ownerId: string,
  name: string,
  description: string,
  smiles_structure: string
) => {
  try {
    const response = await fetch(`${url}/compounds`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        smiles_structure,
        owner_id: ownerId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add compound");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
};

export const deleteCompound = async (token: string, compoundId: string) => {
  try {
    const response = await fetch(`${url}/compounds/${compoundId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete compound");
    }

    return true; // Indicate success
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
};
