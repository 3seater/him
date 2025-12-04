import SlideInButton from './components/SlideInButton'
import Gallery from './components/Gallery'
import TypewriterText from './components/TypewriterText'
import ContractAddress from './components/ContractAddress'
import Copyright from './components/Copyright'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import MemeGenerator from './components/MemeGenerator'
import Preloader from './components/Preloader'
import './App.css'

function App() {
  return (
    <div className="app">
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
          <div className="buttons-container">
            <SlideInButton label="pump.fun" link="https://pump.fun" />
            <SlideInButton label="lore" link="https://knowyourmeme.com/memes/bro-thinks-hes-him-im-him" />
            <SlideInButton label="twitter" link="https://x.com/tickerHIM" />
          </div>
      
          <TypewriterText />
          
          <ContractAddress />
          
          <Gallery />
      
      <MemeGenerator />
      
      <Copyright />
    </div>
  )
}

export default App

