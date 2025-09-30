# FARQ - PROTOTYPE VERSION

**⚠️ THIS IS A DEMONSTRATION VERSION WITH SAMPLE DATA ONLY ⚠️**

## Overview

This is a prototype version of the Farq food delivery comparison platform, configured for demonstration and partner sharing purposes. All sensitive data and real API integrations have been removed and replaced with mock data.

## What Has Been Changed

### 1. API Integration
- **REMOVED**: Real API calls to TheChefz and ToYou platforms
- **REPLACED WITH**: Mock API services that simulate responses
- Files added:
  - `api/mock-chefz-api.js` - Simulates TheChefz API
  - `api/mock-toyou-api.js` - Simulates ToYou API
  - `api/mock-restaurants-data.js` - Contains 20+ sample restaurants

### 2. Authentication Credentials
- **REMOVED**: All real authentication tokens and session IDs
- **REPLACED WITH**: Dummy placeholder tokens clearly marked as "DEMO" and "PROTOTYPE"
- Modified: `.env` file with safe, non-functional credentials

### 3. Data
- **REMOVED**: Live restaurant data from external APIs
- **REPLACED WITH**: Realistic sample data including:
  - 20 fictional restaurants with diverse cuisines
  - Mock delivery fees ranging from 4-18 SAR
  - Realistic ratings, distances, and review counts
  - Stock images from Pexels (free to use)

### 4. User Interface
- **ADDED**: Orange banner at top of all pages clearly stating "PROTOTYPE - SAMPLE DATA ONLY"
- Banner appears in both English and Arabic
- Server console displays prototype warnings on startup

## Sample Data Summary

### Restaurants Included
- 20 diverse restaurants covering multiple cuisines:
  - Arabic (Golden Spoon, Royal Shawarma, Flame Kebab)
  - Asian (Sushi World, Dragon Wok, Thai Orchid, Seoul Street Food)
  - Italian (Pasta Palace, Pizza Paradise)
  - Mexican (Taco Fiesta)
  - Healthy (Green Leaf Kitchen)
  - Grill/BBQ (BBQ Masters)
  - Indian (Curry House, Biryani Palace)
  - French (French Bistro Le Petit)
  - Fast Food (Burger Boulevard, Crispy Fried Chicken)

### Mock Delivery Services
- The Chefz (delivery fees: 4-16 SAR)
- To You (delivery fees: 5-18 SAR)

## Running the Prototype

### Backend API
```bash
cd api
npm install
npm start
```

Server will start with clear "PROTOTYPE MODE" warnings.

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

Frontend displays orange banner indicating sample data.

## System Functionality

All original features remain functional:
- Restaurant search and filtering
- Delivery fee comparison between platforms
- Location-based results (simulated)
- Multi-language support (English/Arabic)
- Responsive design
- Queue-based request processing

## Data Privacy & Security

✅ **NO REAL DATA INCLUDED**
- No actual restaurant information
- No real customer data
- No functional API credentials
- No proprietary business metrics
- No confidential information

## Purpose

This prototype demonstrates:
1. The platform's core value proposition
2. User experience and interface design
3. Comparison functionality between delivery services
4. Technical architecture and capabilities

Perfect for:
- Partner demonstrations
- Investor presentations
- Technical evaluations
- UX/UI reviews

## Reverting to Production

To restore real API integration:
1. Restore original `.env` file with valid credentials
2. Change `server.js` imports back to `chefz-api.js` and `toyou-api.js`
3. Remove prototype warnings from Header component
4. Remove mock API files

---

**Last Updated**: 2025-09-30
**Version**: Prototype v1.0
**Contact**: For access to production version, please contact the development team
