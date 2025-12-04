import './Copyright.css'

const Copyright = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="copyright">
      <span className="copyright-symbol">©</span>
      <span className="copyright-year">{currentYear}</span>
      <span className="copyright-text">$HIM</span>
    </footer>
  )
}

export default Copyright

