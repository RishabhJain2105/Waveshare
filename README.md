# 🌊 Waveshare

**Waveshare** is a lightweight, local-first file-sharing app that lets you instantly share files over the same Wi-Fi network or hotspot. Just pick a file, get a QR code, and let others download it — no internet or accounts required.


---

## ✨ Features

- 🔐 **Secure Local Sharing** - Share files securely via your local network or hotspot
- 🔗 **Unique Token URLs** - Each shared file gets a unique tokenized URL for security
- 🖥️ **Minimal UI** - Clean and intuitive interface with file selection and server control
- ⚡ **Fast & Lightweight** - Optimized for speed and internet-independent operation
- 🎨 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **QR Code Generation** - Instant QR codes for easy mobile access

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/en/download)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/RishabhJain2105/Waveshare.git
cd Waveshare
```

2. **Install dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

### Running the Application

**Development Mode** (runs both frontend and backend concurrently):
```bash
npm run dev
```

**Individual Components:**
```bash
# Frontend only (React + Vite)
npm run dev:frontend

# Backend only (Express.js server)
npm run dev:backend
```

**Build for Production:**
```bash
npm run build
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8080`

---

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **React QR Code** for QR code generation
- **Axios** for API communication

### Backend (Express.js)
- **Express.js** server handling file sharing logic
- **CORS** enabled for cross-origin requests
- **Internal IP detection** for network sharing
- **Crypto-based token generation** for secure file URLs
- **File system operations** for direct file serving

### Key Components
- `FilePicker.tsx` - File selection and sharing interface
- `App.tsx` - Main application component with theme management
- `server.js` - Express backend with API endpoints

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/share` | Share a file and get a unique token |
| `GET` | `/api/ip` | Get the local IP address |
| `GET` | `/download/:token` | Download a file using its token |
| `POST` | `/api/shutdown` | Gracefully shutdown the server |

---

## 🔒 Security Features

- **Local Network Only** - Files are only accessible within your local network or hotspot
- **Unguessable URLs** - Cryptographically secure random tokens prevent unauthorized access
- **No Cloud Storage** - Files remain on your device and are never uploaded to external servers
- **Automatic Cleanup** - File tokens are removed after download
- **Token Expiration** - Links become invalid when server restarts

---

## 🎯 Usage

1. **Start the Application** - Run `npm run dev`
2. **Enter File Path** - Type or paste the full path to your file
3. **Generate QR Code** - Click "Share File" to create a QR code and download link
4. **Share** - Others can scan the QR code or use the link to download
5. **Stop Server** - Use the "Stop Server" button when done

---

## 📁 Project Structure

```
Waveshare/
├── src/
│   ├── components/
│   │   ├── FilePicker.tsx      # File selection component
│   │   └── ManualFileInput.tsx # Manual file input component
│   ├── assets/                 # Static assets
│   ├── App.tsx                # Main application
│   └── main.tsx               # Entry point
├── backend/
│   ├── server.js              # Express.js server
│   ├── package.json           # Backend dependencies
│   └── package-lock.json
├── public/                    # Public assets
├── package.json              # Frontend dependencies
└── README.md
```

---

## 🛠️ Development

### Scripts Available

- `npm run dev` - Run both frontend and backend
- `npm run dev:frontend` - Run React development server
- `npm run dev:backend` - Run Express.js server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Tech Stack

- **Frontend**: React, TypeScript, Vite, Framer Motion
- **Backend**: Node.js, Express.js, CORS
- **Utilities**: Axios, React QR Code, Internal IP
- **Development**: Concurrent execution for full-stack development

---

