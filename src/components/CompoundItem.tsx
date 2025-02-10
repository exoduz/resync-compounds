import React from "react";
import { useAuth } from "../context/AuthContext";
import { deleteCompound } from "../api/compounds";

// @ts-ignore
import MoleculeStructure from "./RDKit/MoleculeStructure/MoleculeStructure";

// Define the structure of the compound object
export interface Compound {
  id: string;
  name: string;
  smiles_structure: string;
  description: string;
  owner_id: string;
}

interface CompoundItemProps {
  compound: Compound;
  sharedWith?: {
    id: string;
    username: string;
  };
  onDelete?: (compoundId: string) => void;
}

const CompoundItem: React.FC<CompoundItemProps> = ({
  compound,
  sharedWith = { id: "", username: "" },
  onDelete = () => {},
}) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!token) return;

    try {
      await deleteCompound(token, compound.id);
      onDelete(compound.id);
    } catch (err) {
      console.error("Error deleting compound:", err);
    }
  };

  if (!compound) {
    return <p>Loading compound...</p>;
  }

  return (
    <div
      key={compound.id}
      className="flex items-start justify-between w-full p-6 border border-gray-300 rounded-md hover:shadow-lg bg-white"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{compound.name}</h3>
        <p className="text-gray-600 mb-2">{compound.description}</p>
        {sharedWith && sharedWith?.username && (
          <>
            <strong>Shared with:</strong> {sharedWith.username}
          </>
        )}
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col items-center justify-between">
        <p className="text-sm text-gray-500 mb-2">
          <strong>SMILES Structure:</strong> {compound.smiles_structure}
        </p>

        {compound.smiles_structure && (
          <MoleculeStructure
            id={compound.id}
            structure={compound.smiles_structure}
            height={200}
            width={200}
            svgMode
          />
        )}
      </div>
    </div>
  );
};

export default CompoundItem;
