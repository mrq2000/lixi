import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧧</span>
            <span className="text-white font-bold text-xl">Lì Xì</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-red-700 text-white'
                  : 'text-red-100 hover:bg-red-700/50'
              }`}
            >
              Thiết Lập
            </Link>
            <Link
              to="/draw"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/draw'
                  ? 'bg-red-700 text-white'
                  : 'text-red-100 hover:bg-red-700/50'
              }`}
            >
              Rút Thăm
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

