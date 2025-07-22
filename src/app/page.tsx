import React from "react";
import { fetchBanners } from "@/app/lib/getData";
import BannerWrapper from "@/app/components/UI/BannerWrapper";
import { BannerProvider } from "@/app/contexts/BannerContext";

export const revalidate = 60; // Revalida a cada 60 segundos

async function getBannerData() {
  try {
    const banners = await fetchBanners();
    
    // Processar e filtrar banners conforme necessário
    const filteredBannerImages = banners.bannerImages.filter(Boolean);
    const filteredBannerImagesMobile = banners.bannerImagesMobile.filter(Boolean);
    const filteredBannerImagesTablet = banners.bannerImagesTablet.filter(Boolean);
    
    return {
      bannerImages: filteredBannerImages,
      bannerImagesMobile: filteredBannerImagesMobile,
      bannerImagesTablet: filteredBannerImagesTablet,
      links: banners.links,
      calls: banners.calls,
      idSubBrands: banners.idSubBrands,
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
      idSubBrands: [],
      contents: [],
      defenseTypes: [],
    };
  }
}

export default async function Home() {
  const bannerData = await getBannerData();
  
  console.log('Home - bannerData:', {
    bannerImagesCount: bannerData.bannerImages.length,
    callsCount: bannerData.calls.length,
    idSubBrandsCount: bannerData.idSubBrands.length
  });

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
          idSubBrands={bannerData.idSubBrands}
        />
      </BannerProvider>
      
      {/* Conteúdo adicional da página */}
      <div className="container mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Lexus</h1>
        <p className="text-lg mb-4">
          Descubra a excelência Lexus. Carros de luxo com tecnologia avançada e design sofisticado.
        </p>
        <p className="text-lg">
          Nossos banners estão sendo carregados dinamicamente da API e são responsivos para todos os dispositivos.
        </p> */}
      </div>
    </>
  );
} 