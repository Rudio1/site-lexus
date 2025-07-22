"use client";

import React from "react";
import BannerSlide from "@/app/components/UI/BannerSlide";
import { BannerSectionProps } from "@/app/interface/components";

const BannerSection: React.FC<BannerSectionProps> = ({
  setIsConditionsModalOpen,
  setConditionsContent,
  setChatbotOpen,
  bannerImagesMobile,
  bannerImagesTablet,
  links,
  calls,
}) => {
  return (
    <>
      {/* Tablet - visível apenas em telas >= 768px e < 1200px */}
      {bannerImagesTablet && bannerImagesTablet.length > 0 && (
        <div className="hidden md:block xl:hidden">
          <BannerSlide
            banners={bannerImagesTablet}
            btnsDisabled={true}
            calls={calls}
            links={links}
            setChatbotOpen={setChatbotOpen}
            width={1024}
            height={1204}
            setIsConditionsModalOpen={setIsConditionsModalOpen}
            setConditionsContent={setConditionsContent}
          />
        </div>
      )}
      
      {/* Mobile - visível apenas em telas < 768px */}
      {bannerImagesMobile && bannerImagesMobile.length > 0 && (
        <div className="block md:hidden xl:hidden">
          <BannerSlide
            banners={bannerImagesMobile}
            btnsDisabled={true}
            calls={calls}
            links={links}
            setChatbotOpen={setChatbotOpen}
            width={430}
            height={504}
            setIsConditionsModalOpen={setIsConditionsModalOpen}
            setConditionsContent={setConditionsContent}
          />
        </div>
      )}
    </>
  );
};

export default BannerSection; 