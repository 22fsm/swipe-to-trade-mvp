"use client";

import { useState } from "react";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export function SafeImage({ src, alt, className }: SafeImageProps) {
  const [error, setError] = useState(false);

  const fallback = "https://placehold.co/600x400?text=No+Image";

  if (!src || error) {
    return <img src={fallback} alt={alt} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
