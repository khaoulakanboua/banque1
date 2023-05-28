import Axios from './caller.service'
import jwt_decode from 'jwt-decode'


let login = (emailL,passwordL) => {
    return Axios.post(`/api/auth/login`, {
        email: emailL,
        motDePasse: passwordL
      });
}

let register = (r)=>{
    return Axios.post(`/api/auth/register`,r)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}


let logout = () => {
    localStorage.removeItem('token')
    localStorage.clear()
}


let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}


let getToken = () => {
    return localStorage.getItem('token')
}


let getTokenInfo = () => {
    return jwt_decode(getToken())
}

let saveRole = (role) =>{
    localStorage.setItem('role', role)
}

let getRole = () => {
    return localStorage.getItem('role')
}
let saveId = (id) =>{
    localStorage.setItem('id', id)
}

let getId = () =>{
   return localStorage.getItem('id')
}
let saveCin = (cin) =>{
    localStorage.setItem('cin', cin)
}

let getCin = () =>{
   return localStorage.getItem('cin')
}
let saveNom = (nom) =>{
    localStorage.setItem('nom', nom)
}

let getNom = () =>{
   return localStorage.getItem('nom')
}
let savePrenom = (prenom) =>{
    localStorage.setItem('prenom', prenom)
}

let getPrenom = () =>{
   return localStorage.getItem('prenom')
}



export const utilisateurService = {
    login, register, saveToken, logout, isLogged, getToken, getTokenInfo ,saveRole,getRole,saveId,getId,saveCin,getCin,saveNom,getNom,savePrenom,getPrenom
}

