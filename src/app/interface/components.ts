export interface BannerSectionProps {
  setChatbotOpen: (open: boolean) => void;
  setIsConditionsModalOpen: (opened: boolean) => void;
  setConditionsContent: (content: string) => void;
  bannerImages?: string[];
  bannerImagesMobile?: string[];
  bannerImagesTablet?: string[];
  links: string[];
  calls: string[];
}

export interface BannerSlideProps {
  btnsDisabled?: boolean;
  setIsConditionsModalOpen: (opened: boolean) => void;
  setConditionsContent: (content: string) => void;
  banners: string[];
  links?: string[];
  calls?: string[];
  setChatbotOpen?: (opened: boolean) => void;
  width: number;
  height: number;
  isCMS?: boolean;
  isMobileCMS?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

export interface ImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
  priority?: boolean;
  onLoadingComplete?: () => void;
} 