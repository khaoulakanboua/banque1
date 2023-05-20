import Axios from './caller.service'


let getAllOperation = () => {
    return Axios.get('/banque/operations/read')
}



// Décaraltion des esrvices pour import
export const Operationservice = {
    getAllOperation
}