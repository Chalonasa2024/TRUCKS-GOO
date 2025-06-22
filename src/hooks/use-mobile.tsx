
import * as React from "react"

export enum ScreenSize {
  MOBILE = 640,  // sm
  TABLET = 768,  // md
  LAPTOP = 1024, // lg
  DESKTOP = 1280 // xl
}

export function useIsMobile(breakpoint: number = ScreenSize.TABLET) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < breakpoint)
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isMobile
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
  }>({
    isMobile: false,
    isTablet: false, 
    isLaptop: false,
    isDesktop: false
  })

  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      
      setScreenSize({
        isMobile: width < ScreenSize.MOBILE,
        isTablet: width >= ScreenSize.MOBILE && width < ScreenSize.LAPTOP,
        isLaptop: width >= ScreenSize.LAPTOP && width < ScreenSize.DESKTOP,
        isDesktop: width >= ScreenSize.DESKTOP
      })
    }
    
    // Initial check
    checkScreenSize()
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize)
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return screenSize
}

// Add a hook for checking portrait/landscape orientation
export function useOrientation() {
  const [isPortrait, setIsPortrait] = React.useState<boolean>(
    window.innerHeight > window.innerWidth
  )

  React.useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  return { isPortrait, isLandscape: !isPortrait }
}
