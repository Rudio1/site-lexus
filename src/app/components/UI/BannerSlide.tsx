"use client";

import React, { useCallback, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BannerSlideProps } from "@/app/interface/components";
import ImageComponent from "./ImageComponent";
import { useRouter } from "next/navigation";

// Estilos inline para garantir funcionamento
const swiperStyles = {
  container: {
    position: 'relative' as const,
    width: '100%',
    height: 'auto',
  },
  swiper: {
    width: '100%',
    height: 'auto',
  },
  slide: {
    cursor: 'pointer',
  },
  pagination: {
    position: 'absolute' as const,
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  playButton: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    padding: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

};

const BannerSlide: React.FC<BannerSlideProps> = ({
  banners,
  links,
  width,
  height,
  calls,
  priority = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const isLoopEnabled = banners.length > 1;
  const router = useRouter();

  const handleSlideChange = useCallback(
    (swiper: { realIndex: React.SetStateAction<number> }) => {
      setActiveIndex(swiper.realIndex);
    },
    []
  );

  const toggleAutoplay = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      
      if (isPaused) {
        swiperInstance.autoplay.start();
        setIsPaused(false);
      } else {
        swiperInstance.autoplay.stop();
        setIsPaused(true);
      }
    }
  }, [isPaused]);

  const handleBannerClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.banner-play-pause-btn')) {
      return;
    }

    const currentLink = links?.[activeIndex];
    const currentCall = calls?.[activeIndex];

    if (currentLink) {
      router.push(currentLink);
    } else if (currentCall && currentCall !== "/") {
      router.push(currentCall);
    }
  }, [activeIndex, links, calls, router]);

  return (
    <div style={swiperStyles.container}>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={isLoopEnabled}
        autoplay={
          isLoopEnabled
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        navigation={false}
        onSlideChange={handleSlideChange}
        style={swiperStyles.swiper}
      >
        {banners.map((banner, index) =>
          banner ? (
            <SwiperSlide key={index} onClick={handleBannerClick} style={swiperStyles.slide}>
              <ImageComponent
                src={banner}
                alt=""
                width={width}
                height={height}
                priority={index === 0 && priority}
                loading={index === 0 ? "eager" : "lazy"}

              />
            </SwiperSlide>
          ) : null
        )}
      </Swiper>

      {isLoopEnabled && (
        <button
          onClick={toggleAutoplay}
          style={swiperStyles.playButton}
          aria-label={isPaused ? "Reproduzir carrossel" : "Pausar carrossel"}
        >
          {isPaused ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>
      )}


      
      <div className="custom-pagination" style={swiperStyles.pagination}></div>
    </div>
  );
};

export default BannerSlide; 