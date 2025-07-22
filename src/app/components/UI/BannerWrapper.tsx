"use client";

import React, { useEffect, useState } from "react";
import BannerSection from "./BannerSection";
import { useBannerFilter } from "@/app/hooks/useBannerFilter";
import { useSiteConfig } from "@/app/hooks/useSiteConfig";

interface BannerWrapperProps {
  bannerImages?: string[];
  bannerImagesMobile?: string[];
  bannerImagesTablet?: string[];
  links: string[];
  calls: string[];
  idSubBrands?: number[];
}

const BannerWrapper: React.FC<BannerWrapperProps> = ({
  bannerImages,
  bannerImagesMobile,
  bannerImagesTablet,
  links,
  calls,
  idSubBrands,
}) => {
  const { filterBannersByPage } = useBannerFilter();
  const { id_sub_brand, siteName } = useSiteConfig();
  const [isSiteDetected, setIsSiteDetected] = useState(false);

  useEffect(() => {
    if (id_sub_brand !== null) {
      setIsSiteDetected(true);
    }
  }, [id_sub_brand, siteName]);
    
  const filteredBanners = isSiteDetected ? filterBannersByPage(
    bannerImages,
    bannerImagesMobile,
    bannerImagesTablet,
    links,
    calls,
    idSubBrands
  ) : {
    bannerImages: [],
    bannerImagesMobile: [],
    bannerImagesTablet: [],
    links: [],
    calls: []
  };
  


  const handleChatbotOpen = () => {
  };

  const handleConditionsModalOpen = () => {
  };

  const handleConditionsContent = () => {
  };

  if (!isSiteDetected) {
    return null;
  }
  if (!filteredBanners.bannerImages.length && 
      !filteredBanners.bannerImagesMobile.length && 
      !filteredBanners.bannerImagesTablet.length) {
    return null;
  }

  return (
    <BannerSection
      setChatbotOpen={handleChatbotOpen}
      setIsConditionsModalOpen={handleConditionsModalOpen}
      setConditionsContent={handleConditionsContent}
      links={filteredBanners.links}
      calls={filteredBanners.calls}
      bannerImages={filteredBanners.bannerImages}
      bannerImagesMobile={filteredBanners.bannerImagesMobile}
      bannerImagesTablet={filteredBanners.bannerImagesTablet}
    />
  );
};

export default BannerWrapper; 