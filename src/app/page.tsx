"use client";

import React, { useEffect, useState } from "react";
import { fetchBanners } from "@/app/lib/getData";
import BannerWrapper from "@/app/components/UI/BannerWrapper";
import { BannerProvider } from "@/app/contexts/BannerContext";
import { useSiteContext } from "@/app/context/SiteContext";

interface BannerData {
  bannerImages: string[];
  bannerImagesMobile: string[];
  bannerImagesTablet: string[];
  links: string[];
  calls: string[];
  idSubBrands: number[];
  contents: string[];
  defenseTypes: string[];
}

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

export default function Home() {
  const { id_sub_brand } = useSiteContext();
  const [bannerData, setBannerData] = useState<BannerData>({
    bannerImages: [],
    bannerImagesMobile: [],
    bannerImagesTablet: [],
    links: [],
    calls: [],
    idSubBrands: [],
    contents: [],
    defenseTypes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      console.log('Home - Carregando banners para id_sub_brand:', id_sub_brand);
      setLoading(true);
      const data = await getBannerData();
      setBannerData(data);
      setLoading(false);
      
      console.log('Home - bannerData carregado:', {
        bannerImagesCount: data.bannerImages.length,
        callsCount: data.calls.length,
        idSubBrandsCount: data.idSubBrands.length
      });
    };

    loadBanners();
  }, [id_sub_brand]); // Re-carrega quando id_sub_brand muda

  return (
    <>
      {loading && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 9999
        }}>
          Carregando banners...
        </div>
      )}
      
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