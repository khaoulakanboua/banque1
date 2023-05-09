import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import Modal from "react-modal";



const AgenceList = ({ villeId }) => {
    const [agences, setAgences] = useState([]);
    const [villes, setVilles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAgence, setSelectedAgence] = useState(null);

    useEffect(() => {
        axios.get("/banque/agences/read").then((response) => {
          setAgences(response.data);
        });
      }, [villeId]);
    useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`/banque/villes/read`);
            setVilles(result.data);
        };
        fetchCities();
    }, []);

const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this agence?")) {
          axios.delete(`/banque/agences/delete/${id}`).then(() => {
            setAgences(agences.filter((item) => item.id !== id));
          });
        }
      };
      const handleOpenModal = (agence) => {
        setSelectedAgence(agence);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAgence(null);
        setModalIsOpen(false);
    };

    const handleSave = () => {
        handleCloseModal();
    };

const handleEdit = (id) => {
        const newNom = window.prompt("Enter the new name for this serie:");
        if (newNom) {
          axios.put(`/banque/agences/update/${id}`, {nom:newNom }).then(() => {
            setAgences(agences.map((agence) => {
              if (agence.id === id) {
                return { ...agence, nom: newNom };
              }
              return agence;
            }));
          });
        }
      };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


  return (
   
    <TableContainer component={Paper}>

    <Button href="/addAgence" className="btn btn-primary">
    Create Agence
    </Button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Adresse</StyledTableCell>
            <StyledTableCell align="right">Code</StyledTableCell>
            <StyledTableCell align="right">Ville</StyledTableCell>

            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agences.map((agence) => (
            <StyledTableRow key={agence.id}>
              <StyledTableCell component="th" scope="row">
                {agence.id}
              </StyledTableCell>
              <StyledTableCell align="right">{agence.adresse}</StyledTableCell>
              <StyledTableCell align="right">{agence.code}</StyledTableCell>
              <StyledTableCell align="right">{agence.ville && agence.ville.nom}</StyledTableCell>


              <StyledTableCell align="right">
                <Button variant="outlined" color="error" onClick={() => handleDelete(agence.id)}>
                Delete
                </Button>
                <Button variant="outlined" color="success" onClick={() => handleOpenModal(agence)}>
                Update
                </Button>
                </StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de l'agence'</h3>
                <ul>
                    <li>
                        <label>Adresse:</label>
                        <input type="text" value={selectedAgence && selectedAgence.adresse} />
                    </li>
                    <li>
                        <label>Code:</label>
                        <input type="text" value={selectedAgence && selectedAgence.code} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={selectedAgence && selectedAgence.ville && selectedAgence.ville.id}>
                            {villes.map((ville) => (
                                <option key={ville.id} value={ville.id}>
                                    {ville.nom}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Sauvegarder
                </button>
            </Modal>

    </TableContainer>
    
  );
};
export default AgenceList;