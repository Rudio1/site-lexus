import { headers } from 'next/headers';
import { sites, SiteConfig } from '@/config/sites';

export async function getSiteConfig(): Promise<SiteConfig> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  const siteConfig = sites[host] || sites['lexusvitoria.com.br']; // fallback
  
  return siteConfig;
}

export function getSiteSubBrand(host: string): number | null {
  const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
    'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
    'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
    'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
    // Para desenvolvimento local
    'localhost:3000': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
    '127.0.0.1:3000': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' }
  };

  return domainMapping[host]?.id_sub_brand || null;
} 