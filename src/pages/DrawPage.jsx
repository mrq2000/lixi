import { useState, useEffect, useMemo } from 'react'
import { getLuckyMoneyList, removeFromList, getDrawMode } from '../utils/storage'
import Decorations from '../components/Decorations'
import { useIsMobile } from '../hooks/useIsMobile'
import { getEnvelopeImage, ENVELOPE_IMAGES, formatAmount } from '../utils/envelopeUtils'
import DrawPageMobile from './DrawPageMobile'
import DrawPageDesktop from './DrawPageDesktop'
import Wheel from '../components/Wheel'

function DrawPage() {
  const [list, setList] = useState([])
  const [drawnAmount, setDrawnAmount] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [drawMode, setDrawMode] = useState('regular')
  const isMobile = useIsMobile()

  const randomEnvelopeImages = useMemo(() => {
    return [...ENVELOPE_IMAGES].sort(() => Math.random() - 0.5)
  }, [])

  useEffect(() => {
    loadList()
    const mode = getDrawMode()
    setDrawMode(mode)
  }, [])

  const loadList = () => {
    const savedList = getLuckyMoneyList()
    setList(savedList)
    setShowResult(false)
    setDrawnAmount(null)
    setSelectedIndex(null)
    setSelectedImage(null)
    setActiveIndex(null)
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
    if (!isMobile) {
      setActiveIndex(index)
    }
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

  const handleWheelSpinComplete = (amount, index) => {
    const image = getEnvelopeImage(index, randomEnvelopeImages)
    setSelectedIndex(index)
    setSelectedImage(image)
    setDrawnAmount({ amount, index })
    setShowResult(true)
    createConfetti()
  }


  return (
    <div className="relative py-8 px-4">
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
        ) : drawMode === 'wheel' ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 mb-4">
            <Wheel list={list} onSpinComplete={handleWheelSpinComplete} />
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 mb-4">
            <p className="text-center text-lg md:text-xl text-gray-700 mb-4 md:mb-8">
              {isMobile ? (
                <>👈 Vuốt trái/phải để chọn lì xì 👉</>
              ) : (
                <>👆 Chọn một phong bao lì xì để rút thăm</>
              )}
            </p>
            {isMobile ? (
              <DrawPageMobile
                list={list}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                showResult={showResult}
                randomEnvelopeImages={randomEnvelopeImages}
                onEnvelopeClick={handleEnvelopeClick}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            ) : (
              <DrawPageDesktop
                list={list}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                showResult={showResult}
                randomEnvelopeImages={randomEnvelopeImages}
                onEnvelopeClick={handleEnvelopeClick}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
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
