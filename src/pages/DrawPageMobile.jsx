import { useState, useEffect, useRef } from 'react'
import EnvelopeItem from '../components/EnvelopeItem'
import { getEnvelopeImage, getFanStyle, getLeftPercent } from '../utils/envelopeUtils'

function DrawPageMobile({
  list,
  activeIndex,
  setActiveIndex,
  showResult,
  randomEnvelopeImages,
  onEnvelopeClick,
  onConfirm,
  onCancel,
}) {
  const scrollContainerRef = useRef(null)
  const envelopesContainerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const startActiveIndex = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle scroll để tạo hiệu ứng di chuyển theo elip trên mobile
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth - container.clientWidth
      const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0
      setScrollProgress(progress)
    }

    handleScroll()
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('touchmove', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('touchmove', handleScroll)
    }
  }, [list.length])

  // Handle swipe gestures cho mobile
  useEffect(() => {
    const container = envelopesContainerRef.current
    if (!container) return

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      touchStartX.current = touch.clientX
      touchStartY.current = touch.clientY
      // Lưu index ban đầu khi bắt đầu vuốt
      startActiveIndex.current = activeIndex === null ? 0 : activeIndex
    }

    const handleTouchMove = (e) => {
      if (touchStartX.current === null || touchStartY.current === null) return
      if (showResult || list.length === 0) return
      if (startActiveIndex.current === null) return

      const touch = e.touches[0]
      const currentX = touch.clientX
      const currentY = touch.clientY
      const deltaX = currentX - touchStartX.current
      const deltaY = currentY - touchStartY.current

      // Chỉ xử lý swipe ngang (deltaX lớn hơn deltaY)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        // Tính toán số index dựa trên khoảng cách vuốt từ điểm bắt đầu
        // Mỗi 100px vuốt = 1 index, càng xa càng nhiều
        const indexChange = Math.floor(Math.abs(deltaX) / 100)
        const baseIndex = startActiveIndex.current

        let newIndex
        if (deltaX < 0) {
          // Vuốt sang trái - tăng activeIndex
          newIndex = Math.min(baseIndex + indexChange, list.length - 1)
        } else {
          // Vuốt sang phải - giảm activeIndex
          newIndex = Math.max(baseIndex - indexChange, 0)
        }

        setActiveIndex(newIndex)
      }
    }

    const handleTouchEnd = (e) => {
      touchStartX.current = null
      touchStartY.current = null
      startActiveIndex.current = null
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex, list.length, showResult, setActiveIndex])

  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-4">📭</div>
        <p className="text-xl text-gray-700">Không còn phong bì nào trong danh sách!</p>
      </div>
    )
  }

  const scrollWidth = Math.max(list.length * 600, typeof window !== 'undefined' ? window.innerWidth * 5 : 5000)

  return (
    <>
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
        style={{ 
          width: '100%', 
          minHeight: '300px', 
          // perspective: '1000px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {list.map((amount, index) => {
          let leftPercent = getLeftPercent(index, list.length)
          
          if (activeIndex !== null) {
            const activeOffset = index - activeIndex
            leftPercent = 50 + (activeOffset * 25)
          }
          
          return (
            <div
              key={index}
              data-envelope-index={index}
              style={{
                
                position: 'absolute',
                left: `${leftPercent}%`,
                bottom: 0,
                transform: 'translateX(-50%)',
                pointerEvents: 'auto',
                transition: '0.3s ease-in-out',
              }}
            >
              <EnvelopeItem
                index={index}
                imageUrl={getEnvelopeImage(index, randomEnvelopeImages)}
                fanStyle={getFanStyle(index, list.length, true, scrollProgress, activeIndex)}
                leftPercent={0}
                isActive={activeIndex === index}
                onClick={onEnvelopeClick}
                onConfirm={onConfirm}
                onCancel={onCancel}
                isMobile={true}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DrawPageMobile

