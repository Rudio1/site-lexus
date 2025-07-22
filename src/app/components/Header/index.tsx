import { getSiteConfig } from '@/hooks/useSiteConfig';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const siteConfig = await getSiteConfig();
  return <HeaderClient siteConfig={siteConfig} />;
} 