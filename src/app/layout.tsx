import './styles/globals.scss';
import HeaderDesktop from './components/Header/index';
import FooterDesktop from './components/Footer/index';
import { getSiteConfig } from '@/lib/siteConfig';

export async function generateMetadata() {
  try {
    const siteConfig = await getSiteConfig();
    return {
      title: siteConfig.name,
      description: `Descubra a excelência ${siteConfig.name}. Carros de luxo com tecnologia avançada e design sofisticado.`,
      icons: {
        icon: '/lexus-lg.svg',
        shortcut: '/lexus-lg.svg',
        apple: '/lexus-lg.svg',
      },
    };
  } catch {
    return {
      title: 'Lexus - Luxo e Performance',
      description: 'Descubra a excelência Lexus. Carros de luxo com tecnologia avançada e design sofisticado.',
      icons: {
        icon: '/lexus-lg.svg',
        shortcut: '/lexus-lg.svg',
        apple: '/lexus-lg.svg',
      },
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/lexus-lg.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/lexus-lg.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/lexus-lg.svg" />
      </head>
      <body>
        <HeaderDesktop />
        <main className="layout-main">{children}</main>
        <FooterDesktop />
      </body>
    </html>
  );
}
