import React, { useState } from "react";
import axios from "axios";

const RideRequest = () => {
  const [passengerId, setPassengerId] = useState("");
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");

  const handleRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5003/api/rides/request", { passengerId, startStop, endStop });
      alert("Richiesta creata con successo!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Richiedi un Passaggio</h2>
      <input placeholder="ID Passeggero" value={passengerId} onChange={(e) => setPassengerId(e.target.value)} />
      <input placeholder="ID Fermata di Partenza" value={startStop} onChange={(e) => setStartStop(e.target.value)} />
      <input placeholder="ID Fermata di Destinazione" value={endStop} onChange={(e) => setEndStop(e.target.value)} />
      <button onClick={handleRequest}>Invia Richiesta</button>
    </div>
  );
};

export default RideRequest;
