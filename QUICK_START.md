# Quick Start Guide

## 🚀 Get the Preview Running

### Method 1: Automatic (Recommended)

The dev server should start automatically. Just open your browser to:

**http://localhost:5173**

Both servers are already running:
- ✅ API Server: http://localhost:3000
- ✅ Frontend: http://localhost:5173

---

### Method 2: Manual Start (if needed)

If preview isn't working, run these commands:

```bash
# 1. Start API Server (Terminal 1)
cd farq-main/api
npm install
npm start

# 2. Start Frontend (Terminal 2)
cd farq-main/Frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## 🎯 What to Test

Once the preview loads, try these interactions:

### Quick Tests (30 seconds)
1. **Click category** (e.g., "Asian") → Filters restaurants
2. **Type in search** (e.g., "burger") → Real-time filter
3. **Click any restaurant card** → Opens detail modal
4. **Click "Order" button** → Shows prototype alert
5. **Toggle language** (top-right) → Switches to Arabic

### Full Demo (3 minutes)
See **TESTING_GUIDE.md** for complete testing checklist

---

## 🐛 Troubleshooting

### Preview Not Loading?

**Check if servers are running:**
```bash
# Check API (should show process)
lsof -i :3000

# Check Frontend (should show process)
lsof -i :5173
```

**Restart servers:**
```bash
# Kill all processes
pkill -f "node server.js"
pkill -f vite

# Start API
cd farq-main/api
npm start

# Start Frontend (new terminal)
cd farq-main/Frontend
npm run dev
```

**Check logs:**
```bash
# API logs
cd farq-main/api
npm start

# Frontend logs
cd farq-main/Frontend
npm run dev
```

### Still Not Working?

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Try incognito/private mode**
3. **Check browser console** (F12) for errors
4. **Verify ports aren't blocked** by firewall
5. **Try a different port** (edit vite.config.ts)

---

## 📱 View on Mobile

### Option 1: Network Preview
When Vite starts, it shows a network URL:
```
Local:   http://localhost:5173
Network: http://192.168.x.x:5173
```

Open the Network URL on your phone (must be same WiFi)

### Option 2: Browser DevTools
1. Press F12 in browser
2. Click device icon (toggle device toolbar)
3. Select mobile device from dropdown

---

## 🎨 Features to Showcase

### Interactive Elements
- ✅ 50+ clickable buttons and cards
- ✅ Real-time search (type to filter)
- ✅ Category filters (9 cuisines)
- ✅ Sort dropdown (Distance/Price/Rating)
- ✅ Restaurant detail modal
- ✅ Toast notifications
- ✅ Loading states
- ✅ Language toggle (EN/AR)

### Prototype Data
- 20 sample restaurants
- Mock delivery fees (4-18 SAR)
- Simulated ratings and distances
- Multiple delivery partners

---

## 🎬 Demo Script (for presentations)

**60-Second Demo:**

1. "This is Farq - comparing delivery fees across platforms"
2. [Click Asian] "Users can filter by cuisine"
3. [Type "sushi"] "Or search in real-time"
4. [Click card] "Each restaurant shows all delivery options"
5. [Show modal] "With the best price highlighted"
6. [Click Order] "And easy ordering" (shows prototype alert)
7. [Toggle language] "Supports English and Arabic"

**Done!** ✨

---

## 📊 System Status

### Currently Running
- ✅ API Server (Port 3000) - Mock data endpoints
- ✅ Frontend (Port 5173) - Interactive UI
- ✅ Build Status: Successful
- ✅ Dependencies: Installed

### Prototype Mode
- 🎭 Using mock restaurant data
- 🎭 Simulated delivery fees
- 🎭 No real API calls
- 🎭 Safe for demonstrations

---

## 🔗 Important Files

- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **INTERACTIVE_FEATURES.md** - All 50+ interactive elements
- **TESTING_GUIDE.md** - Detailed testing checklist
- **PROTOTYPE_README.md** - Overview and data changes

---

## 💡 Tips

1. **Use test mode**: Add `?test=true` to URL for instant loading
2. **Clear search**: Delete all text to show all restaurants
3. **Keyboard navigation**: Press Tab to navigate, Enter to activate
4. **Mobile**: Resize browser or use DevTools device mode
5. **Arabic**: Click language toggle to see RTL layout

---

## ✅ Success!

If you can see the Farq interface with:
- Orange "PROTOTYPE" banner at top
- Search bar and category buttons
- Restaurant cards displaying
- Everything clickable with hover effects

**Then it's working perfectly!** 🎉

---

Need help? Check the detailed guides:
- **TESTING_GUIDE.md** - Complete testing instructions
- **INTERACTIVE_FEATURES.md** - Every interactive element documented

**Preview URL: http://localhost:5173**
