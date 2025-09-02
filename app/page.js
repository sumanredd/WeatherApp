'use client'

import { Suspense } from "react";
import Weather from "./components/Weather";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#121212",
        color: "#fff"
      }}
    >
      <Suspense fallback={<div>Loading weather...</div>}>
        <Weather />
      </Suspense>
    </div>
  );
}
