import Image from 'next/image';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default async function Header() {
  const siteConfig = await useSiteConfig();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={150}
              height={50}
              className="h-auto"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              Sobre
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-gray-700 hover:text-gray-900"
            >
              {siteConfig.phone}
            </a>
            {siteConfig.socialMedia.whatsapp && (
              <a
                href={`https://wa.me/${siteConfig.socialMedia.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
