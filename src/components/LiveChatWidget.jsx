import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'أهلاً بيك في ماك مصر! 🍔 إزاي نقدر نساعدك النهاردة؟', sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Fake bot reply
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: 'شكراً لرسالتك! الدعم الفني هيتواصل معاك في أقرب وقت ممكن. محتاج مساعدة في حاجة تانية؟', sender: 'bot' }
      ])
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ direction: 'rtl' }}>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-[340px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '480px', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between text-white shrink-0"
              style={{ background: 'linear-gradient(135deg,#DA291C,#b01f15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-md">
                  🍟
                </div>
                <div>
                  <h3 className="font-black text-base leading-none">مساعد الدعم الفني</h3>
                  <p className="text-white/75 text-xs mt-1">عادةً بنرد خلال دقايق</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-tr-sm text-white'
                        : 'rounded-tl-sm bg-white text-gray-800 shadow-sm border border-gray-100'
                    }`}
                    style={{
                      background: msg.sender === 'user' ? '#DA291C' : 'white',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="اكتب رسالتك هنا..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pr-4 pl-12 text-sm focus:outline-none focus:border-[#DA291C] focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute top-1 bottom-1 left-1 w-10 flex items-center justify-center rounded-full transition-colors
                    disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 text-white"
                  style={{ background: inputValue.trim() ? '#DA291C' : '' }}
                >
                  <svg className="w-5 h-5 -ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-2xl relative"
        style={{
          background: 'linear-gradient(135deg,#DA291C,#b01f15)',
          color: 'white',
          boxShadow: '0 8px 30px rgba(218,41,28,0.4)',
        }}
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#FFC72C] border-2 border-white rounded-full" />
        )}
      </motion.button>

    </div>
  )
}

export default LiveChatWidget
