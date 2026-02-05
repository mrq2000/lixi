const STORAGE_KEY = 'lixi_lucky_money_list'
const DRAW_MODE_KEY = 'lixi_draw_mode'

export const saveLuckyMoneyList = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getLuckyMoneyList = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export const removeFromList = (index) => {
  const list = getLuckyMoneyList()
  const newList = list.filter((_, i) => i !== index)
  saveLuckyMoneyList(newList)
  return newList
}

export const saveDrawMode = (mode) => {
  try {
    localStorage.setItem(DRAW_MODE_KEY, mode)
  } catch (error) {
    console.error('Error saving draw mode:', error)
  }
}

export const getDrawMode = () => {
  try {
    return localStorage.getItem(DRAW_MODE_KEY) || 'regular'
  } catch (error) {
    console.error('Error reading draw mode:', error)
    return 'regular'
  }
}

