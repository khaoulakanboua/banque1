import Axios from './caller.service'


let getSoldeByCompte = (num) => {
    return Axios.get(`/banque/apis/getSoldeByCompte?numeroCompte=${num}`)
}

let getOperationsByClient = (d) =>{
    return Axios.get('/banque/apis/getOperationsByClient',d)
}

let depotByNumeroCompte =(b,m)=>{
   return Axios.post(`/banque/apis/depotByNumeroCompte?montant=${m}`, b)
}

let depotByCinClient = (b,m) =>{
    return Axios.post(`/banque/apis/depotByCinClient?montant=${m}`,b)
}

let retraitByNumeroCompte = (b,m) =>{
    return Axios.post(`/banque/apis/retraitByNumeroCompte?montant=${m}`,b)
}

let retraitByCinClient = (b,m)=>{
    return Axios.post(`/banque/apis/retraitByCinClient?montant=${m}`,b)
}

let getProductsSmall= () =>[
    {
      name: 'retrait',
      price: 111
  },
  {
      name: 'depot',
      price:333
  },
  {
      name: 'solde',
      price:333
  }
   ]
// Décaraltion des esrvices pour import
export const Banqueservice = {
    getSoldeByCompte, getOperationsByClient,depotByNumeroCompte,depotByCinClient,retraitByNumeroCompte,retraitByCinClient,
    getProductsSmall
}