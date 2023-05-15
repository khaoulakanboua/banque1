import Axios from './caller.service'


let getAllEmploye = () => {
    return Axios.get('/banque/employees/read')
}

let AddEmploye = (d) =>{
    return Axios.post('/banque/employees/create',d)
}

let UpdateEmployeVille =(v)=>{
   return Axios.put(`/banque/employees/update`, v)
}

let DeleteEmploye= (id) =>{
    return Axios.delete(`/banque/employees/delete/${id}`)
}


// Décaraltion des esrvices pour import 
export const Employeervice = {
    getAllEmploye, AddEmploye ,UpdateEmployeVille ,DeleteEmploye
}