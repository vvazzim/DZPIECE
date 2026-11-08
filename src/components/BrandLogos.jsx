import React from 'react';

export function BrandLogo({ brand, className = "w-5 h-5" }) {
  const b = (brand || '').toLowerCase();

  switch (b) {
    case 'renault':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L5 12l7 10 7-10L12 2z" />
          <path d="M12 6.5L8.5 12l3.5 5.5 3.5-5.5L12 6.5z" />
        </svg>
      );

    case 'dacia':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 8h5.5l2.5 4-2.5 4H4z" />
          <path d="M20 8h-5.5l-2.5 4 2.5 4H20z" />
        </svg>
      );

    case 'peugeot':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3h12a2 2 0 012 2v9c0 5-6 8-8 8s-8-3-8-8V5a2 2 0 012-2z" />
          <path d="M10 8c1-1 3-1 4 0v4c1 0 2 1 2 2M10 12l2 4M9 16h6" />
        </svg>
      );

    case 'volkswagen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M7 8l3 8.5L12 11l2 5.5L17 8" />
          <path d="M9 8L12 13.5 15 8" />
        </svg>
      );

    case 'hyundai':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(-18 12 12)" />
          <path d="M8 8.5v7" />
          <path d="M16 8.5v7" />
          <path d="M8 12.5c4-2 6-2 8 0" />
        </svg>
      );

    case 'seat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 6H8.5a2.5 2.5 0 00-2.5 2.5v0a2.5 2.5 0 002.5 2.5h7a2.5 2.5 0 012.5 2.5v0a2.5 2.5 0 01-2.5 2.5H8" />
          <path d="M7 9l10 6" />
        </svg>
      );

    case 'kia':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 16V8l5 8" />
          <path d="M9 8l-3 4.5" />
          <path d="M12 16V8" />
          <path d="M15 16l4.5-8v8" />
        </svg>
      );

    case 'toyota':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="7.5" />
          <ellipse cx="12" cy="10" rx="4" ry="5.5" />
          <ellipse cx="12" cy="7" rx="6.5" ry="2.8" />
        </svg>
      );

    case 'citroen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 10.5l6-5.5 6 5.5" />
          <path d="M6 17.5l6-5.5 6 5.5" />
        </svg>
      );

    case 'skoda':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 5l-2 5h8l-3-2M8 14c2-1 6-1 8 0M10 17c1.5-.5 3-.5 4 0" />
        </svg>
      );

    case 'audi':
      return (
        <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <circle cx="8" cy="12" r="4.5" />
          <circle cx="13.5" cy="12" r="4.5" />
          <circle cx="18.5" cy="12" r="4.5" />
          <circle cx="24" cy="12" r="4.5" />
        </svg>
      );

    case 'bmw':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      );

    case 'mercedes':
    case 'mercedes-benz':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2.5L12 12M12 12L4.5 17.5M12 12L19.5 17.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'nissan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <circle cx="12" cy="12" r="8" />
          <rect x="3" y="10" width="18" height="4" rx="1" strokeWidth="1.8" />
        </svg>
      );

    case 'fiat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M7 8h3M7 12h2M7 16V8M13 16V8M17 16l-2-8h4" />
        </svg>
      );

    case 'ford':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M7 12c2-2 4-2 7-1M9 14c1.5-1 3-1 5 0" strokeLinecap="round" />
        </svg>
      );

    case 'chevrolet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 10h5V6h8v4h5v4h-5v4H8v-4H3z" />
        </svg>
      );

    case 'suzuki':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M17 5L7 11h9L7 19" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="11" width="18" height="9" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
  }
}

// Minimalist DZPIECE Brand Emblem
export function DzPieceEmblem({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Outer disc with cooling vents (brake disc / gear minimalist) */}
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M5.6 5.6l1.4 1.4" />
      <path d="M17 17l1.4 1.4" />
      <path d="M5.6 18.4l1.4-1.4" />
      <path d="M17 7l1.4-1.4" />
    </svg>
  );
}
