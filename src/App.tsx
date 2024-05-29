import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AuthProvider} from "./components/Context/AuthContext/AuthContext";
import {PermissionProvider} from "./components/Context/PermissionContext/PermissionContext";
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/Context/Routes/Routes";
import ScrollToTopBtn from "./components/ScrollToTopBtn/ScrollToTopBtn";


function App() {
  return (
    <AuthProvider>
          <PermissionProvider>
              <BrowserRouter>
                        <Routes />
                        <ScrollToTopBtn/>
              </BrowserRouter>
          </PermissionProvider>
      </AuthProvider>
  );
}

export default App;
