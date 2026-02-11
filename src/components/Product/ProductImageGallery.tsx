"use client";
import ImageGallery from "react-image-gallery";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const galleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
    originalAlt: title,
    thumbnailAlt: title,
  }));

  return (
    <div className="w-full">
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showNav={false}
        slideDuration={450}
        slideInterval={3000}
        lazyLoad={true}
        autoPlay={true}
        infinite={true}
      />
    </div>
  );
}
