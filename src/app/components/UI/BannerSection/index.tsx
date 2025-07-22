"use client";

import React from "react";
import BannerSectionDesktop from "./BannerSectionDesktop/BannerSection";
import BannerSlide from "@/app/components/UI/BannerSlide";
import { BannerSectionProps } from "@/app/interface/components";
import styles from "./BannerSection.module.scss";

const BannerSection: React.FC<BannerSectionProps> = (props) => {
  console.log('BannerSection - props:', {
    bannerImagesCount: props.bannerImages?.length || 0,
    bannerImagesMobileCount: props.bannerImagesMobile?.length || 0,
    bannerImagesTabletCount: props.bannerImagesTablet?.length || 0,
    callsCount: props.calls?.length || 0,
    linksCount: props.links?.length || 0
  });
  
  return (
    <div className={styles.bannerContainer}>
      {/* Desktop - visível apenas em telas >= 1200px */}
      <div className={styles.desktopBanner}>
        <BannerSectionDesktop {...props} />
      </div>
      
      {/* Tablet - visível apenas em telas >= 768px e < 1200px */}
      {props.bannerImagesTablet && props.bannerImagesTablet.length > 0 && (
        <div className={styles.tabletBanner}>
          <BannerSlide
            banners={props.bannerImagesTablet}
            btnsDisabled={true}
            calls={props.calls}
            links={props.links}
            setChatbotOpen={props.setChatbotOpen}
            width={1024}
            height={1204}
            setIsConditionsModalOpen={props.setIsConditionsModalOpen}
            setConditionsContent={props.setConditionsContent}
          />
        </div>
      )}
      
      {/* Mobile - visível apenas em telas < 768px */}
      {props.bannerImagesMobile && props.bannerImagesMobile.length > 0 && (
        <div className={styles.mobileBanner}>
          <BannerSlide
            banners={props.bannerImagesMobile}
            btnsDisabled={true}
            calls={props.calls}
            links={props.links}
            setChatbotOpen={props.setChatbotOpen}
            width={430}
            height={504}
            setIsConditionsModalOpen={props.setIsConditionsModalOpen}
            setConditionsContent={props.setConditionsContent}
          />
        </div>
      )}
    </div>
  );
};

export default BannerSection; 