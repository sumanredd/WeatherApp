'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from './index.module.css';
import ClipLoader from "react-spinners/ClipLoader";

const Weather = () => {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city"); 

  const [search, setSearch] = useState(cityParam || "hyderabad");
  const [weatherData, setWeatherData] = useState({});
  const [IndividualFiveDaily, setIndividualFiveDaily] = useState([]);
  const [IndividualHourly, setIndividualHourly] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cityParam) {
      setSearch(cityParam);
    }
  }, [cityParam]);

  useEffect(() => {
    getWeatherData();
  }, [search]);

  const getWeatherData = async () => {
    if (!search) return;
    const apiKey = "5808a1344f415c4c14c373f199e20b41";
    try {
      setIsLoading(true);
      setError(""); // ✅ reset error before fetch

      // Current weather
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (response.status === 404) {
        setError("City Not Found ❌");
        setWeatherData({});
        setIndividualFiveDaily([]);
        setIndividualHourly([]);
        setIsLoading(false);
        return; // ✅ stop further execution
      }

      const data = await response.json();

      // Forecast
      const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`;
      const response1 = await fetch(url1);
      const data1 = await response1.json();
     
      const { list } = data1;
      const today = new Date().toISOString().split("T")[0];
      const FilteredHourly = list.filter(each => each.dt_txt.startsWith(today));

      setWeatherData(data);
      setIndividualFiveDaily(list);
      setIndividualHourly(FilteredHourly);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch weather. Please try again later.");
      setWeatherData({});
      setIndividualFiveDaily([]);
      setIndividualHourly([]);
      setIsLoading(false);
    }
  };

  const { main, sys, weather, wind } = weatherData;
  const metersToMilesStr = m => (m / 1609.344).toFixed(2) + ' mi';

  return (
    <div className={styles.leftBg}>
      <div style={{ textAlign: "right", marginTop:"10px", marginBottom: "10px", marginRight:"15px" }}>
        <Link href="/search" className={styles.searchLink}>🔍 Search City</Link>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <ClipLoader color="#36d7b7" size={60} />
        </div>
      ) : error !== "" ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <h1 style={{ fontSize:"25px", color:"white" }}>{error}</h1>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.contentCard}>
            <h1 className={styles.cityName}>{weatherData.name},{sys.country}</h1>
            <h1 className={styles.mainTemp}>{main.temp}&deg;C</h1>
            <img 
              alt="Weather Icon" 
              className={styles.MainTempWeatherIcon} 
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
            />
            <p className={styles.description}>{weather[0].description}</p>

            <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <div className={styles.leftSmallCards}>
                <p className={styles.feelsLike}>FEELS LIKE</p>
                <h1 className={styles.feelsLikeMain}>{main.feels_like}</h1>
              </div>
              <div className={styles.leftSmallCards}>
                <p className={styles.Humidity}>HUMIDITY</p>
                <h1 className={styles.HumidityMain}>{main.humidity}%</h1>
              </div>
              <div className={styles.leftSmallCards}>
                <p className={styles.Visibility}>VISIBILITY</p>
                <h1 className={styles.VisibilityMain}>
                  {metersToMilesStr(weatherData.visibility)}
                </h1>
              </div>
              <div className={styles.leftSmallCards}>
                <p className={styles.Wind}>WIND</p>
                <h1 className={styles.WindMain}>{(wind.speed * 3.6).toFixed(1)} km/h</h1>

              </div>
            </div>
          </div>
  
          <div>
            {/* Hourly Forecast */}
            <div className={styles.IndividialHourlyCard}>
              <p className={styles.hourly}>Hourly Forecast</p>
              <hr style={{ border: "1px solid #A0A3B1", width: "96%", margin: "10px 0" }} />
              <ul
                style={{
                  textAlign: "center",
                  display: "flex",
                  gap: "30px",
                  listStyleType: "none",
                  paddingBottom: "10px",
                  margin: "0",
                  width: "100%",
                  overflow: "auto",
                  justifyContent: "flex-start"
                }}
                className={styles.scrollRow}
              >
                {IndividualHourly.map((each) => (
                  <li key={each.dt}>
                    <h1 className={styles.individualTime}>
                      {each.dt_txt.split(" ")[1].slice(0, 5)}
                    </h1>
                    <p className={styles.individualTemp}>{each.main.temp}&deg;</p>
                    <img  
                      alt="Weather Icon" 
                      className={styles.weatherIcon} 
                      src={`https://openweathermap.org/img/wn/${each.weather[0].icon}@4x.png`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* 5-Day Forecast */}
            <div className={styles.IndividialHourlyCard}>
              <p className={styles.daily}>5-Day Forecast</p>
              <hr style={{ border: "1px solid #A0A3B1", width: "96%", margin: "10px 0" }} />
              <ul
                style={{
                  textAlign: "center",
                  display: "flex",
                  gap: "25px",
                  listStyleType: "none",
                  paddingBottom: "10px",
                  margin: 0,
                  marginLeft: "7px",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                {IndividualFiveDaily.filter(each => each.dt_txt.includes("12:00:00")).map((eachItem) => {
                  const datePart = eachItem.dt_txt.split(" ")[0];
                  const todayDate = new Date().toLocaleDateString("en-GB", { day: "2-digit" });
                  const [year, month, day] = datePart.split("-");
                  const todayDisplay = todayDate === day;

                  return (
                    <li key={eachItem.dt}>
                      <h1 className={styles.individualDay}>
                        {todayDisplay ? "Today" : `${day}/${month}`}
                      </h1>
                      <p className={styles.individualTemp}>{eachItem.main.temp}&deg;</p>
                      <img 
                        alt="Weather Icon" 
                        className={styles.weatherIcon} 
                        src={`https://openweathermap.org/img/wn/${eachItem.weather[0].icon}@4x.png`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
