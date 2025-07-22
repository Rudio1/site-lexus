import React from "react";
import { fetchBanners } from "@/app/lib/getData";
import BannerWrapper from "@/app/components/UI/BannerWrapper";
import { BannerProvider } from "@/app/contexts/BannerContext";

export const revalidate = 60;

async function getBannerData() {
  try {
    const banners = await fetchBanners();
    
    const filteredBannerImages = banners.bannerImages.filter(Boolean);
    const filteredBannerImagesMobile = banners.bannerImagesMobile.filter(Boolean);
    const filteredBannerImagesTablet = banners.bannerImagesTablet.filter(Boolean);
    
    return {
      bannerImages: filteredBannerImages,
      bannerImagesMobile: filteredBannerImagesMobile,
      bannerImagesTablet: filteredBannerImagesTablet,
      links: banners.links,
      calls: banners.calls,
      contents: banners.contents,
      defenseTypes: banners.defenseTypes,
    };
  } catch (error) {
    console.error("Erro ao buscar banners:", error);
    return {
      bannerImages: [],
      bannerImagesMobile: [],
      bannerImagesTablet: [],
      links: [],
      calls: [],
      contents: [],
      defenseTypes: [],
    };
  }
}

export default async function AboutDesktop() {
  const bannerData = await getBannerData();

  return (
    <>
      <BannerProvider 
        contents={bannerData.contents} 
        defenseTypes={bannerData.defenseTypes}
      >
        <BannerWrapper
          links={bannerData.links}
          calls={bannerData.calls}
          bannerImages={bannerData.bannerImages}
          bannerImagesMobile={bannerData.bannerImagesMobile}
          bannerImagesTablet={bannerData.bannerImagesTablet}
        />
      </BannerProvider>
      
      <div className="about-desktop">
        <h2 className="title">Sobre Nós</h2>
        <p className="subtitle">Somos uma equipe apaixonada por tecnologia.</p>
      </div>
    </>
  );
} 