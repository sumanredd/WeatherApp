# 🌦 Weather App (Next.js)

A cross-platform weather application built with **Next.js** and **OpenWeather API**, featuring responsive design, city search, hourly forecast, and 5-day forecast.  

---

## 🚀 Features
- 📱 **Responsive Design** (desktop + mobile via `@media` queries)  
- 🌍 **City-based Weather Search** (default city: Hyderabad)  
- ☀️ **Current Weather** (temperature, feels-like, humidity, wind, visibility)  
- 🕒 **Hourly Forecast** (scrollable list for today)  
- 📅 **5-Day Forecast** (daily at 12:00 PM)  
- ⚡ **Loading States** (ClipLoader spinner)  
- ❌ **Error Handling** (invalid city or API failures)  

---

## 🛠 Tech Stack
- **Next.js** (App Router, React hooks: `useState`, `useEffect`)  
- **OpenWeather API** for weather data  
- **CSS Modules** + media queries for responsive styling  
- **react-spinners (ClipLoader)** for loading indicators  



## 📦 Setup
--> Install dependencies
 ```bash
npm install

```
--> Create an .env.local file in the root with your OpenWeather API key:
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

--> Run the development server
```bash
npm run dev
```

Open in browser → http://localhost:3000