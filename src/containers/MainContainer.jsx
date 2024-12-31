import React, { useState } from "react";
import CryptoSection from "../components/CryptoSection.jsx";
import HistoricalSection from "../components/HistoricalSection.jsx";
import "../components/style.css";
import BitcoinImage from "../components/Bitcoin2.jpg";

function MainContainer() {
  const [chosenCall, setChosenCall] = useState("");

  const handleCallChoiceChange = (e) => {
    setChosenCall(e.target.value);
  };

  return (
    <div className="App">
      <div class="text-center">
        <img
          src={BitcoinImage}
          class="rounded"
          style={{ width: "200px", height: "auto", marginBottom: "20px" }}
          alt="Bitcoin Logo"
        />
      </div>
      <div>This site handles CoinLayer API calls.</div>
      <select value={chosenCall} onChange={handleCallChoiceChange}>
        <option value="">--Please choose an option--</option>
        <option value="crypto">Search for a cryptocurrency</option>
        <option value="historical">Fetch historical data</option>
      </select>
      <br />
      <br />
      {chosenCall === "crypto" && <CryptoSection />}
      {chosenCall === "historical" && <HistoricalSection />}
    </div>
  );
}

export default MainContainer;
