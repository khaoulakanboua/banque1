import { Navigate } from "react-router-dom";
import { utilisateurService } from "../service/utilisateur.service";

const Protected = ({children}) => {

  if(!utilisateurService.isLogged()){
      return <Navigate to="/"/>
  }
 
  return children
};

export default Protected;