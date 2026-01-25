# 🧧 Lì Xì - Vietnamese Lunar New Year Lucky Money App

A festive web application for managing and drawing Vietnamese Lunar New Year (Tết) lucky money envelopes. Built with Vite, React, TailwindCSS, and React Router.

## ✨ Features

- **Setup Page**: Input quantities for different VND amounts (50,000₫, 100,000₫, 200,000₫, 500,000₫)
- **Draw Page**: Randomly select a lucky money envelope with festive animations
- **LocalStorage Persistence**: All data is saved automatically in the browser
- **Festive Design**: Red theme with Vietnamese Tết decorations (lanterns, peach blossoms, firecrackers)
- **Responsive**: Works beautifully on mobile and desktop devices
- **Animations**: Cute scale, shake, and confetti animations for a joyful experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Usage

### Setup Page

1. Navigate to the Setup page (default)
2. Enter the quantity of red envelopes for each amount:
   - 50,000 VND
   - 100,000 VND
   - 200,000 VND
   - 500,000 VND
3. Click "Lưu Danh Sách" (Save List) to save your configuration
4. The total number of envelopes and total value will be displayed

### Draw Page

1. Navigate to the Draw page
2. Click "🎲 Rút Thăm" (Draw Lucky Money) button
3. Wait for the animation to complete
4. See your lucky money amount with confetti celebration!
5. Click "🗑️ Xóa Phong Bì Này" (Remove This Envelope) to remove it from the list
6. Or click "🔄 Rút Lại" (Draw Again) to draw another envelope

## 🎨 Design Features

- **Red Theme**: Primary color scheme inspired by Vietnamese Tết traditions
- **Decorative Elements**: Animated lanterns, peach blossoms, and firecrackers
- **Smooth Animations**: Scale, shake, and confetti effects
- **Responsive Layout**: Optimized for all screen sizes

## 🛠️ Tech Stack

- **Vite**: Fast build tool and dev server
- **React**: UI library
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **LocalStorage**: Client-side data persistence

## 📝 Data Storage

All lucky money data is stored in the browser's localStorage under the key `lixi_lucky_money_list`. The data persists across browser sessions.

## 🎉 Happy Tết!

Chúc mừng năm mới! (Happy New Year!)

