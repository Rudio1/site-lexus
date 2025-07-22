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
  const banners = useMemo(() => {
    return bannerImages;
  }, [bannerImages]);

  if (!banners || banners.length === 0) return null;

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