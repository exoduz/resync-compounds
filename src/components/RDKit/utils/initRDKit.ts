import * as RDKitModule from "@rdkit/rdkit"; // Ensure correct import

export const initRDKit = async () => {
  if (!(window as any).RDKit) {
    const RDKit = await (RDKitModule as any).default(); // Correct function call
    (window as any).RDKit = RDKit; // Store globally
  }
  return (window as any).RDKit;
};
