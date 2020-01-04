import React, { useState } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import SideNav from './components/common/SideNav';
import { AuthContext } from "./components/auth/context/auth";

function App() {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("userToken"));
  const setTokens = (data) => {
    localStorage.setItem("userToken", JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <SideNav />
    </AuthContext.Provider>
  );
}

export default App;
