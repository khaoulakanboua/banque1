import axios from 'axios'
import { utilisateurService } from './utilisateur.service'


const Axios = axios.create({
    baseURL: 'http://localhost:8080'
})


Axios.interceptors.request.use(request => {

    if(utilisateurService.isLogged()){
        request.headers.Authorization = 'Bearer '+utilisateurService.getToken()
    }

    return request
})

Axios.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status === 401){
        utilisateurService.logout()
        window.location = '/auth/login'
    }else{
        return Promise.reject(error)
    }
})

export default Axios