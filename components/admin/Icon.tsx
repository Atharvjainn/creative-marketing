import React from "react";

export default function AdminIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        width: "28px",
        height: "28px",
      }}
    >
      <defs>
        <linearGradient
          id="adminCmIconGradient"
          x1="0"
          y1="0"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF6B2B" />
          <stop offset="0.6" stopColor="#C04010" />
          <stop offset="1" stopColor="#7A1804" />
        </linearGradient>
      </defs>

      <rect
        width="28"
        height="28"
        rx="7"
        fill="url(#adminCmIconGradient)"
      />

      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="27"
        rx="6.5"
        stroke="rgba(255,255,255,0.25)"
      />

      <text
        x="14"
        y="18.5"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        CM
      </text>
    </svg>
  );
}