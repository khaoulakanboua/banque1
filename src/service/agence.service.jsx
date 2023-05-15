import Axios from './caller.service'


let getAllAgence = () => {
    return Axios.get('/banque/agences/read')
}

let AddAgence = (d) =>{
    return Axios.post('/banque/agences/create',d)
}

let UpdateAgence =(v)=>{
   return Axios.put(`/banque/agences/update`, v)
}

let DeleteAgence = (id) =>{
    return Axios.delete(`/banque/agences/delete/${id}`)
}


// Décaraltion des esrvices pour import
export const Agenceservice = {
    getAllAgence, AddAgence ,DeleteAgence ,UpdateAgence
}