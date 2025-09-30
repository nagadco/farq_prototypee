# Chefz-ToYou Delivery Fee Comparison API

Express.js server that compares delivery fees between TheChefz and ToYou platforms using real-time data collection. Processes requests one at a time using a queue mechanism.

## Setup

```bash
npm install
```

## Run

```bash
npm start
# or for development
npm run dev
```

## Endpoints

### POST /compare
Compares delivery fees between TheChefz and ToYou for given coordinates.

**Request body:**
```json
{
  "latitude": "24.734807778343",
  "longitude": "46.651097791854",
  "maxChefs": 5
}
```

**Response:**
```json
{
  "status": "completed",
  "processed_at": "2025-09-19T12:55:04.893803Z",
  "results": [
    {
      "chefz_name": "Steak House | ستيك هاوس",
      "chefz_id": 2059328,
      "chefz_delivery_fee": "15.00",
      "chefz_total_price": "84.00",
      "toyou_name": "Steak House",
      "toyou_id": "ef4285bb-e1ee-4a68-a9d5-ae5f25a7c504",
      "toyou_delivery_fee": 16,
      "timestamp": "2025-09-19T12:54:41.482823"
    }
  ],
  "total_processed": 1
}
```

### GET /queue-status
Returns current queue status.

**Response:**
```json
{
  "queue_length": 0,
  "processing": false,
  "timestamp": "2025-09-19T12:55:04.893803Z"
}
```

## Test

```bash
# Test with real data collection
node test-real-data.js
```

## Features

- **Real-time data collection** from TheChefz and ToYou APIs
- **Queue processing** - handles one request at a time to avoid rate limiting
- **Smart matching** - finds corresponding restaurants across platforms
- **Delivery fee comparison** - calculates actual delivery fees from both platforms
- **Coordinate-based** - uses latitude/longitude for location-specific results

## How it works

1. Receives lat/lng coordinates and optional maxChefs parameter
2. Fetches nearest chefs from TheChefz API
3. For each chef, calculates actual delivery fee using their menu items
4. Searches for the same restaurant in ToYou using intelligent name matching
5. Compares delivery fees and returns comprehensive results
6. Processes requests sequentially to respect API rate limits