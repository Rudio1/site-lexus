"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteContextType {
  id_sub_brand: number | null;
  siteName: string;
  hostname: string;
  changeSite: (siteId: number) => void;
  isClient: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};

interface SiteProviderProps {
  children: ReactNode;
}

export const SiteProvider: React.FC<SiteProviderProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [siteConfig, setSiteConfig] = useState({
    hostname: '',
    id_sub_brand: null as number | null,
    siteName: ''
  });
  const [manualSiteId, setManualSiteId] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const detectDomain = async () => {
      try {
        const response = await fetch('/api/get-domain');
        const data = await response.json();

        const hostname = data.detectedDomain || (typeof window !== 'undefined' ? window.location.hostname : '');
        
        const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
          'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
          'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
          'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
          'localhost': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          '127.0.0.1': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          'site-lexus.vercel.app': { id_sub_brand: 9, siteName: 'Lexus Vitória' }
        };

        const config = domainMapping[hostname];
        
        setSiteConfig({
          hostname,
          id_sub_brand: manualSiteId || config?.id_sub_brand || 9,
          siteName: config?.siteName || 'Lexus Vitória'
        });
      } catch (error) {
        console.error("Erro ao detectar domínio:", error);

        const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
        const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
          'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
          'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
          'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
          'localhost': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          '127.0.0.1': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          'site-lexus.vercel.app': { id_sub_brand: 9, siteName: 'Lexus Vitória' }
        };
        
        const config = domainMapping[hostname];
        setSiteConfig({
          hostname,
          id_sub_brand: manualSiteId || config?.id_sub_brand || 9,
          siteName: config?.siteName || 'Lexus Vitória'
        });
      }
    };
    
    detectDomain();
  }, [manualSiteId]);

  const changeSite = (siteId: number) => {
    console.log('SiteContext - Mudando site para:', siteId);
    setManualSiteId(siteId);
    
    // Força atualização imediata
    const domainMapping: { [key: string]: string } = {
      9: 'Lexus Vitória',
      10: 'Lexus BH',
      11: 'Lexus Brasília'
    };
    
    setSiteConfig(prev => {
      const newConfig = {
        ...prev,
        id_sub_brand: siteId,
        siteName: domainMapping[siteId] || 'Lexus Vitória'
      };
      console.log('SiteContext - Nova configuração:', newConfig);
      return newConfig;
    });
  };

  const value: SiteContextType = {
    id_sub_brand: siteConfig.id_sub_brand,
    siteName: siteConfig.siteName,
    hostname: siteConfig.hostname,
    changeSite,
    isClient
  };

  console.log('SiteContext - valor atual:', value);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}; 