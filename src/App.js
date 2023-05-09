import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgenceList from './components/agenceList';
import AgenceForm from './components/agenceForm';
function App() {
  return (
    <Router>
    <div className="App">
   

       <Routes>
          <Route path="/agence" element={<AgenceList/>} />
          <Route path="/addAgence" element={<AgenceForm/>} />






        </Routes>
       
    </div>


  </Router>
  );
}

export default App;
