import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const AgenceForm = () => {
    const [adresse, setAdresse] = useState("");
    const [code, setCode] = useState("");

    const [villeId, setVilleId] = useState("");
    const [villes, setVilles] = useState([]);


    useEffect(() => {
        axios.get("/banque/villes/read").then((response) => {
            setVilles(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/banque/agences/create", {
            adresse,
            code,
            ville: {
                id: villeId
            }
   

        }).then((response) => {
            //onZoneAdded(response.data);
            setAdresse("");
            setCode("");
            setVilleId("");
            
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom">Adresse:</label>
                <input
                    type="text"
                    className="form-control"
                    id="adresse"
                    value={adresse}
                    onChange={(event) => setAdresse(event.target.value)}
                />
            </div>


            <div className="form-group">
                <label htmlFor="nom">Code:</label>
                <input
                    type="text"
                    className="form-control"
                    id="code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="villeId">City:</label>
                <select
                    className="form-control"
                    id="villeId"
                    value={villeId}
                    onChange={(event) => setVilleId(event.target.value)}
                >
                    <option value="">Select a city </option>
                    {villes && villes.map((ville) => (
                        <option key={ville.id} value={ville.id}>
                            {ville.nom}
                        </option>
                    ))}
                </select>
            </div>
            <Button type="submit" variant="contained" style={{marginTop:20}}>
          Create
        </Button>
        </form>
    );
};

export default AgenceForm;