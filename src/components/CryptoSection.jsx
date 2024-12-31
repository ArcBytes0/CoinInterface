import React, { useEffect, useState } from "react";
import "./style.css";

function CryptoSection() {
  const [crypto, setCrypto] = useState("");
  const [cryptoData, setCryptoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crypto.trim() === "") {
      alert("Please enter a cryptocurrency symbol!");
      return;
    }
    getCryptoAPIcall(crypto);
  };

  const getCryptoAPIcall = async (cryptoSymbol) => {
    setIsLoading(true);
    setError(null);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.coinlayer.com/api/live?access_key=69c55ee0ed88b6d9deff18166dc7c996`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Check if the cryptocurrency exists in the API response
      if (!result.rates || !result.rates[cryptoSymbol.toUpperCase()]) {
        setError("Cryptocurrency not found. Please try another symbol.");
        setCryptoData(null);
      } else {
        setCryptoData({
          symbol: cryptoSymbol.toUpperCase(),
          rate: result.rates[cryptoSymbol.toUpperCase()],
          date: result.timestamp,
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        Type the cryptocurrency symbol you want to search for and click Submit:
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
        <button type="Submit" class="btn btn-secondary">
          Submit
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!isLoading && !error && cryptoData && (
        <div>
          <h3>Cryptocurrency Data:</h3>
          <p>
            <strong>Symbol:</strong> {cryptoData.symbol}
          </p>
          <p>
            <strong>Rate (USD):</strong> ${cryptoData.rate}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(cryptoData.date * 1000).toLocaleString()}
          </p>
        </div>
      )}
      {!isLoading && !error && !cryptoData && (
        <div>No data available. Try a different symbol.</div>
      )}
    </div>
  );
}

export default CryptoSection;
