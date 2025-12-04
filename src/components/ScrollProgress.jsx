import { useEffect, useState, useRef } from 'react'
import './ScrollProgress.css'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      targetProgressRef.current = progress
    }

    const smoothUpdate = () => {
      const current = currentProgressRef.current
      const target = targetProgressRef.current
      const diff = target - current
      
      // Smooth interpolation with damping (easing factor)
      const damping = 0.12
      const newProgress = current + diff * damping
      
      currentProgressRef.current = newProgress
      setScrollProgress(newProgress)
      
      // Continue animating if there's still a difference
      if (Math.abs(diff) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(smoothUpdate)
      } else {
        animationFrameRef.current = null
      }
    }

    const startSmoothUpdate = () => {
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(smoothUpdate)
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('scroll', startSmoothUpdate, { passive: true })
    updateScrollProgress() // Initial calculation
    startSmoothUpdate()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('scroll', startSmoothUpdate)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ScrollProgress

