import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { Compound } from "./CompoundItem";

import { fetchCompounds } from "../api/compounds";
import { fetchUsers } from "../api/user";
import { logout } from "../api/auth";

import CompoundsList from "./CompoundsList";
import AddCompoundModal from "./AddCompound";

interface User {
  id: string;
  username: string;
}

const List: React.FC = () => {
  const { token, userId, logout: clearAuth } = useAuth();
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [compoundsData, usersData] = await Promise.all([
          fetchCompounds(token),
          fetchUsers(token),
        ]);

        setCompounds(compoundsData);

        const filteredUsers = usersData.filter(
          (user: User) => user.id !== userId
        );
        setSharedUsers(filteredUsers);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  console.log(111, sharedUsers);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNewCompound = (newCompound: Compound) => {
    setCompounds((prevCompounds) => [...prevCompounds, newCompound]);
  };

  const deleteCompound = (compoundId: string) => {
    setCompounds((prevCompounds) =>
      prevCompounds.filter((c) => c.id !== compoundId)
    );
  };

  const handleLogout = async () => {
    if (!token) return;

    try {
      await logout(token);
      clearAuth();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Please log in to view the compounds.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Compounds</h2>
          <div className="flex gap-4">
            <button
              onClick={openModal}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Compound
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && <p>Loading compounds...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <CompoundsList
          compounds={compounds}
          token={token}
          onDelete={deleteCompound}
        />

        {isModalOpen && (
          <AddCompoundModal
            token={token}
            ownerId={userId || ""}
            onClose={closeModal}
            onAddCompound={addNewCompound}
          />
        )}
      </div>
    </div>
  );
};

export default List;
