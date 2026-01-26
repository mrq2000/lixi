import { useEffect, useRef } from 'react'
import EnvelopeItem from '../components/EnvelopeItem'
import { getEnvelopeImage, getFanStyle, getLeftPercent } from '../utils/envelopeUtils'

function DrawPageDesktop({
  list,
  activeIndex,
  setActiveIndex,
  showResult,
  randomEnvelopeImages,
  onEnvelopeClick,
  onConfirm,
  onCancel,
}) {
  const envelopesContainerRef = useRef(null)

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeIndex, showResult, setActiveIndex])

  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-4">📭</div>
        <p className="text-xl text-gray-700">Không còn phong bì nào trong danh sách!</p>
      </div>
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
          onClick={onEnvelopeClick}
          onConfirm={onConfirm}
          onCancel={onCancel}
          isMobile={false}
        />
      ))}
    </div>
  )
}

export default DrawPageDesktop

