import { useState } from 'react'
import CopyToast from './CopyToast'
import './ContractAddress.css'

const ContractAddress = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastKey, setToastKey] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  
  // Blurred placeholder Solana CA
  const contractAddress = 'So11111111111111111111111111111111111111112'

  const handleCopy = async () => {
    // Show toast feedback
    setShowToast(true)
    setToastKey(prev => prev + 1)
    setIsCopied(true)
    
    setTimeout(() => {
      setShowToast(false)
      setTimeout(() => {
        setIsCopied(false)
      }, 100)
    }, 2000)
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(contractAddress)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  return (
    <>
      <CopyToast key={toastKey} show={showToast} />
      <div className="contract-address-container">
        <div className="contract-address-text">
          <span className="contract-address-label">CA:</span>
          <span className="contract-address-value">{contractAddress}</span>
        </div>
        <button
          className="contract-address-copy-button"
          onClick={handleCopy}
          aria-label="Copy contract address"
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
    </>
  )
}

export default ContractAddress

