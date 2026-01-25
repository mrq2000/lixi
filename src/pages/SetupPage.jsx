import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveLuckyMoneyList, getLuckyMoneyList } from '../utils/storage'
import Decorations from '../components/Decorations'

const AMOUNTS = [50000, 100000, 200000, 500000]

function SetupPage() {
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({
    50000: 0,
    100000: 0,
    200000: 0,
    500000: 0,
  })
  const [totalEnvelopes, setTotalEnvelopes] = useState(0)

  useEffect(() => {
    // Load existing data if available
    const existingList = getLuckyMoneyList()
    if (existingList.length > 0) {
      // Count quantities from existing list
      const counts = { 50000: 0, 100000: 0, 200000: 0, 500000: 0 }
      existingList.forEach((amount) => {
        if (counts[amount] !== undefined) {
          counts[amount]++
        }
      })
      setQuantities(counts)
      setTotalEnvelopes(existingList.length)
    }
  }, [])

  const handleQuantityChange = (amount, value) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    setQuantities((prev) => ({
      ...prev,
      [amount]: numValue,
    }))
  }

  // Hàm xáo trộn mảng (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const generateList = () => {
    const list = []
    AMOUNTS.forEach((amount) => {
      for (let i = 0; i < quantities[amount]; i++) {
        list.push(amount)
      }
    })
    // Xáo trộn danh sách để thứ tự random
    return shuffleArray(list)
  }

  const handleSave = () => {
    const list = generateList()
    saveLuckyMoneyList(list)
    setTotalEnvelopes(list.length)
    alert(`Đã lưu ${list.length} phong bì lì xì! 🎉`)
  }

  const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="relative min-h-screen py-8 px-4">
      <Decorations />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-red-700 mb-4 animate-scale-in">
            🧧 Thiết Lập Lì Xì 🧧
          </h1>
          <p className="text-xl text-red-600">Nhập số lượng phong bì cho từng mệnh giá</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="space-y-6">
            {AMOUNTS.map((amount) => (
              <div
                key={amount}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-red-50 rounded-xl border-2 border-red-200 hover:border-red-400 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <span className="text-3xl">🧧</span>
                  <span className="text-2xl font-bold text-red-700">
                    {amount.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(amount, quantities[amount] - 1)
                    }
                    className="w-10 h-10 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors cursor-pointer"
                    disabled={quantities[amount] === 0}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={quantities[amount]}
                    onChange={(e) =>
                      handleQuantityChange(amount, e.target.value)
                    }
                    className="w-20 text-center text-xl font-bold text-red-700 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(amount, quantities[amount] + 1)
                    }
                    className="w-10 h-10 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-xl border-2 border-red-300">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-800 mb-2">
                Tổng số phong bì: {total}
              </p>
              <p className="text-lg text-red-700">
                Tổng giá trị: {AMOUNTS.reduce((sum, amount) => sum + amount * quantities[amount], 0).toLocaleString('vi-VN')} VND
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
            >
              💾 Lưu Danh Sách
            </button>
            <button
              onClick={() => navigate('/draw')}
              className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
            >
              🎲 Đến Trang Rút Thăm
            </button>
          </div>
        </div>

        {totalEnvelopes > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
            <p className="text-lg text-yellow-800">
              📋 Hiện có <span className="font-bold">{totalEnvelopes}</span> phong bì trong danh sách
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SetupPage

