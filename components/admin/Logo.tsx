import React from 'react';

export default function AdminLogo() {
  return (
    <svg
      width="220"
      height="32"
      viewBox="0 0 220 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', height: '28px', width: 'auto', maxWidth: '100%', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="cmLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="60%" stopColor="#C04010" />
          <stop offset="100%" stopColor="#7A1804" />
        </linearGradient>
      </defs>

      {/* Rounded Logo Badge */}
      <rect x="0" y="2" width="28" height="28" rx="7" fill="url(#cmLogoGrad)" />
      <rect x="0.5" y="2.5" width="27" height="27" rx="6.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

      {/* CM Monogram */}
      <text
        x="14"
        y="20.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        CM
      </text>

      {/* Brand Title */}
      <text
        x="36"
        y="15.5"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="0.4"
      >
        CREATIVE MARKETING
      </text>

      {/* Subtitle */}
      <text
        x="36"
        y="27"
        fill="#FF8A50"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        letterSpacing="1.2"
      >
        CMS CONSOLE
      </text>
    </svg>
  );
}
