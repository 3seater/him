import { useState, useEffect } from 'react'
import './TypewriterText.css'

const TypewriterText = () => {
  const texts = [
    { prefix: 'we are ', bold: 'HIM' },
    { prefix: 'i am ', bold: 'HIM' },
    { prefix: 'bro thinks hes ', bold: 'HIM' },
    { prefix: 'become ', bold: 'HIM' },
    { prefix: "i'll never be ", bold: 'HIM' }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[currentIndex]
    const fullText = currentText.prefix + currentText.bold

    const typeSpeed = isDeleting ? 36 : 72 // Slower typing/deletion (20% slower)
    const pauseTime = isDeleting ? 360 : 1800 // Longer pause (20% slower)

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        setDisplayText(fullText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(fullText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentIndex])

  const currentText = texts[currentIndex]
  const prefixLength = currentText.prefix.length
  const displayedPrefix = displayText.substring(0, prefixLength)
  const displayedBold = displayText.substring(prefixLength)

  return (
    <h1 className="typewriter-text">
      <span className="typewriter-prefix">{displayedPrefix}</span>
      <span className="typewriter-bold">{displayedBold}</span>
      <span className="typewriter-cursor"></span>
    </h1>
  )
}

export default TypewriterText

