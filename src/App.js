import './App.css';
import React from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { Routes ,Route } from 'react-router-dom';
import AuthRoutes from './auth/AuthRoutes';
import Protected from './auth/Protected';
import ProRoutes from './auth/ProRoutes';



function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<AuthRoutes/>}/>
           <Route path="app/*" element={
            <Protected>
              <ProRoutes />
            </Protected>
          }/>
          
        </Routes>
        </>
  );
}

export default App;
