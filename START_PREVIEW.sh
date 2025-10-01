#!/bin/bash

echo "=========================================="
echo "🚀 Starting Farq Platform Preview"
echo "=========================================="
echo ""

# Kill any existing processes
echo "Cleaning up old processes..."
pkill -f "node server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 1

# Start API Server
echo "Starting API server on port 3000..."
cd /tmp/cc-agent/57807676/project/farq-main/api
npm start > /tmp/farq-api.log 2>&1 &
API_PID=$!
echo "API Server PID: $API_PID"
sleep 2

# Check API is running
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ API Server running on http://localhost:3000"
else
    echo "❌ API Server failed to start"
    cat /tmp/farq-api.log
    exit 1
fi

# Start Frontend
echo ""
echo "Starting Frontend dev server on port 5173..."
cd /tmp/cc-agent/57807676/project/farq-main/Frontend
npm run dev > /tmp/farq-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
sleep 3

# Check Frontend is running
if lsof -i :5173 > /dev/null 2>&1; then
    echo "✅ Frontend running on http://localhost:5173"
else
    echo "❌ Frontend failed to start"
    cat /tmp/farq-frontend.log
    exit 1
fi

echo ""
echo "=========================================="
echo "🎉 Farq Platform is Ready!"
echo "=========================================="
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 API: http://localhost:3000"
echo ""
echo "🎭 PROTOTYPE MODE - Sample data only"
echo ""
echo "Logs:"
echo "  API: tail -f /tmp/farq-api.log"
echo "  Frontend: tail -f /tmp/farq-frontend.log"
echo ""
echo "To stop servers:"
echo "  kill $API_PID $FRONTEND_PID"
echo ""
echo "=========================================="

# Keep script running
wait
