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
    
    const detectDomain = async () => {
      try {
        const response = await fetch('/api/get-domain');
        const data = await response.json()

        const hostname = data.detectedDomain || window.location.hostname;
        
        const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
          'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
          'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
          'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
          'localhost': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          '127.0.0.1': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' }
        };

        const config = domainMapping[hostname];
        
        setClientConfig({
          hostname,
          id_sub_brand: config?.id_sub_brand || null,
          siteName: config?.siteName || 'Unknown'
        });
      } catch (error) {
        console.error("Erro ao detectar domínio:", error);

        const hostname = window.location.hostname;
        const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
          'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
          'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
          'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
          'localhost': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
          '127.0.0.1': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' }
        };
        
        const config = domainMapping[hostname];
        setClientConfig({
          hostname,
          id_sub_brand: config?.id_sub_brand || null,
          siteName: config?.siteName || 'Unknown'
        });
      }
    };
    
    detectDomain();
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