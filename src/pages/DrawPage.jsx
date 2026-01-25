import { useState, useEffect, useRef, useMemo } from 'react'
import { getLuckyMoneyList, removeFromList } from '../utils/storage'
import Decorations from '../components/Decorations'
import EnvelopeItem from '../components/EnvelopeItem'
import { useIsMobile } from '../hooks/useIsMobile'
import { getEnvelopeImage, ENVELOPE_IMAGES, getFanStyle, getLeftPercent, formatAmount } from '../utils/envelopeUtils'

function DrawPage() {
  const [list, setList] = useState([])
  const [drawnAmount, setDrawnAmount] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef(null)
  const envelopesContainerRef = useRef(null)
  const isMobile = useIsMobile();

  const randomEnvelopeImages = useMemo(() => {
    return [...ENVELOPE_IMAGES].sort(() => Math.random() - 0.5)
  }, [])

  useEffect(() => {
    loadList()
  }, [])

  // Handle scroll để tạo hiệu ứng di chuyển theo elip trên mobile
  useEffect(() => {
    if (!isMobile) return
    
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth - container.clientWidth
      const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0
      setScrollProgress(progress)
    }

    // Trigger initial calculation
    handleScroll()
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('touchmove', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('touchmove', handleScroll)
    }
  }, [list.length, isMobile])

  // Handle click outside để xóa activeIndex
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showResult || activeIndex === null) return

      const container = envelopesContainerRef.current
      if (container && !container.contains(event.target)) {
        setActiveIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [activeIndex, showResult])

  const loadList = () => {
    const savedList = getLuckyMoneyList()
    setList(savedList)
    setShowResult(false)
    setDrawnAmount(null)
    setSelectedIndex(null)
    setSelectedImage(null)
    setActiveIndex(null)
    setScrollProgress(0)
  }

  const createConfetti = () => {
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']
    const newConfetti = []
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
      })
    }
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }

  const handleEnvelopeClick = (index) => {
    if (showResult) return
    // Chỉ set active, không chọn luôn
    setActiveIndex(index)
  }

  const handleConfirm = (index) => {
    if (showResult) return

    const currentList = getLuckyMoneyList()
    if (index >= 0 && index < currentList.length) {
      const amount = currentList[index]
      const image = getEnvelopeImage(index, randomEnvelopeImages)
      setSelectedIndex(index)
      setSelectedImage(image)
      setDrawnAmount({ amount, index })
      setShowResult(true)
      setActiveIndex(null)
      createConfetti()
    }
  }

  const handleCancel = () => {
    setActiveIndex(null)
  }

  const handleRemove = () => {
    if (!drawnAmount) return

    const currentList = getLuckyMoneyList()
    let index = drawnAmount.index
    
    if (index < 0 || index >= currentList.length) {
      index = currentList.findIndex(amt => amt === drawnAmount.amount)
    }

    if (index !== -1) {
      const newList = removeFromList(index)
      setList(newList)
      setDrawnAmount(null)
      setShowResult(false)
      setSelectedIndex(null)
      setSelectedImage(null)
      setActiveIndex(null)
      alert('Đã xóa phong bì khỏi danh sách!')
    }
  }

  // Render envelopes
  const renderEnvelopes = () => {
    if (list.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-8xl mb-4">📭</div>
          <p className="text-xl text-gray-700">Không còn phong bì nào trong danh sách!</p>
        </div>
      )
    }

    if (isMobile) {
      const scrollWidth = Math.max(list.length * 600, typeof window !== 'undefined' ? window.innerWidth * 5 : 5000)
      
      return (
        <>
          {/* Scroll container để trigger scroll event */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto smooth-scroll -mx-4 px-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              height: '80px',
              overflowY: 'hidden',
              position: 'relative',
              width: 'calc(100% + 2rem)',
              marginLeft: '-1rem',
              marginRight: '-1rem',
            }}
          >
            <div
              style={{
                width: `${scrollWidth}px`,
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
          </div>

          <div
            ref={envelopesContainerRef}
            className="relative mx-auto flex justify-center items-end"
            style={{ width: '100%', minHeight: '300px', perspective: '1000px', overflow: 'hidden' }}
          >
            {list.map((amount, index) => (
              <EnvelopeItem
                key={index}
                index={index}
                imageUrl={getEnvelopeImage(index, randomEnvelopeImages)}
                fanStyle={getFanStyle(index, list.length, true, scrollProgress)}
                leftPercent={getLeftPercent(index, list.length)}
                isActive={activeIndex === index}
                onClick={handleEnvelopeClick}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isMobile={true}
              />
            ))}
          </div>

          {list.length > 5 && (
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500 animate-pulse">👈 Vuốt để xem thêm 👉</p>
            </div>
          )}
        </>
      )
    }

    return (
      <div
        ref={envelopesContainerRef}
        className="flex justify-center items-end relative"
        style={{ minHeight: '400px', perspective: '1000px' }}
      >
        {list.map((amount, index) => (
          <EnvelopeItem
            key={index}
            index={index}
            imageUrl={getEnvelopeImage(index, randomEnvelopeImages)}
            fanStyle={getFanStyle(index, list.length)}
            leftPercent={getLeftPercent(index, list.length)}
            isActive={activeIndex === index}
            onClick={handleEnvelopeClick}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isMobile={false}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen py-8 px-4">
      <Decorations />

      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti"
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-2 md:mb-4 animate-scale-in">
            🎲 Rút Thăm Lì Xì 🎲
          </h1>
          <p className="text-lg md:text-xl text-red-600 mb-2">
            Còn lại: <span className="font-bold text-xl md:text-2xl">{list.length}</span> phong bì
          </p>
        </div>

        {showResult && selectedImage ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 mb-6">
            <div className="text-center py-4 md:py-8 animate-scale-in">
              <div className="mb-4 md:mb-6 animate-bounce-slow flex justify-center">
                <img
                  src={selectedImage}
                  alt="Phong bao lì xì"
                  className="w-32 h-auto md:w-48 md:h-64 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl p-4 md:p-8 mb-4 md:mb-6 transform animate-scale-in">
                <p className="text-2xl md:text-3xl mb-2 md:mb-4">Chúc mừng!</p>
                <p className="text-4xl md:text-6xl font-bold">{formatAmount(drawnAmount.amount)} VND</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button
                  onClick={handleRemove}
                  className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-white text-lg md:text-xl font-bold rounded-xl hover:bg-orange-600 active:bg-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Nhận lì xì
                </button>
                <button
                  onClick={() => {
                    setShowResult(false)
                    setDrawnAmount(null)
                    setSelectedIndex(null)
                    setSelectedImage(null)
                    setActiveIndex(null)
                  }}
                  className="px-6 md:px-8 py-3 md:py-4 bg-green-500 text-white text-lg md:text-xl font-bold rounded-xl hover:bg-green-600 active:bg-green-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Chọn Lại
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 mb-4">
            <p className="text-center text-lg md:text-xl text-gray-700 mb-4 md:mb-8">
              👆 Chọn một phong bao lì xì để rút thăm
            </p>
            {renderEnvelopes()}
          </div>
        )}

        {list.length === 0 && !showResult && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
            <p className="text-xl text-yellow-800 mb-4">⚠️ Không còn phong bì nào trong danh sách!</p>
            <p className="text-lg text-yellow-700">Vui lòng quay lại trang thiết lập để thêm phong bì mới.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DrawPage
