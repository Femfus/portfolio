import { useState, useEffect } from 'react'
import BackgroundShader from './components/BackgroundShader'
import SideContainer from './components/SideContainer'
import MainContainer from './components/MainContainer'
import FloatingCat from './components/FloatingCat'
import AsciiSphere from './components/AsciiSphere'
import CustomCursor from './components/CustomCursor'

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

export default function App() {
  const isMobile = useIsMobile()
  const [activeSection, setActiveSection] = useState(null)

  return (
    <>
      <BackgroundShader />
      {!isMobile && <AsciiSphere />}
      <FloatingCat />
      <SideContainer activeSection={activeSection} setActiveSection={setActiveSection} />
      {!isMobile && <MainContainer activeSection={activeSection} />}
      {!isMobile && <CustomCursor />}
    </>
  )
}
