import "./Hero.css"
import desktopHero from "../assets/Hero/Hero1.jpg"
import mobileHero from "../assets/Hero/HeroMobile.jpg"

import { useEffect, useState } from "react"

function Hero(){

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  return(

    <div
      className="hero"
      style={{
        backgroundImage:`url(${isMobile ? mobileHero : desktopHero})`
      }}
    >

    </div>

  )
}

export default Hero