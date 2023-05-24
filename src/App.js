import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Routes ,Route,useLocation } from 'react-router-dom';
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
import MyComponent from './pages/Solde';
import LoginForm from './pages/Login';
function App() {
  const location = useLocation();
  const hideHeaderOnLogin = location.pathname === '/login';
  return (
    <div className="App">
            {!hideHeaderOnLogin && <Header />}

      <Routes>
      <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/employe' element={<Employe />} />
        <Route path='/client' element={<Client />} />
        <Route path='/ville' element={<Ville/>} />
        <Route path='/compte' element={<Compte/>} />
        <Route path='/banque' element={<Banque/>} />
        <Route path='/operation' element={<Operation/>} />
        <Route path='/banque1' element={<Banque1/>} />
        <Route path='/solde' element={<MyComponent/>} />



      </Routes>
    </div>
  );
}

export default App;
