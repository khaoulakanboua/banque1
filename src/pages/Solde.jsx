import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Comptel = () => {
  const [numeroCompte, setNumeroCompte] = useState('');
  const [solde, setSolde] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchSoldeByCompte = async () => {
    try {
      const response = await fetch(`http://localhost:8080/banque/apis/getSoldeByCompte?numeroCompte=${numeroCompte}`);
      const data = await response.json();
      setSolde(data);
      setDialogVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setNumeroCompte('');
    setSolde(0);
  };

  return (
    <div>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <label htmlFor="numeroCompte">Numéro de compte:</label>
        </span>
        <InputText id="numeroCompte" value={numeroCompte} onChange={(e) => setNumeroCompte(e.target.value)} />
      </div>

      <Button label="Obtenir le solde" onClick={fetchSoldeByCompte} />

      <Dialog header="Solde du compte" visible={dialogVisible} onHide={hideDialog}>
        <div>Solde: {solde}</div>
      </Dialog>
    </div>
  );
};

export default Comptel;
