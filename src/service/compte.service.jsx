import Axios from './caller.service'


let getAllCompte = () => {
    return Axios.get('/banque/comptes/read')
}

let AddCompte = (d) =>{
    return Axios.post('/banque/comptes/create',d)
}

let UpdateCompte =(v)=>{
   return Axios.put(`/banque/comptes/update`, v)
}

let DeleteCompte = (id) =>{
    return Axios.delete(`/banque/comptes/delete/${id}`)
}


// Décaraltion des esrvices pour import
export const Compteservice = {
    getAllCompte, AddCompte ,DeleteCompte ,UpdateCompte
}