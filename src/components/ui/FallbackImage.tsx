'use client';

import React, { useState, useEffect } from 'react';

export const FALLBACK_IMAGE_URL = 'https://nekowawolf.github.io/cdn-images/images/2026/1780148714_image-unavailable.png';

export interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean;
    sizes?: string;
}

export const FallbackImage = ({ src, alt, fill, sizes, className, ...props }: FallbackImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const combinedClassName = fill 
        ? `absolute inset-0 w-full h-full ${className || ''}` 
        : className;

    return (
        <img
            {...props}
            className={combinedClassName}
            src={imgSrc ? (imgSrc as string) : FALLBACK_IMAGE_URL}
            alt={alt || 'Image'}
            onError={() => {
                if (imgSrc !== FALLBACK_IMAGE_URL) {
                    setImgSrc(FALLBACK_IMAGE_URL);
                }
            }}
        />
    );
};

export const FallbackNativeImage = ({ src, alt, fill, sizes, className, ...props }: FallbackImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const combinedClassName = fill 
        ? `absolute inset-0 w-full h-full ${className || ''}` 
        : className;

    return (
        <img
            {...props}
            className={combinedClassName}
            src={imgSrc ? (imgSrc as string) : FALLBACK_IMAGE_URL}
            alt={alt || 'Image'}
            onError={(e) => {
                if (imgSrc !== FALLBACK_IMAGE_URL) {
                    setImgSrc(FALLBACK_IMAGE_URL);
                }
            }}
        />
    );
};