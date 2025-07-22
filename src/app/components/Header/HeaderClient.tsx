"use client";
import { SiteConfig } from '@/config/sites';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import AlertModal from './AlertModal';
import { useState } from 'react';

export default function HeaderClient({ siteConfig }: { siteConfig: SiteConfig }) {
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
          <Image src={siteConfig.logo} alt={siteConfig.name} width={100} height={40} />
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