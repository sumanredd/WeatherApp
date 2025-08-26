'use client'

import SearchWeather from "../components/Searchweather";

export default function SearchPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#121212",
      color: "#fff"
    }}>
      <SearchWeather />
    </div>
  );
}
