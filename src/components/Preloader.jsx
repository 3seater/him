import { useState, useEffect, useRef } from 'react'
import './Preloader.css'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const startTimeRef = useRef(Date.now())
  const minDisplayTime = 1000 // 1 second minimum

  useEffect(() => {
    const handleLoad = () => {
      const elapsed = Date.now() - startTimeRef.current
      const remainingTime = Math.max(0, minDisplayTime - elapsed)
      
      // Wait for remaining time to ensure minimum 2 seconds, then fade out
      setTimeout(() => {
        setIsFading(true)
        // Remove from DOM after fade animation completes
        setTimeout(() => {
          setIsVisible(false)
        }, 500) // Match CSS transition duration
      }, remainingTime)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`preloader ${isFading ? 'preloader-fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-spinner preloader-blue"></div>
      </div>
    </div>
  )
}

export default Preloader

