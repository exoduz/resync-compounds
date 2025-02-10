import React from "react";
import type { Compound } from "./CompoundItem";

import { useSharedCompounds } from "../hooks/useSharedCompounds";
import CompoundItem from "./CompoundItem";

interface CompoundsListProps {
  compounds: Compound[];
  token: string;
  onDelete?: (compoundId: string) => void;
}

const CompoundsList: React.FC<CompoundsListProps> = ({
  token,
  compounds,
  onDelete,
}) => {
  const {
    sharedCompounds,
    loading: sharedCompoundsLoading,
    error: sharedCompoundsError,
  } = useSharedCompounds(token);

  if (sharedCompoundsLoading) return <p>Loading compounds...</p>;
  if (sharedCompoundsError)
    return <p style={{ color: "red" }}>{sharedCompoundsError}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">My Compounds</h2>
      <div className="overflow-x-auto margin mb-12">
        <div className="flex flex-col gap-6">
          {compounds &&
            compounds.map((compound: Compound) => (
              <CompoundItem
                key={compound.id}
                compound={compound}
                onDelete={onDelete}
              />
            ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Shared Compounds</h2>
      <div className="overflow-x-auto margin mb-12">
        <div className="flex flex-col gap-6">
          {sharedCompounds &&
            sharedCompounds.map((sharedCompound) => {
              return (
                <>
                  <CompoundItem
                    key={sharedCompound.compound.id}
                    compound={sharedCompound.compound}
                    sharedWith={sharedCompound.user}
                  />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompoundsList;
