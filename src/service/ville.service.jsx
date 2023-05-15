import Axios from './caller.service'


let getAllVilles = () => {
    return Axios.get('/banque/villes/read')
}

let AddVille = (d) =>{
    return Axios.post('/banque/villes/create',d)
}

let UpdateVille =(v)=>{
   return Axios.put(`/banque/villes/update`, v)
}

let DeleteVille = (id) =>{
    return Axios.delete(`/banque/villes/delete/${id}`)
}


// Décaraltion des esrvices pour import
export const villeService = {
    getAllVilles, AddVille ,DeleteVille ,UpdateVille
}