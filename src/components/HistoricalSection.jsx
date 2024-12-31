import React, { useState } from "react";
import "./style.css";

function HistoricalSection() {
  const [crypto, setCrypto] = useState("");
  const [date, setDate] = useState("");
  const [historicalData, setHistoricalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crypto.trim() === "" || date.trim() === "") {
      alert("Please enter both a cryptocurrency symbol and a date!");
      return;
    }
    getHistoricalData(crypto, date);
  };

  const getHistoricalData = async (cryptoSymbol, selectedDate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coinlayer.com/api/${selectedDate}?access_key=69c55ee0ed88b6d9deff18166dc7c996`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.rates || !result.rates[cryptoSymbol.toUpperCase()]) {
        setError("Cryptocurrency not found for the selected date.");
        setHistoricalData(null);
      } else {
        setHistoricalData({
          symbol: cryptoSymbol.toUpperCase(),
          rate: result.rates[cryptoSymbol.toUpperCase()],
          date: selectedDate,
        });
      }
    } catch (error) {
      setError(`Failed to fetch data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        Enter a cryptocurrency symbol and date to fetch historical data:
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          class="form-control"
          name="crypto"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          placeholder="Enter cryptocurrency symbol (e.g., BTC, ETH)"
        />
        <input
          type="date"
          class="date form-control"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" class="btn btn-secondary">
          Submit
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!isLoading && !error && historicalData && (
        <div>
          <h3>Historical Data:</h3>
          <p>
            <strong>Symbol:</strong> {historicalData.symbol}
          </p>
          <p>
            <strong>Rate (USD):</strong> ${historicalData.rate}
          </p>
          <p>
            <strong>Date:</strong> {historicalData.date}
          </p>
        </div>
      )}
      {!isLoading && !error && !historicalData && (
        <div>No data available. Try a different symbol or date.</div>
      )}
    </div>
  );
}

export default HistoricalSection;
