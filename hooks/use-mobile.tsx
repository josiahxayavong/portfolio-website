// import react for hooks
import * as React from "react"

// breakpoint used to determine mobile width
const MOBILE_BREAKPOINT = 768

// custom hook that detects if screen width is mobile-sized
export function useIsMobile() {
  // store whether device is mobile or not
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // run effect once on mount
  React.useEffect(() => {
    // create media query listener for screen smaller than breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // function to update state based on window width
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // listen for changes and call update immediately
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // cleanup listener when unmounting
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // return true or false based on screen size
  return !!isMobile
}
