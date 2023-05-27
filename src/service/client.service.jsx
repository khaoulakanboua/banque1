import Axios from './caller.service'


let getAllClient = () => {
    return Axios.get('/banque/clients/read')
}

let AddClient = (d) =>{
    return Axios.post('/banque/clients/create',d)
}

let UpdateClient =(v)=>{
   return Axios.put(`/banque/clients/update`, v)
}

let DeleteClient = (id) =>{
    return Axios.delete(`/banque/clients/delete/${id}`)
}

let getByCin = (cin)=>{
    return Axios.get(`/banque/clients/by?cin=${cin}`)
}

let getByEmail = (email) =>{
    return Axios.get(`/banque/clients?email=${email}`)
}
// Décaraltion des esrvices pour import
export const Clientervice = {
    getAllClient, AddClient ,DeleteClient ,UpdateClient,getByCin,getByEmail
}