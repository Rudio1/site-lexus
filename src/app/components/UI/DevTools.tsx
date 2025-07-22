"use client";

import React from 'react';
import SiteSwitcher from './SiteSwitcher';
import { useSiteContext } from '@/app/context/SiteContext';

const DevTools: React.FC = () => {
  const { id_sub_brand, changeSite, isClient } = useSiteContext();
  
  // Só mostra em desenvolvimento ou no Vercel
  const isDev = process.env.NODE_ENV === 'development' || 
                (typeof window !== 'undefined' && (
                  window.location.hostname === 'site-lexus.vercel.app' ||
                  window.location.hostname === 'localhost'
                ));

  if (!isClient || !isDev) {
    return null;
  }

  return (
    <SiteSwitcher 
      currentSite={id_sub_brand || 9} 
      onSiteChange={changeSite} 
    />
  );
};

export default DevTools; 