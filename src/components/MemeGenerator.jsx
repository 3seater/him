import { useState, useRef, useEffect } from 'react'
import './MemeGenerator.css'

const MemeGenerator = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedText, setSelectedText] = useState(null)
  const [customText, setCustomText] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [textYPosition, setTextYPosition] = useState(50) // Percentage from top (50% = center)
  const [textXPosition, setTextXPosition] = useState(50) // Percentage from left (50% = center)
  const [isDragging, setIsDragging] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const previewContainerRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height })
          setImageUrl(event.target.result)
          setUploadedImage(true)
          setTextYPosition(50) // Reset to center when new image is uploaded
          setTextXPosition(50) // Reset to center when new image is uploaded
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !previewContainerRef.current || !imageUrl) return
    
    const container = previewContainerRef.current
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPercentage = (x / rect.width) * 100
    const yPercentage = (y / rect.height) * 100
    setTextXPosition(Math.max(10, Math.min(90, xPercentage))) // Clamp between 10% and 90%
    setTextYPosition(Math.max(10, Math.min(90, yPercentage))) // Clamp between 10% and 90%
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !previewContainerRef.current || !imageUrl) return
    
    e.preventDefault()
    const container = previewContainerRef.current
    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const xPercentage = (x / rect.width) * 100
    const yPercentage = (y / rect.height) * 100
    setTextXPosition(Math.max(10, Math.min(90, xPercentage))) // Clamp between 10% and 90%
    setTextYPosition(Math.max(10, Math.min(90, yPercentage))) // Clamp between 10% and 90%
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, imageUrl])

  const handleTextSelect = (textType) => {
    setSelectedText(textType)
    if (textType !== 'custom') {
      setCustomText('')
    }
  }

  const handleCustomTextChange = (e) => {
    const value = e.target.value
    setCustomText(value)
    if (value.trim()) {
      setSelectedText('custom')
    } else {
      setSelectedText(null)
    }
  }

  // Function to wrap text based on available width
  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  const handleDownload = () => {
    if (!imageUrl || !selectedText) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      // Draw image
      ctx.drawImage(img, 0, 0)
      
      if (selectedText === 'literally-him') {
        // "i am literally him" - white text with black stroke
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i am literally him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        // Black stroke
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        // White fill
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'never-him') {
        // "i'll never be him" - white text with black stroke
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i'll never be him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        // Black stroke
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        // White fill
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'become-him') {
        // "become him" - white text with black stroke
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "become him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        // Black stroke
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        // White fill
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'bro-is-him') {
        // "bro is him" - white text with black stroke
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "bro is him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        // Black stroke
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        // White fill
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'am-him') {
        // "i am him" - white text with black stroke
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i am him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        // Black stroke
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        // White fill
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'thinks-him') {
        // "He thinks he's him 😭" with Snapchat story bar
        ctx.font = '300 32px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "he thinks he's him 😭😭"
        const x = canvas.width / 2
        const y = (canvas.height * textYPosition) / 100
        
        // Calculate text dimensions
        const textHeight = 40
        
        // Draw black rectangle (Snapchat story bar) at 30% opacity - full width, thinner, centered on text
        ctx.globalAlpha = 0.3
        ctx.fillStyle = 'black'
        const barWidth = canvas.width
        const barHeight = textHeight + 20
        ctx.fillRect(0, y - barHeight / 2, barWidth, barHeight)
        
        // Reset alpha and draw text
        ctx.globalAlpha = 1
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'custom' && customText.trim()) {
        // Custom text - white text with black stroke (with wrapping)
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = customText.trim()
        const x = (canvas.width * textXPosition) / 100
        const baseY = (canvas.height * textYPosition) / 100
        
        // Calculate max width (80% of image width, accounting for position)
        const maxWidth = canvas.width * 0.8
        const lines = wrapText(ctx, text, maxWidth)
        const lineHeight = 70 // Line height for 60px font
        const totalHeight = (lines.length - 1) * lineHeight
        const startY = baseY - (totalHeight / 2)
        
        // Draw each line
        lines.forEach((line, index) => {
          const y = startY + (index * lineHeight)
          
          // Black stroke
          ctx.strokeStyle = 'black'
          ctx.lineWidth = 8
          ctx.strokeText(line, x, y)
          
          // White fill
          ctx.fillStyle = 'white'
          ctx.fillText(line, x, y)
        })
      }
      
      // Download - handle mobile differently
      canvas.toBlob(async (blob) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                        (window.matchMedia && window.matchMedia('(max-width: 768px)').matches)
        
        if (isMobile) {
          // On mobile, display image in overlay so users can long-press to save to photos
          const url = URL.createObjectURL(blob)
          
          // Try Web Share API first (works on some mobile browsers)
          if (navigator.share && navigator.canShare) {
            try {
              const file = new File([blob], 'him-meme.png', { type: 'image/png' })
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  files: [file],
                  title: 'HIM Meme',
                  text: 'Check out this HIM meme!'
                })
                URL.revokeObjectURL(url)
                return
              }
            } catch (err) {
              // Share failed or user cancelled, fall through to image display
            }
          }
          
          // Create overlay with image for long-press save
          const overlay = document.createElement('div')
          overlay.style.position = 'fixed'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.width = '100%'
          overlay.style.height = '100%'
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
          overlay.style.zIndex = '10000'
          overlay.style.display = 'flex'
          overlay.style.alignItems = 'center'
          overlay.style.justifyContent = 'center'
          overlay.style.cursor = 'pointer'
          
          const img = document.createElement('img')
          img.src = url
          img.style.maxWidth = '95vw'
          img.style.maxHeight = '95vh'
          img.style.objectFit = 'contain'
          img.style.border = '4px solid white'
          img.style.borderRadius = '15px'
          img.style.userSelect = 'none'
          img.style.webkitUserSelect = 'none'
          
          const closeText = document.createElement('div')
          closeText.textContent = 'Tap to close • Long press image to save'
          closeText.style.position = 'absolute'
          closeText.style.top = '20px'
          closeText.style.left = '50%'
          closeText.style.transform = 'translateX(-50%)'
          closeText.style.color = 'white'
          closeText.style.fontFamily = 'Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
          closeText.style.fontSize = '14px'
          closeText.style.fontWeight = '500'
          closeText.style.pointerEvents = 'none'
          
          overlay.appendChild(img)
          overlay.appendChild(closeText)
          
          const closeOverlay = () => {
            document.body.removeChild(overlay)
            URL.revokeObjectURL(url)
          }
          
          overlay.onclick = closeOverlay
          document.body.appendChild(overlay)
        } else {
          // Desktop: use download attribute
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'him-meme.png'
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }
    
    img.src = imageUrl
  }

  const handleCopy = async () => {
    if (!imageUrl || !selectedText) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = async () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.drawImage(img, 0, 0)
      
      if (selectedText === 'literally-him') {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i am literally him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'never-him') {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i'll never be him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'become-him') {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "become him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'bro-is-him') {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "bro is him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'am-him') {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "i am him"
        const x = (canvas.width * textXPosition) / 100
        const y = (canvas.height * textYPosition) / 100
        
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'thinks-him') {
        ctx.font = '300 32px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = "he thinks he's him 😭😭"
        const x = canvas.width / 2
        const y = (canvas.height * textYPosition) / 100
        
        const textHeight = 40
        
        ctx.globalAlpha = 0.3
        ctx.fillStyle = 'black'
        const barWidth = canvas.width
        const barHeight = textHeight + 20
        ctx.fillRect(0, y - barHeight / 2, barWidth, barHeight)
        
        ctx.globalAlpha = 1
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
      } else if (selectedText === 'custom' && customText.trim()) {
        ctx.font = 'bold 60px Helvetica Neue, Helvetica Now Display, Helvetica, Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const text = customText.trim()
        const x = (canvas.width * textXPosition) / 100
        const baseY = (canvas.height * textYPosition) / 100
        
        // Calculate max width (80% of image width, accounting for position)
        const maxWidth = canvas.width * 0.8
        const lines = wrapText(ctx, text, maxWidth)
        const lineHeight = 70 // Line height for 60px font
        const totalHeight = (lines.length - 1) * lineHeight
        const startY = baseY - (totalHeight / 2)
        
        // Draw each line
        lines.forEach((line, index) => {
          const y = startY + (index * lineHeight)
          
          ctx.strokeStyle = 'black'
          ctx.lineWidth = 8
          ctx.strokeText(line, x, y)
          
          ctx.fillStyle = 'white'
          ctx.fillText(line, x, y)
        })
      }
      
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ])
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      })
    }
    
    img.src = imageUrl
  }

  return (
    <div className="meme-generator">
      <h2 className="meme-generator-title">HIMulator</h2>
      
      <div className="meme-generator-content">
        <div className="meme-upload-section">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="meme-file-input"
            id="meme-upload"
          />
          <label htmlFor="meme-upload" className="meme-upload-button">
            Upload Image
          </label>
          
          <div 
            className="meme-preview-container" 
            ref={previewContainerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="Uploaded" className="meme-preview-image" />
                {selectedText && (
                  <div 
                    className="meme-text-overlay"
                    style={{ 
                      top: `${textYPosition}%`, 
                      left: (selectedText === 'thinks-him' || selectedText === 'custom') ? (selectedText === 'thinks-him' ? '50%' : `${textXPosition}%`) : `${textXPosition}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {selectedText === 'literally-him' && (
                      <div 
                        className="meme-text-literal draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        i am literally him
                      </div>
                    )}
                    {selectedText === 'never-him' && (
                      <div 
                        className="meme-text-literal draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        i'll never be him
                      </div>
                    )}
                    {selectedText === 'become-him' && (
                      <div 
                        className="meme-text-literal draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        become him
                      </div>
                    )}
                    {selectedText === 'bro-is-him' && (
                      <div 
                        className="meme-text-literal draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        bro is him
                      </div>
                    )}
                    {selectedText === 'am-him' && (
                      <div 
                        className="meme-text-literal draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        i am him
                      </div>
                    )}
                    {selectedText === 'thinks-him' && (
                      <div 
                        className="meme-text-thinks draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        <div className="snapchat-bar" />
                        <div className="meme-text-thinks-content">he thinks he's him 😭😭</div>
                      </div>
                    )}
                    {selectedText === 'custom' && customText.trim() && (
                      <div 
                        className="meme-text-literal meme-text-custom draggable-text"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      >
                        {customText.trim()}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="meme-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Upload an image to get started</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="meme-options-section">
          <h3 className="meme-options-title">Add Text</h3>
          
          <button
            className={`meme-option-button ${selectedText === 'thinks-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('thinks-him')}
          >
            "he thinks he's him 😭😭"
          </button>
          
          <button
            className={`meme-option-button ${selectedText === 'literally-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('literally-him')}
          >
            "i am literally him"
          </button>
          
          <button
            className={`meme-option-button ${selectedText === 'never-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('never-him')}
          >
            "i'll never be him"
          </button>
          
          <button
            className={`meme-option-button ${selectedText === 'become-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('become-him')}
          >
            "become him"
          </button>
          
          <button
            className={`meme-option-button ${selectedText === 'bro-is-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('bro-is-him')}
          >
            "bro is him"
          </button>
          
          <button
            className={`meme-option-button ${selectedText === 'am-him' ? 'active' : ''}`}
            onClick={() => handleTextSelect('am-him')}
          >
            "i am him"
          </button>
          
          <div className="meme-custom-text-container">
            <input
              type="text"
              className="meme-custom-text-input"
              placeholder="Custom text..."
              value={customText}
              onChange={handleCustomTextChange}
            />
          </div>
          
          {imageUrl && selectedText && (
            <div className="meme-actions">
              <button className="meme-action-button" onClick={handleDownload}>
                Download
              </button>
              <button className="meme-action-button" onClick={handleCopy}>
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default MemeGenerator

