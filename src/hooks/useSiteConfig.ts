import { useState, useEffect } from 'react';

export const useSiteConfig = () => {
  const [isClient, setIsClient] = useState(false);
  const [clientConfig, setClientConfig] = useState({
    hostname: '',
    id_sub_brand: null as number | null,
    siteName: ''
  });

  useEffect(() => {
    setIsClient(true);
    
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    
    // Mapeamento de domínios para id_sub_brand
    const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
      'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
      'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
      'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
      // Para desenvolvimento local
      'localhost': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
      '127.0.0.1': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' }
    };

    const config = domainMapping[hostname];
    
    setClientConfig({
      hostname,
      id_sub_brand: config?.id_sub_brand || null,
      siteName: config?.siteName || 'Unknown'
    });
  }, []);

  if (!isClient) {
    return {
      hostname: '',
      id_sub_brand: null,
      siteName: ''
    };
  }

  return clientConfig;
}; 