import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const memePhrases = [
    "he thinks he's him 😭😭",
    "i am literally him",
    "i'll never be him",
    "become him",
    "bro is him",
    "i am him",
    "we are HIM",
    "i am HIM",
    "bro thinks hes HIM"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting when chat opens
      setMessages([{
        id: 1,
        text: "Hello, my name is Himothy, how may I help you?",
        isBot: true
      }])
    }
  }, [isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Bot responds with random meme phrase
    setTimeout(() => {
      const randomPhrase = memePhrases[Math.floor(Math.random() * memePhrases.length)]
      const botMessage = {
        id: Date.now() + 1,
        text: randomPhrase,
        isBot: true
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  return (
    <>
      {!isOpen && (
        <button 
          className="chat-bubble-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
            <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="currentColor"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-content">
              <span className="chat-bot-name">Himothy</span>
              <span className="chat-status">Online</span>
            </div>
            <button 
              className="chat-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`chat-message ${message.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
              >
                {message.isBot && (
                  <div className="chat-avatar">H</div>
                )}
                <div className="chat-message-content">
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button type="submit" className="chat-send-button" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBot

