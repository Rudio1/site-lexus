"use client";
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import AlertModal from './AlertModal';
import { useState, useEffect } from 'react';
import { useSiteContext } from '@/app/context/SiteContext';
import { sites } from '@/config/sites';

export default function HeaderClient() {
  const { id_sub_brand } = useSiteContext();
  
  // Mapear id_sub_brand para o domínio correto para pegar a configuração
  const domainMapping: { [key: number]: string } = {
    9: 'lexusvitoria.com.br',
    10: 'lexusbh.com.br',
    11: 'lexusbrasilia.com.br'
  };
  
  const currentDomain = domainMapping[id_sub_brand || 9] || 'lexusvitoria.com.br';
  const siteConfig = sites[currentDomain] || sites['lexusvitoria.com.br'];
  
  console.log('HeaderClient - id_sub_brand:', id_sub_brand, 'currentDomain:', currentDomain, 'logo:', siteConfig.logo);
  
  // Força re-renderização quando id_sub_brand muda
  useEffect(() => {
    console.log('HeaderClient - useEffect - id_sub_brand mudou para:', id_sub_brand);
  }, [id_sub_brand]);
  
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <span className={styles.headerAlert} onClick={() => setOpen(true)}>
          Alerta aos consumidores <span style={{color:'#ff4444',fontSize:'1.1em'}}>⚠️</span>
        </span>
      </div>
      <div className={styles.headerMain}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            key={`${id_sub_brand}-${siteConfig.logo}`}
            src={siteConfig.logo} 
            alt={siteConfig.name} 
            width={100} 
            height={40} 
          />
        </Link>
        {/* Desktop nav */}
        <div className={styles.carNames}>
          <span>UX <b>SUV</b></span>
          <span>NX <b>SUV</b></span>
          <span>RX <b>SUV</b></span>
          <span>ES <b>SEDAN</b></span>
        </div>
        <button className={styles.consultorBtn}>FALAR COM O CONSULTOR</button>
        {/* Mobile hamburger/X */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <span className={styles.closeIcon}></span>
          ) : (
            <>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </>
          )}
        </button>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={() => setMenuOpen(false)} />
      )}
      {/* Mobile menu */}
      <nav className={styles.mobileMenu + (menuOpen ? ' ' + styles.open : '')}>
        <div className={styles.mobileMenuItems}>
          {/* Vehicle Models Section */}
          <div className={styles.menuSection}>
            <span>UX <b>SUV COMPACTO</b></span>
            <span>NX <b>SUV MÉDIO</b></span>
            <span>RX <b>SUV GRANDE</b></span>
            <span>ES <b>SEDAN</b></span>
          </div>
          
          {/* Divider */}
          <div className={styles.menuDivider}></div>
          
          {/* Call to Action Section */}
          <div className={styles.menuSection}>
            <button className={styles.consultorBtn}>FALAR COM O CONSULTOR</button>
          </div>
          
          {/* Divider */}
          <div className={styles.menuDivider}></div>
          
          {/* Social Media and Legal Section */}
          <div className={styles.menuSection}>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>
                <Image src="/image/facebook.png" alt="Facebook" width={24} height={24} />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Image src="/image/instagram.png" alt="Instagram" width={24} height={24} />
              </a>
            </div>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Portal de privacidade</a>
              <a href="#" className={styles.legalLink}>Portal de Compliance</a>
            </div>
          </div>
        </div>
      </nav>
      <AlertModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
} 