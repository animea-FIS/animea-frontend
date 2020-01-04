import React, { useState } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import SideNav from './components/common/SideNav';
import { AuthContext } from "./components/auth/context/auth";
import Cookies from 'js-cookie';

function App() {
  const [authTokens, setAuthTokens] = useState(Cookies.get("userToken"));
  const [userId, setUserId] = useState();

  const setTokens = (data) => {
    Cookies.set('userToken', JSON.stringify(data), { expires: 1/24 }); //expires in 1 hour
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, userId, setUserId}}>
    <SideNav />
    </AuthContext.Provider>
  );
}

export default App;
