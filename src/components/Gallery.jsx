import { useState } from 'react'
import CopyToast from './CopyToast'
import './Gallery.css'

const Gallery = () => {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastKey, setToastKey] = useState(0)

  const images = [
    { src: '/images/4ced1a3084dd69af3bcb396202e589e9.jpg', size: 'large', span: '2x2' },
    { src: '/images/7j4t2p.jpg', size: 'medium', span: '1x1' },
    { src: '/images/F7xOYlmXwAAh-sN.png', size: 'medium', span: '1x1' },
    { src: '/images/Fyr8ng9X0A0-vV1.jpg', size: 'wide', span: '2x1' },
    { src: '/images/he-is-me-i-am-him-v0-iqcr96zgumw91.jpg', size: 'small', span: '1x1' },
    { src: '/images/he-think-he-him.png', size: 'small', span: '1x1' },
    { src: '/images/he-thinks-hes-him-v0-3rho7ciq9i7b1.webp', size: 'medium', span: '1x1' },
    { src: '/images/images (31).jpg', size: 'small', span: '1x1' },
    { src: '/images/obi-wan-of-course-i-know-him-hes-me.jpg', size: 'tall', span: '1x1' },
    { src: '/images/sukuna-shibuya.gif', size: 'medium', span: '1x1' },
  ]

  const copyImageToClipboard = async (imageSrc, index) => {
    // Immediately show feedback with new key to force re-render
    setCopiedIndex(index)
    setShowToast(true)
    setToastKey(prev => prev + 1)
    
    setTimeout(() => {
      setShowToast(false)
      setTimeout(() => {
        setCopiedIndex(null)
      }, 100)
    }, 2000)
    
    try {
      const response = await fetch(imageSrc)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
    } catch (err) {
      console.error('Failed to copy image:', err)
    }
  }

  return (
    <>
      <CopyToast key={toastKey} show={showToast} />
      <div className="gallery">
        {images.map((item, index) => {
        const [cols, rows] = item.span.split('x').map(Number)
        return (
          <div 
            key={index} 
            className={`gallery-item gallery-item-${item.size}`}
            style={{
              gridColumn: `span ${cols}`,
              gridRow: `span ${rows}`
            }}
          >
            <img src={item.src} alt={`Gallery image ${index + 1}`} />
            <button
              className="copy-button"
              onClick={(e) => {
                e.stopPropagation()
                copyImageToClipboard(item.src, index)
              }}
              aria-label="Copy image"
            >
              {copiedIndex === index ? (
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
    </>
  )
}

export default Gallery

