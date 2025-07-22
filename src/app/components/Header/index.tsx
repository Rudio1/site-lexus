import { getSiteConfig } from '@/lib/siteConfig';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const siteConfig = await getSiteConfig();
  return <HeaderClient siteConfig={siteConfig} />;
} 