/**
 * Responsive utilities and breakpoint helpers
 * Helps ensure consistent responsive behavior across the app
 */

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Media query helpers
export const media = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
};

// Responsive spacing
export const responsiveSpacing = {
  container: 'px-4 sm:px-6 md:px-8 lg:px-12',
  section: 'py-8 sm:py-12 md:py-16 lg:py-20',
  compact: 'p-3 sm:p-4 md:p-6',
  normal: 'p-4 sm:p-6 md:p-8',
  large: 'p-6 sm:p-8 md:p-12',
};

// Responsive typography
export const responsiveTypography = {
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold',
  h4: 'text-lg sm:text-xl md:text-2xl font-semibold',
  body: 'text-sm sm:text-base md:text-lg leading-relaxed',
  small: 'text-xs sm:text-sm md:text-base',
};

// Responsive grid helpers
export const responsiveGrid = {
  auto: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  auto2: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  auto3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  flex2: 'flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8',
};

/**
 * Hook to detect screen size
 */
export function useResponsive() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < breakpoints.md;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= breakpoints.lg;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen: isMobile || isTablet,
  };
}
