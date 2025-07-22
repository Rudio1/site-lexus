import React from "react";
import Image from "next/image";
import { ImageComponentProps } from "@/app/interface/components";

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  priority = false,
  onLoadingComplete,
}) => {
  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt || "Banner image"}
      width={width}
      height={height}
      loading={loading}
      priority={priority}
      onLoadingComplete={onLoadingComplete}
      className="w-full h-auto object-cover"
      unoptimized={false}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default ImageComponent; 