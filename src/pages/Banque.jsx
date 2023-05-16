import React, { useState } from 'react';
import { Banqueservice } from '../service/banque.service';
import { Form, Input, Button, notification } from 'antd';


const Banque = () => {
    const [numeroCompte, setNumeroCompte] = useState('');
    const [montant, setMontant] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Banqueservice.depotByNumeroCompte({ numeroCompte:numeroCompte}, montant );

      if (response.data === true) {
        setSuccess(true);
        setError(null);
        notification.success({ message: 'Deposit successful' });

      } else {
        setSuccess(false);
        setError('Error in deposit');
        notification.error({ message: 'Error in deposit' });

      }
    } catch (error) {
      setSuccess(false);
      setError('An error occurred while processing the request.');
      notification.error({
        message: 'Error',
        description: 'An error occurred while processing the request.',
      });
    }
  };


  const handleSubmitRetrait = async (e) => {
    e.preventDefault();

    try {
      const response = await Banqueservice.retraitByNumeroCompte({ numeroCompte:numeroCompte}, montant );

      if (response.data === true) {
        setSuccess(true);
        setError(null);
        notification.success({ message: 'Retrait successful' });

      } else {
        setSuccess(false);
        setError('Error in retrait');
        notification.error({ message: 'Error in Retrait' });

      }
    } catch (error) {
      setSuccess(false);
      setError('An error occurred while processing the request.');
      notification.error({
        message: 'Error',
        description: 'An error occurred while processing the request.',
      });
    }
  };
  // ...

  return (
    <div>
      {success && <p>sucess.</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="numeroCompte">Account Number:</label>
        <input
          type="text"
          id="numeroCompte"
          value={numeroCompte}
          onChange={(e) => setNumeroCompte(e.target.value)}
        />

        <label htmlFor="montant">Amount:</label>
        <input
          type="number"
          id="montant"
          value={montant}
          onChange={(e) => setMontant(parseFloat(e.target.value))}
        />

        <button type="submit">Deposit</button>
      </form>
      <form onSubmit={handleSubmitRetrait}>
      <br></br><br></br><br></br>
        <label htmlFor="numeroCompte">Account Number:</label>
        <input
          type="text"
          id="numeroCompte"
          value={numeroCompte}
          onChange={(e) => setNumeroCompte(e.target.value)}
        />

        <label htmlFor="montant">Amount:</label>
        <input
          type="number"
          id="montant"
          value={montant}
          onChange={(e) => setMontant(parseFloat(e.target.value))}
        />

        <button type="submit">Retrait</button>
      </form>
      
    </div>




  );
};

export default Banque;
