function Decorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Lanterns */}
      <div className="absolute top-10 left-10 animate-float">
        <div className="text-4xl">🏮</div>
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="text-4xl">🏮</div>
      </div>
      
      {/* Peach blossoms */}
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="text-3xl">🌸</div>
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="text-3xl">🌸</div>
      </div>
      
      {/* Firecrackers */}
      <div className="absolute top-32 left-1/4 animate-bounce-slow">
        <div className="text-2xl">🧨</div>
      </div>
      <div className="absolute top-40 right-1/3 animate-bounce-slow" style={{ animationDelay: '0.3s' }}>
        <div className="text-2xl">🧨</div>
      </div>
    </div>
  )
}

export default Decorations

