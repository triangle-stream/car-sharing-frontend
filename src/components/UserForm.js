import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("passenger");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5003/api/users/register", { name, email, password, role });
      alert("Utente registrato con successo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrati</h2>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="passenger">Passeggero</option>
        <option value="driver">Autista</option>
      </select>
      <button onClick={handleRegister}>Registrati</button>
    </div>
  );
};

export default UserForm;
