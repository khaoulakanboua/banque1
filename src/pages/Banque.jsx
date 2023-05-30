import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Banqueservice } from '../service/banque.service';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
import { Compteservice } from '../service/compte.service';

export default function Banque() {
  const [banqueDialog, setBanqueDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [montant, setMontant] = useState();
  const [solde, setSolde] = useState(0);  

  const toast = useRef(null);
  let retrait = {
    numeroCompte: '',
  }
  const [compte, setCompte] = useState(retrait)



  const saveProduct = () => {
    if (!montant || !compte.numeroCompte) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });
    } else {
      console.log(montant, compte.numeroCompte)
      Banqueservice.depotByNumeroCompte(compte, montant)
        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
        })
    }
  };
  const saveProduct1 = () => {
    if (!montant || !compte.numeroCompte) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });
    }else if(  Banqueservice.retraitByNumeroCompte(compte, montant)===false){
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'sold insuffisant', life: 3000 });
    }  else {
      console.log(montant, compte.numeroCompte)
      Banqueservice.retraitByNumeroCompte(compte, montant)
        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
        })
    }
  };
  const saveProduct2 = () => {
    if (!montant || !compte.compteEnvoie || !compte.compteRecoit) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });
    }else if(montant > compte.solde){
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'sold insuffisant', life: 3000 });
      } else {
      // console.log(montant, compte.compteEnvoie,compte.compteRecoit)
      Banqueservice.viremantBetweenClientByNumeroCompte(compte.compteEnvoie, compte.compteRecoit, montant)
        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
        })
    }
  };
  const saveProduct3 = () => {
    if (!compte.numeroCompte) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });
    } else {
      Banqueservice.getSoldeByCompte(compte.numeroCompte)
        .then((response) => {
          setSolde(response.data);
          setSubmitted(true);
          setBanqueDialog(false);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const hideDialog = () => {
    setSubmitted(false);
    setBanqueDialog(false);
  };

  const onInputNumberChange = (e) => {
    const val = e.value || 0;
    setMontant(val);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...compte };

    _product[`${name}`] = val;

    setCompte(_product);
  };
  const banqueDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const banqueDialogFooter1 = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct1} />
    </React.Fragment>
  );
  const banqueDialogFooter2 = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct2} />
    </React.Fragment>
  );
  const banqueDialogFooter3 = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct3} />
    </React.Fragment>
  );
  const Alert = (
    <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
      <Message severity="warn" text="Warning Message" />
    </div>
  )

  return (
    <div className="card">
      <Toast ref={toast} />
      <TabView>
        <TabPanel header="Depot" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Depot : " modal className="p-fluid" footer={banqueDialogFooter} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="numeroCompte" className="font-bold">
                  Num Compte :
                </label>
                <InputText id="numeroCompte" value={compte.numeroCompte} onChange={(e) => onInputChange(e, 'numeroCompte')} required rows={3} cols={20} />
                {submitted && !compte.numeroCompte && <small className="p-error">Numero de compte vide!</small>}
              </div>
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="montant" className="font-bold">
                    Price
                  </label>
                  <InputNumber id="montant" value={montant} onValueChange={(e) => onInputNumberChange(e, 'montant')} required mode="currency" currency="MAD" locale="en-US" />
                </div>
              </div>

            </Dialog>
          </div>
        </TabPanel>
        <TabPanel header="Retrait" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Retrait : " modal className="p-fluid" footer={banqueDialogFooter1} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="numeroCompte" className="font-bold">
                  Num Compte :
                </label>
                <InputText id="numeroCompte" value={compte.numeroCompte} onChange={(e) => onInputChange(e, 'numeroCompte')} required rows={3} cols={20} />
                {submitted && !compte.numeroCompte && <small className="p-error">Numero de compte vide!</small>}
              </div>
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="montant" className="font-bold">
                    Price
                  </label>
                  <InputNumber id="montant" value={montant} onValueChange={(e) => onInputNumberChange(e, 'montant')} required mode="currency" currency="MAD" locale="en-US" />
                </div>
              </div>

            </Dialog>
          </div>
        </TabPanel>
        <TabPanel header="Virement" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Virement : " modal className="p-fluid" footer={banqueDialogFooter2} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="compteEnvoie" className="font-bold">
                  Num compte Envoie :
                </label>
                <InputText id="compteEnvoie" value={compte.compteEnvoie} onChange={(e) => onInputChange(e, 'compteEnvoie')} required rows={3} cols={20} />
                {submitted && !compte.compteEnvoie && <small className="p-error">Numero de compte vide!</small>}
              </div>
              <div className="field">
                <label htmlFor="compteRecoit" className="font-bold">
                  Num compte Recoit :
                </label>
                <InputText id="compteRecoit" value={compte.compteRecoit} onChange={(e) => onInputChange(e, 'compteRecoit')} required rows={3} cols={20} />
                {submitted && !compte.compteRecoit && <small className="p-error">Numero de compte vide!</small>}
              </div>
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="montant" className="font-bold">
                    Price
                  </label>
                  <InputNumber id="montant" value={montant} onValueChange={(e) => onInputNumberChange(e, 'montant')} required mode="currency" currency="MAD" locale="en-US" />
                </div>
              </div>

            </Dialog>
          </div>
        </TabPanel>
        <div className="card flex justify-content-center">
          <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
          <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Solde : " modal className="p-fluid" footer={banqueDialogFooter3} onHide={hideDialog}>
            <div className="field">
              <label htmlFor="numeroCompte" className="font-bold">
                Num compte :
              </label>
              <InputText id="numeroCompte" value={compte.numeroCompte} onChange={(e) => onInputChange(e, 'numeroCompte')} required rows={3} cols={20} />
              {submitted && !compte.numeroCompte && <small className="p-error">Numero de compte vide!</small>}
            </div>
            <div>
              <h2>Solde: {solde}</h2>
            </div>
          </Dialog>
        </div>

      </TabView>
    </div>
  )
}  