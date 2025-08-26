'use client'
import { useState } from "react";
import Link from "next/link";
import styles from './weather.module.css'

export default function SearchWeather() {
  const [city, setCity] = useState("");

  const getSearchUrl = () => {
    if (!city) return "/";
    const formattedCity = city.trim().replace(/\s+/g, '+').toLowerCase();
    return `/?city=${formattedCity}`;
  };

  return (
    <div className={styles.searchContainer}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" className={styles.searchLink}>🏠 Back</Link>
      </div>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.searchInput}
      />

      <Link href={getSearchUrl()}>
        <button className={styles.searchBtn}>Search</button>
      </Link>
    </div>
  );
}
