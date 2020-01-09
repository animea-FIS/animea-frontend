import React, { useState } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import SideNav from './components/common/SideNav';
import { AuthContext } from "./components/auth/context/auth";
import Cookies from 'js-cookie';

function App() {
  const [authTokens, setAuthTokens] = useState(Cookies.get("userToken"));
  const [userId, setUserId] = useState(Cookies.get("userId"));

  const setTokens = (data) => {
    Cookies.set('userToken', data, { expires: 1/24 }); //expires in 1 hour
    setAuthTokens(data);
  }

  const setId = (data) => {
    Cookies.set('userId', data, { expires: 1/24 }); //expires in 1 hour
    setUserId(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, userId, setUserId: setId}}>
    <SideNav />
    </AuthContext.Provider>
  );
}

export default App;
