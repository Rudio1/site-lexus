"use client";

import React, { useState } from 'react';
import styles from './SiteSwitcher.module.scss';

interface SiteOption {
  id: number;
  name: string;
  domain: string;
}

const siteOptions: SiteOption[] = [
  { id: 9, name: 'Vitória', domain: 'lexusvitoria.com.br' },
  { id: 10, name: 'BH', domain: 'lexusbh.com.br' },
  { id: 11, name: 'Brasília', domain: 'lexusbrasilia.com.br' }
];

interface SiteSwitcherProps {
  currentSite: number;
  onSiteChange: (siteId: number) => void;
}

const SiteSwitcher: React.FC<SiteSwitcherProps> = ({ currentSite, onSiteChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentSiteName = siteOptions.find(site => site.id === currentSite)?.name || 'Vitória';

  return (
    <div className={styles.siteSwitcher}>
      <button 
        className={styles.switcherButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        🏪 {currentSiteName}
        <span className={styles.arrow}>▼</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {siteOptions.map((site) => (
            <button
              key={site.id}
              className={`${styles.option} ${currentSite === site.id ? styles.active : ''}`}
              onClick={() => {
                console.log('SiteSwitcher - Mudando para site:', site.id, site.name);
                onSiteChange(site.id);
                setIsOpen(false);
              }}
            >
              {site.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiteSwitcher; 