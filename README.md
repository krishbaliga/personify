# Personify 🎶✨

Discover your music-personality connection with **Personify** — a React app that analyzes your Spotify listening habits, infers your MBTI personality, and creates a custom playlist just for you.

---

## 🌐 Live Demo  
👉 [personify.pages.dev](https://personify.pages.dev/)

---

## 🚀 Getting Started

### Prerequisites  
- Node.js (v16 or higher)  
- A Spotify Developer account & registered application (to get your Client ID and set a redirect URI)

### Installation & Setup  

1. **Clone the repository**  
   Run:
   ```bash
   git clone https://github.com/your-username/personify.git
   cd personify
   ```

2. **Install dependencies**  
   Run:
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root of the project with the following:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URI=http://localhost:5173/callback
   VITE_SPOTIFY_SCOPES=user-read-email user-top-read playlist-modify-public playlist-modify-private
   ```

4. **Run Locally**  
   Run:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 📂 Project Structure  
```plaintext
src/
├── Components/   # UI components like Header, Song, MBTI test components
├── Pages/        # Application views (e.g., Result, Home)
├── assets/       # Images and icons
├── Styles/       # CSS files
├── App.jsx       # Main component
└── main.jsx      # App entry point
```

---

## 🛠️ Built With  
- React  
- Vite  
- Spotify Web API
