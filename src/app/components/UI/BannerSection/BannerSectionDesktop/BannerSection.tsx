import React, { useMemo } from "react";
import BannerSlide from "@/app/components/UI/BannerSlide";
import { BannerSectionProps } from "@/app/interface/components";

const BannerSection: React.FC<BannerSectionProps> = ({
  setIsConditionsModalOpen,
  setConditionsContent,
  setChatbotOpen,
  bannerImages,
  links,
  calls,
}) => {
  console.log('BannerSectionDesktop - bannerImages:', bannerImages?.length || 0);
  
  const banners = useMemo(() => {
    return bannerImages;
  }, [bannerImages]);

  if (!banners || banners.length === 0) {
    console.log('BannerSectionDesktop - retornando null, banners vazio');
    return null;
  }

  return (
    <section style={{ width: '100%' }}>
      <BannerSlide
        banners={banners}
        btnsDisabled={true}
        links={links}
        calls={calls}
        setChatbotOpen={setChatbotOpen}
        width={1920}
        height={505}
        setIsConditionsModalOpen={setIsConditionsModalOpen}
        setConditionsContent={setConditionsContent}
      />
    </section>
  );
};

export default BannerSection; 