import { motion } from 'framer-motion'
import './CopyToast.css'

const CopyToast = ({ show }) => {
  return (
    <div className="copy-toast-wrapper">
      <motion.div
        className="copy-toast"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 5L7.5 14L3.5 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Copied!</span>
      </motion.div>
    </div>
  )
}

export default CopyToast

