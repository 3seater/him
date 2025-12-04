import { useState, useRef, useEffect } from 'react'
import CopyToast from './CopyToast'
import './Gallery.css'

const Gallery = () => {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const scrollRef = useRef(null)

  const imageSources = [
    '/images/4ced1a3084dd69af3bcb396202e589e9.jpg',
    '/images/7j4t2p.jpg',
    '/images/F7xOYlmXwAAh-sN.png',
    '/images/Fyr8ng9X0A0-vV1.jpg',
    '/images/he-is-me-i-am-him-v0-iqcr96zgumw91.jpg',
    '/images/he-think-he-him.png',
    '/images/he-thinks-hes-him-v0-3rho7ciq9i7b1.webp',
    '/images/images (31).jpg',
    '/images/obi-wan-of-course-i-know-him-hes-me.jpg',
    '/images/prime-he-is-him.gif',
    '/images/Screenshot 2025-12-04 033102.png',
    '/images/sukuna-shibuya.gif',
  ]

  // Duplicate images for seamless loop
  const duplicatedImages = [...imageSources, ...imageSources]

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    let animationId = null
    let startX = 0
    let currentX = 0
    const baseSpeed = 0.5 // pixels per frame at normal speed
    let targetSpeed = baseSpeed
    let currentSpeed = baseSpeed

    const animate = () => {
      // Smoothly interpolate speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.1
      
      currentX -= currentSpeed
      const totalWidth = scrollElement.scrollWidth / 2 // Half because we duplicated
      
      if (Math.abs(currentX) >= totalWidth) {
        currentX = 0
      }
      
      scrollElement.style.transform = `translateX(${currentX}px)`
      animationId = requestAnimationFrame(animate)
    }

        const handleMouseEnter = () => {
          targetSpeed = baseSpeed * 0.4 // Slow down to 40% speed (20% slower than before)
        }

    const handleMouseLeave = () => {
      targetSpeed = baseSpeed // Return to normal speed
    }

    const handleTouchStart = () => {
      targetSpeed = baseSpeed * 0.4 // Slow down to 40% speed (matching hover)
    }

    const handleTouchEnd = () => {
      targetSpeed = baseSpeed // Return to normal speed
    }

    const container = scrollElement.parentElement
    container?.addEventListener('mouseenter', handleMouseEnter)
    container?.addEventListener('mouseleave', handleMouseLeave)
    container?.addEventListener('touchstart', handleTouchStart, { passive: true })
    container?.addEventListener('touchend', handleTouchEnd, { passive: true })

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      container?.removeEventListener('mouseenter', handleMouseEnter)
      container?.removeEventListener('mouseleave', handleMouseLeave)
      container?.removeEventListener('touchstart', handleTouchStart)
      container?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])


  const handleCopy = async (src, index) => {
    const originalIndex = index % imageSources.length
    
    try {
      // Fetch image
      const response = await fetch(src)
      if (!response.ok) throw new Error('Failed to fetch')
      
      const blob = await response.blob()
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
      
      // Show success feedback
      setCopiedIndex(originalIndex)
      setShowToast(true)
      
      // Hide toast after 2 seconds
      setTimeout(() => {
        setShowToast(false)
        setCopiedIndex(null)
      }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <>
      <CopyToast show={showToast} />
      <div className="gallery-container">
        <div className="gallery-scroll" ref={scrollRef}>
          {duplicatedImages.map((src, index) => {
            const originalIndex = index % imageSources.length
            const isCopied = copiedIndex === originalIndex
            
            return (
              <div 
                key={index} 
                className="gallery-item"
              >
                <img 
                  src={src} 
                  alt={`Gallery image ${originalIndex + 1}`}
                />
                <button
                  className="copy-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopy(src, index)
                  }}
                  aria-label="Copy image"
                >
                  {isCopied ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M4 3C4 2.44772 4.44772 2 5 2H9.5C9.77614 2 10 2.22386 10 2.5V5H11C11.5523 5 12 5.44772 12 6V11C12 11.5523 11.5523 12 11 12H6C5.44772 12 5 11.5523 5 11V10H3C2.44772 10 2 9.55228 2 9V4C2 3.44772 2.44772 3 3 3H4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Gallery

