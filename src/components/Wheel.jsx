import { useState, useRef } from 'react'

function Wheel({ list, onSpinComplete }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const numSegments = list.length
  console.log(list, 'list')

  const segmentAngle = 360 / numSegments

  const colors = [
    '#ef4444', // red
    '#f59e0b', // amber
    '#10b981', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
  ]

  const handleSpin = () => {
    if (isSpinning || list.length === 0) return

    setIsSpinning(true)

    const randomIndex = Math.floor(Math.random() * list.length)
    const targetAmount = list[randomIndex]

    const fullRotations = 4 + Math.floor(Math.random() * 3) // 4-6 vòng

    const segmentCenterAngle = -90 + randomIndex * segmentAngle + Math.random() * segmentAngle
    const rotationToPointer = 270 - segmentCenterAngle

    const normalizedRotation = rotationToPointer < 0 ? rotationToPointer + 360 : rotationToPointer

    const currentRotation = rotation % 360
    const finalRotation = currentRotation + fullRotations * 360 + normalizedRotation
    console.log(finalRotation, 'finalRotation', segmentCenterAngle, randomIndex)
    setRotation(finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      if (onSpinComplete) {
        onSpinComplete(targetAmount, randomIndex)
      }
    }, 7000)
  }

  const createSegmentPath = (index, radius = 200) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)

    const x1 = radius + radius * Math.cos(startAngle)
    const y1 = radius + radius * Math.sin(startAngle)
    const x2 = radius + radius * Math.cos(endAngle)
    const y2 = radius + radius * Math.sin(endAngle)

    const largeArc = segmentAngle > 180 ? 1 : 0

    return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  const getTextPosition = (index, radius = 200) => {
    const centerAngle = (index + 0.5) * segmentAngle
    const angleRad = (centerAngle - 90) * (Math.PI / 180)
    const textRadius = numSegments > 20 ? radius * 0.7 : radius * 0.75
    const x = radius + textRadius * Math.cos(angleRad)
    const y = radius + textRadius * Math.sin(angleRad)
    const textRotationAngle = centerAngle - 90
    return { x, y, angle: textRotationAngle }
  }

  // Format số tiền ngắn gọn hơn để tránh đè lên nhau
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 0)}k`
    }
    return amount.toString()
  }

  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-4">📭</div>
        <p className="text-xl text-gray-700">Không còn phong bì nào trong danh sách!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-8">
      <div className="relative w-full max-w-md">
        <div className="relative w-full" style={{ aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            className="transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transition: isSpinning ? 'transform 7s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            }}
            ref={wheelRef}
          >
            {list.map((amount, index) => {
              const uniqueAmounts = [...new Set(list)].sort((a, b) => a - b)
              const amountIndex = uniqueAmounts.indexOf(amount)
              const color = colors[amountIndex % colors.length]

              let fontSize = "12"
              if (numSegments <= 8) fontSize = "16"
              else if (numSegments <= 12) fontSize = "14"
              else if (numSegments <= 20) fontSize = "12"
              else if (numSegments <= 30) fontSize = "11"
              else fontSize = "10"

              return (
                <g key={index}>
                  <path
                    d={createSegmentPath(index, 200)}
                    fill={color}
                    stroke="#fff"
                    strokeWidth="1"
                  />
                  <text
                    x={getTextPosition(index, 200).x}
                    y={getTextPosition(index, 200).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={fontSize}
                    fontWeight="bold"
                    transform={`rotate(${getTextPosition(index, 200).angle}, ${getTextPosition(index, 200).x}, ${getTextPosition(index, 200).y})`}
                    className="select-none"
                  >
                    {formatAmount(amount)}
                  </text>
                </g>
              )
            })}
          </svg>

          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-2 z-10"
            style={{
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '24px solid #1f2937',
            }}
          />
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <button
            onClick={handleSpin}
            disabled={isSpinning || list.length === 0}
            className={`px-6 md:px-8 py-3 md:py-4 text-xl md:text-2xl font-bold rounded-full transform transition-all duration-200 shadow-2xl ${isSpinning || list.length === 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 hover:scale-110 active:scale-95'
              }`}
          >
            {isSpinning ? '🎡 Đang quay...' : '🎡 Quay Ngay'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Wheel

