import './App.css';
import React from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from 'react-router-dom';
import Agence from './pages/Agence';
import Ville from './pages/Ville';
import AgenceList from './components/agenceList';
import Employe from './pages/Employe';
import Header from './components/Header';
import Home from './pages/Home';
import Client from './pages/Client';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/employe' element={<Employe />} />
      </Routes>
    </div>
  );
}

export default App;
