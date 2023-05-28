import Axios from './caller.service'


let getAllOperation = () => {
    return Axios.get('/banque/operations/read')
}
let getByCompte = (c) =>{
    return Axios.get(`/banque/operations/compte?id=${c}`);
} 


// Décaraltion des esrvices pour import
export const Operationservice = {
    getAllOperation,getByCompte
}