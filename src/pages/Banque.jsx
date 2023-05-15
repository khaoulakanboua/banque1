import React, { useState } from 'react';
import axios from 'axios';

const DepotForm = () => {
  const [numeroCompte, setNumeroCompte] = useState('');
  const [montant, setMontant] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/banque/apis/depotByNumeroCompte?montant', {
        numeroCompte: numeroCompte,
      });

      if (response.data === true) {
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError('Error dans le depot');
      }
    } catch (error) {
      setSuccess(false);
      setError('An error occurred while processing the request.');
    }
  };

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
    </div>
  );
};

export default DepotForm;
