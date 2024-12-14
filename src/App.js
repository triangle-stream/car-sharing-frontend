import React from "react";
import MapView from "./components/MapView";
import UserForm from "./components/UserForm";
import RideRequest from "./components/RideRequest";

function App() {
  return (
    <div>
      <h1>Car Sharing</h1>
      <UserForm />
      <RideRequest />
      <MapView />
    </div>
  );
}

export default App;
