import { usePathname } from 'next/navigation';
import { useSiteConfig } from './useSiteConfig';

export const useBannerFilter = () => {
  const pathname = usePathname();
  const { id_sub_brand } = useSiteConfig();
  
  const filterBannersByPage = (
    bannerImages: string[] = [],
    bannerImagesMobile: string[] = [],
    bannerImagesTablet: string[] = [],
    links: string[] = [],
    calls: string[] = [],
    idSubBrands: number[] = []
  ) => {

    if (!calls || calls.length === 0) {
      return {
        bannerImages,
        bannerImagesMobile,
        bannerImagesTablet,
        links,
        calls
      };
    }

  
    const filteredIndices: number[] = [];  
    calls.forEach((call, index) => {

      const callPages = call.split(',').map(page => page.trim());
      const bannerSubBrand = idSubBrands[index];

      if (id_sub_brand && bannerSubBrand && bannerSubBrand !== id_sub_brand) {
        return;
      }
      if (!id_sub_brand) {
        return;
      }
    
      if (callPages.includes(pathname)) {
        filteredIndices.push(index);
      }
    });
    return {
      bannerImages: filteredIndices.map(i => bannerImages[i]).filter(Boolean),
      bannerImagesMobile: filteredIndices.map(i => bannerImagesMobile[i]).filter(Boolean),
      bannerImagesTablet: filteredIndices.map(i => bannerImagesTablet[i]).filter(Boolean),
      links: filteredIndices.map(i => links[i]).filter(Boolean),
      calls: filteredIndices.map(i => calls[i]).filter(Boolean)
    };
  };

  return { filterBannersByPage, currentPath: pathname };
}; 