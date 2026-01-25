const STORAGE_KEY = 'lixi_lucky_money_list'

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

