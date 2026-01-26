const EnvelopeItem = ({ 
  index, 
  imageUrl, 
  fanStyle, 
  leftPercent, 
  isActive, 
  onClick,
  onConfirm,
  onCancel,
  isMobile = false 
}) => {
  const imageWidth = isMobile 
    ? (isActive ? 'w-48' : 'w-32')
    : (isActive ? 'w-60' : 'w-40 md:w-48')
  
  const marginLeft = isMobile
    ? (isActive ? '-96px' : '-60px')
    : (isActive ? '-120px' : '-100px')

  // Nếu leftPercent là 0 và mobile, dùng relative positioning vì đã được wrap trong div định vị
  const useRelativePosition = isMobile && leftPercent === 0
  
  return (
    <button
      onClick={() => onClick(index)}
      className={`${useRelativePosition ? 'relative' : 'absolute'} group cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-150 z-[9999]' : isMobile ? '' : 'hover:scale-[1.15]'
      } ${isMobile ? 'active:scale-95' : ''}`}
      style={{
        ...fanStyle,
        ...(useRelativePosition ? {} : { left: `${leftPercent}%` }),
        bottom: useRelativePosition ? 'auto' : '0',
        marginLeft: isMobile ? '0' : marginLeft,
        zIndex: isActive ? 9999 : Math.round(fanStyle.zIndex),
        transition: '0.3s ease-in-out',
      }}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={`Phong bao lì xì ${index + 1}`}
          className={`h-auto object-contain drop-shadow-xl transition-all duration-300 ${imageWidth} ${
            !isMobile ? 'group-hover:drop-shadow-2xl' : ''
          }`}
          style={{
            filter: isActive
              ? `drop-shadow(0 ${isMobile ? '10px' : '20px'} ${isMobile ? '20px' : '40px'} rgba(251, 191, 36, 0.8))`
              : isMobile
              ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
              : 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))',
          }}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23dc2626" width="200" height="300" rx="10"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fbbf24" font-size="60" font-weight="bold"%3E🧧%3C/text%3E%3C/svg%3E'
          }}
        />
        {
          !isMobile && (
            <div className={`absolute inset-0 bg-yellow-300/50 rounded-lg transition-opacity duration-300 blur-2xl -z-10 scale-110 ${
              isActive ? 'opacity-100' : 'opacity-0 group-active:opacity-100'
            }`}></div>
          )
        }
        {isActive && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onConfirm(index)
              }}
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
            >
              Chọn 
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCancel()
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </button>
  )
}

export default EnvelopeItem

