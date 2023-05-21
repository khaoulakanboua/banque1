import './App.css';
import React from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { Routes ,Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Client from './pages/Client';
import Agence from "./pages/Agence";
import Employe from "./pages/Employe";
import Ville from './pages/Ville';
import Compte from './pages/Compte';
import Banque from './pages/Banque';
import Operation from './pages/Operation';
import Banque1 from './pages/Banque1';


function App() {
  return (
    <>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/employe' element={<Employe />} />
        <Route path='/client' element={<Client />} />
        <Route path='/ville' element={<Ville/>} />
        <Route path='/compte' element={<Compte/>} />
        <Route path='/banque' element={<Banque/>} />
        <Route path='/operation' element={<Operation/>} />
        <Route path='/banque1' element={<Banque1/>} />
      </Routes> 
        </>
  );
}

export default App;
