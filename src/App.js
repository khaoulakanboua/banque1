import './App.css';
import React from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import AgenceForm from './components/agenceForm';
import AgenceList from './components/agenceList';
import "primereact/resources/primereact.min.css";
import { Route, Routes } from 'react-router-dom';
import Agence from './pages/Agence';
import Employe from './pages/Employe';
import Header from './components/Header';
import Home from './pages/Home';
import Client from './pages/Client';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/ListAgence' element={<AgenceList />} />
        <Route path='/addAgence' element={<AgenceForm />} />


        <Route path='/employe' element={<Employe />} />
        <Route path='/client' element={<Client />} />

      </Routes>
    </div>
  );
}

export default App;
