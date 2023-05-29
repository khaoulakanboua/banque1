import React from 'react'
import { Routes, Route } from "react-router-dom"
import { utilisateurService } from '../service/utilisateur.service'
import Header from '../components/Header';
import Home from '../pages/Home'
import Client from '../pages/Client';
import Agence from "../pages/Agence";
import Employe from "../pages/Employe";
import Ville from '../pages/Ville';
import Compte from '../pages/Compte';
import Banque from '../pages/Banque';
import Operation from '../pages/Operation';
import Banque1 from '../pages/Banque1';
import ErrorPage from '../pages/ErrorPage';

export default function ProRoutes() {
  return (
         <div className='Admin'>
        <Header />
        <Routes>
            <Route>
            <Route index element={<Home/>}/>
                <Route path="home" element={<Home />} />
                {utilisateurService.isLogged && utilisateurService.getRole() === 'ADMIN' && (
                <Route path="Ville" element={<Ville />} />
                )}
                 {utilisateurService.isLogged && utilisateurService.getRole() === 'ADMIN' && (
                <Route path="Agence" element={<Agence />} />
                 )}
                {utilisateurService.isLogged && utilisateurService.getRole() === 'ADMIN' && (
                <Route path='Employe' element={<Employe />} />
                )}
                 {utilisateurService.isLogged && (utilisateurService.getRole() === 'ADMIN' || utilisateurService.getRole() === 'EMPLOYEE')
                 && (
                <Route path='Client' element={<Client />} />
                 )}
                  {utilisateurService.isLogged && (utilisateurService.getRole() === 'ADMIN' || utilisateurService.getRole() === 'EMPLOYEE') 
                  &&(
                <Route path='Compte' element={<Compte />} />
                 )}
                  {utilisateurService.isLogged && (utilisateurService.getRole() === 'ADMIN' || utilisateurService.getRole() === 'EMPLOYEE')
                  && (
                <Route path='Banque' element={<Banque />} />
                 )}
                  {utilisateurService.isLogged && (utilisateurService.getRole() === 'ADMIN' || utilisateurService.getRole() === 'EMPLOYEE')
                   && (
                <Route path='Operation' element={<Operation />} />
                 )}
                  {utilisateurService.isLogged && (utilisateurService.getRole() === 'ADMIN' || utilisateurService.getRole() === 'EMPLOYEE')
                   && (
                <Route path='Banque1' element={<Banque1 />} />
                 )}
            </Route>
            <Route path='*' element={<ErrorPage/>} />
        </Routes>
        </div>

  )
}
