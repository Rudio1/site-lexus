import '../app/styles/globals.css';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

export const metadata = {
  title: 'Meu Projeto Next.js',
  description: 'Um projeto Next.js estruturado com Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
