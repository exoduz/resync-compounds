import React, { useState } from "react";
import { addCompound } from "../api/compounds"; // Make sure to import the addCompound API function

interface AddCompoundModalProps {
  token: string;
  ownerId: string;
  onClose: () => void;
  onAddCompound: (compound: any) => void; // Add this prop for handling compound addition
}

const AddCompoundModal: React.FC<AddCompoundModalProps> = ({
  token,
  ownerId,
  onClose,
  onAddCompound,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [smilesStructure, setSmilesStructure] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newCompound = await addCompound(
        token,
        ownerId,
        name,
        description,
        smilesStructure
      );

      // Once the compound is added, we pass it back to the parent
      onAddCompound(newCompound);
      onClose(); // Close the modal after adding
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Compound</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Compound Name"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={smilesStructure}
            onChange={(e) => setSmilesStructure(e.target.value)}
            placeholder="SMILES Structure"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Compound"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompoundModal;
