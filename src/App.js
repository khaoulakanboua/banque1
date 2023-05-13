import './App.css';
import React from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Routes ,Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Client from './pages/Client';
import Agence from "./pages/Agence";
import Employe from "./pages/Employe";
import Ville from "./pages/Ville";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/employe' element={<Employe />} />
        <Route path='/client' element={<Client />} />
        <Route path='/ville' element={<Ville/>} />
      </Routes>
    </div>
  );
}

export default App;
