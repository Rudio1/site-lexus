"use client";

import React, { createContext, useContext } from "react";

interface BannerContextType {
  contents: string[];
  defenseTypes: string[];
}

const BannerContext = createContext<BannerContextType>({
  contents: [],
  defenseTypes: [],
});

export const BannerProvider: React.FC<
  BannerContextType & { children: React.ReactNode }
> = ({ children, contents, defenseTypes }) => {
  return (
    <BannerContext.Provider value={{ contents, defenseTypes }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};

export const useBannerContext = useBanner; 