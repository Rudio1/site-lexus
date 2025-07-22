import { headers } from 'next/headers';
import { SiteConfig } from '../config/sites';

export async function useSiteConfig(): Promise<SiteConfig> {
  const headersList = await headers();
  const siteConfigHeader = headersList.get('x-site-config');
  
  if (!siteConfigHeader) {
    throw new Error('Site configuration not found');
  }

  return JSON.parse(siteConfigHeader);
} 