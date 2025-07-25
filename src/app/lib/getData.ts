import axios from "axios";

const baseUrl = `${
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}/api/proxy`;

export const fetchBanners = async () => {
  console.log('fetchBanners - baseUrl:', baseUrl);
  const response = await axios.get(`${baseUrl}?endpoint=banners`);
  console.log('fetchBanners - response status:', response.status);
  console.log('fetchBanners - response data length:', response.data?.length || 0);
  
  const {
    ids,
    contents,
    defenseTypes,
    bannerImages,
    bannerImagesTablet,
    bannerImagesMobile,
    calls,
    links,
    title_contents,
    types,
    idSubBrands,
  } = response.data.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: Record<string, any[]>, element: Record<string, unknown>) => {
      acc.ids.push(element.id);
      acc.contents.push(element.content);
      acc.defenseTypes.push(element.defenseType);
      acc.bannerImages.push(element.banner_desktop);
      acc.bannerImagesTablet.push(element.banner_tablet);
      acc.bannerImagesMobile.push(element.banner_mobile);
      acc.calls.push(element.call);
      acc.links.push(element.link);
      acc.title_contents.push(element.title_content);
      acc.types.push(element.type);
      acc.idSubBrands.push(element.id_sub_brand);
      return acc;
    },
    {
      ids: [],
      contents: [],
      defenseTypes: [],
      bannerImages: [],
      bannerImagesTablet: [],
      bannerImagesMobile: [],
      calls: [],
      links: [],
      title_contents: [],
      types: [],
      idSubBrands: [],
    }
  );

  const result = {
    ids,
    contents,
    defenseTypes,
    bannerImages,
    bannerImagesTablet,
    bannerImagesMobile,
    calls,
    links,
    title_contents,
    types,
    idSubBrands,
  };
  
  console.log('fetchBanners - result:', {
    bannerImagesCount: result.bannerImages.length,
    callsCount: result.calls.length,
    idSubBrandsCount: result.idSubBrands.length
  });
  
  return result;
}; 