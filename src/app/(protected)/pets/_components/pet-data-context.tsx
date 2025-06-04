"use client";

import { createContext, ReactNode, useContext } from "react";

import { patientsTable } from "@/db/schema";

interface PetDataContextType {
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

const PetDataContext = createContext<PetDataContextType | undefined>(undefined);

export const usePetData = () => {
  const context = useContext(PetDataContext);
  if (context === undefined) {
    throw new Error("usePetData must be used within a PetDataProvider");
  }
  return context;
};

interface PetDataProviderProps {
  children: ReactNode;
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

export const PetDataProvider = ({
  children,
  patients,
  userClinicId,
}: PetDataProviderProps) => {
  return (
    <PetDataContext.Provider value={{ patients, userClinicId }}>
      {children}
    </PetDataContext.Provider>
  );
};
