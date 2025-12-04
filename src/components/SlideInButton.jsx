import { motion } from 'framer-motion'
import './SlideInButton.css'

const SlideInButton = ({ label, link }) => {
  return (
    <motion.a
      href={link}
      className="slide-in-button"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="slide-in-button-text">{label}</span>
    </motion.a>
  )
}

export default SlideInButton

