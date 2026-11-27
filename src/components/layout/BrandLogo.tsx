'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  tagline?: string;
  lightText?: boolean;
}

export function BrandLogo({
  className = '',
  size = 36,
  showText = true,
  tagline,
  lightText = false,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Architectural Logo Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <rect width="40" height="40" rx="10" fill="#091a2b" />
        {/* CoreVint Teal primary geometric building block */}
        <path
          d="M10 28V15L20 8L30 15V28C30 29.1 29.1 30 28 30H12C10.9 30 10 29.1 10 28Z"
          fill="#005163"
        />
        {/* Deep Slate accent angle / roofline */}
        <path
          d="M20 8L30 15L20 22L10 15L20 8Z"
          fill="#3b4876"
          fillOpacity="0.85"
        />
        {/* Inner doorway / flow aperture */}
        <path
          d="M17 30V21C17 19.3431 18.3431 18 20 18C21.6569 18 23 19.3431 23 21V30H17Z"
          fill="#f1f3f4"
        />
        {/* Subtle keyline */}
        <circle cx="20" cy="14" r="1.75" fill="#f1f3f4" />
      </svg>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-bold tracking-tight text-base sm:text-lg ${
                lightText ? 'text-[#f1f3f4]' : 'text-foreground'
              }`}
            >
              EstateFlow
            </span>
          </div>
          <span
            className={`text-[10px] tracking-normal mt-0.5 truncate ${
              lightText ? 'text-[#a8aeaf]' : 'text-muted-foreground'
            }`}
          >
            {tagline || 'Close more. Manage less.'}
          </span>
        </div>
      )}
    </div>
  );
}
