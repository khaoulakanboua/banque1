import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import "./App.css"
import Agence from "./pages/Agence";
import Home from "./pages/Home";
import Employe from "./pages/Employe";
function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/agence" element={<Agence/>} />
          <Route path="/employe" element={<Employe/>} />
        </Routes>
    </div>
  );
}

export default App;
