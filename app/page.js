'use client'

import Weather from "./components/Weather";

export default function Page() {
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
      <Weather />
    </div>
  );
}
