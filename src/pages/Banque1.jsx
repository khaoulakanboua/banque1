import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Banqueservice } from '../service/banque.service';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

export default function Banque1() {
  const [banqueDialog, setBanqueDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [montant, setMontant] = useState();
  const toast = useRef(null);
  let retrait = {
    cin: '',
  }
  const [compte, setCompte] = useState(retrait)

  const saveProduct = () => {
    if (!montant || !compte.cin) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });

    } else {
      console.log(montant, compte.cin)
      Banqueservice.depotByCinClient(compte, montant)
        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Depot done', life: 2000 });
        })
    }
  };
  const saveProduct1 = () => {
    if (!montant || !compte.cin) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });

    } else {
      console.log(montant, compte.cin)
      Banqueservice.retraitByCinClient(compte, montant)
        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
        })
    }
  };
  const saveProduct2 = () => {
    if (!montant || !compte.clientEnvoie || !compte.clientRecoit) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });

    } else {
     // console.log(montant, compte.compteEnvoie,compte.compteRecoit)
      Banqueservice.viremantBetweenClientByCin(compte.clientEnvoie,compte.clientRecoit, montant)

        .then(() => {
          setSubmitted(true);
          setBanqueDialog(false)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Virement done', life: 2000 });
        })
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
  const Alert = (
    <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
      <Message severity="warn" text="Warning Message" />
    </div>
  )

  return (
    <div className="card">
      <Toast ref={toast} />
      <TabView>
        <TabPanel header="Depot by cin" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Depot : " modal className="p-fluid" footer={banqueDialogFooter} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="cin" className="font-bold">
                  Num Cin :
                </label>
                <InputText id="cin" value={compte.cin} onChange={(e) => onInputChange(e, 'cin')} required rows={3} cols={20} />
                {submitted && !compte.cin && <small className="p-error">Numero de cin vide!</small>}
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
        <TabPanel header="Retrait by cin" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Retrait : " modal className="p-fluid" footer={banqueDialogFooter1} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="cin" className="font-bold">
                  Num Cin :
                </label>
                <InputText id="cin" value={compte.cin} onChange={(e) => onInputChange(e, 'cin')} required rows={3} cols={20} />
                {submitted && !compte.cin && <small className="p-error">Cin vide!</small>}
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
        <TabPanel header="Virement by cin" leftIcon="pi pi-calendar mr-2">
          <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setBanqueDialog(true)} />
            <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Virement : " modal className="p-fluid" footer={banqueDialogFooter2} onHide={hideDialog}>

              <div className="field">
                <label htmlFor="clientEnvoie" className="font-bold">
                  Num cin Envoie :
                </label>
                <InputText id="clientEnvoie" value={compte.clientEnvoie} onChange={(e) => onInputChange(e, 'clientEnvoie')} required rows={3} cols={20} />
                {submitted && !compte.clientEnvoie && <small className="p-error">CIN vide!</small>}
              </div>
              <div className="field">
                <label htmlFor="clientRecoit" className="font-bold">
                  Num cin Recoit :
                </label>
                <InputText id="clientRecoit" value={compte.clientRecoit} onChange={(e) => onInputChange(e, 'clientRecoit')} required rows={3} cols={20} />
                {submitted && !compte.clientRecoit && <small className="p-error">Cin est vide!</small>}
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
      </TabView>
    </div>
  )
}