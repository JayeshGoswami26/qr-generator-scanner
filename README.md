# QR Code Generator & Scanner

A full-stack web application for generating QR codes with dynamic key-value data and scanning them to view the encoded information. Built with React, Node.js, and MongoDB.

## Features

- **Generate QR Codes**: Add dynamic key-value pairs and generate QR codes containing JSON data
- **Scan QR Codes**: Use your device camera or upload an image to scan QR codes
- **Data Storage**: All QR codes are stored in MongoDB for future reference
- **Modern UI**: Beautiful dark theme with indigo accents and smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS (Dark theme: Charcoal black with indigo accents)
- Redux Toolkit for state management
- Framer Motion for animations
- qrcode.react for QR generation
- html5-qrcode for scanning

### Backend
- Node.js + Express + JavaScript
- MongoDB with Mongoose
- qrcode for server-side QR generation
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd qr-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/qr-app
NODE_ENV=development
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional, defaults are set):

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running locally:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
mongod
```

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is taken)

## Usage

### Generate QR Code

1. Click on "Generate QR" mode
2. Add key-value pairs (e.g., `name: marble stone`, `size: 20feet`, `imported from: India`)
3. Click "Add Key-Value Pair" to add more fields
4. Click "Generate QR Code" to create the QR code
5. Download the QR code if needed

### Scan QR Code

1. Click on "Scan QR" mode
2. Choose between:
   - **Camera**: Click "Start Camera Scanner" and allow camera permissions
   - **Upload Image**: Drag and drop or click to upload an image file
3. The scanned data will be displayed in a beautiful card layout

## Project Structure

```
qr-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GenerateQR/    # QR generation components
│   │   │   ├── ScanQR/        # QR scanning components
│   │   │   ├── Layout/        # Navigation and layout components
│   │   │   └── icons/         # SVG icons
│   │   ├── store/             # Redux store and slices
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   └── App.tsx            # Main app component
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # MongoDB models
│   │   ├── config/            # Database configuration
│   │   ├── middleware/        # Error handling middleware
│   │   └── server.js          # Express server entry point
│   └── package.json
└── README.md
```

## API Endpoints

### POST `/api/qr/generate`
Generate a QR code from key-value data.

**Request Body:**
```json
{
  "data": {
    "name": "marble stone",
    "size": "20feet",
    "imported from": "India"
  }
}
```

**Response:**
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "dataId": "507f1f77bcf86cd799439011",
  "data": {
    "name": "marble stone",
    "size": "20feet",
    "imported from": "India"
  }
}
```

### GET `/api/qr/:id`
Get QR data by ID.

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "qrCode": "data:image/png;base64,...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/qr/validate`
Validate scanned JSON data.

**Request Body:**
```json
{
  "scannedData": "{\"name\":\"marble stone\",\"size\":\"20feet\"}"
}
```

**Response:**
```json
{
  "valid": true,
  "data": {
    "name": "marble stone",
    "size": "20feet"
  }
}
```

## Development

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
The backend runs directly with Node.js. For production, consider using PM2 or similar process managers.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check the service status
- Verify the connection string in `backend/.env`
- Check if port 27017 is available

### Camera Permissions
- Ensure you're accessing the app over HTTPS or localhost
- Check browser permissions for camera access
- Try a different browser if issues persist

### CORS Issues
- Verify the backend CORS configuration allows requests from the frontend URL
- Check that the frontend `.env` has the correct `VITE_API_URL`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
