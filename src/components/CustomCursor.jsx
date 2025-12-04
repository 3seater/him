import { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const letterCounterRef = useRef(0)

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return
    }
    
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Calculate distance from last letter position
      const dx = e.clientX - lastPositionRef.current.x
      const dy = e.clientY - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      const letters = ['H', 'I', 'M']
      const currentLetterIndex = letterCounterRef.current % 3
      const isStartingNewBundle = currentLetterIndex === 0
      
      // Require larger gap (150px) when starting a new "HIM" bundle, smaller gap (40px) between letters in same bundle
      const requiredDistance = isStartingNewBundle ? 150 : 40
      
      if (distance >= requiredDistance) {
        const letter = letters[currentLetterIndex]
        
        setTrail((prev) => {
          const newTrail = [...prev, { 
            x: e.clientX, 
            y: e.clientY, 
            id: Date.now() + Math.random(),
            letter: letter
          }]
          // Keep only last 12 trail points (4 sets of H I M)
          return newTrail.slice(-12)
        })
        
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
        letterCounterRef.current++
      }
    }

    window.addEventListener('mousemove', updateCursor)
    return () => window.removeEventListener('mousemove', updateCursor)
  }, [])

  // Remove old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.filter((point) => Date.now() - point.id < 1000))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {trail.map((point, index) => {
        const fadeProgress = index / Math.max(1, trail.length - 1)
        return (
          <div
            key={point.id}
            className="cursor-trail-text"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              opacity: Math.max(0, 1 - fadeProgress * 0.9),
              transform: `translate(-50%, -50%) scale(${Math.max(0.6, 1 - fadeProgress * 0.4)})`,
            }}
          >
            {point.letter}
          </div>
        )
      })}
    </>
  )
}

export default CustomCursor

