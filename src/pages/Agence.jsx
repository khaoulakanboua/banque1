import React, { useEffect, useReducer, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";
import { FormControlLabel } from '@mui/material';

const theme = createTheme();

export default function Agence() {
  const [villes, setVilles] = useState([]);
  const [v, setV] = useState()
  const [loading, setLoad] = useState(false);
  const [ag, setAg] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb

  // SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      code: data.get("code"),
      adresse: data.get("adresse"),
      ville: {
        id: v,
      },
    };
    if (!d.nom) {
      alert("agence vide !");
    } else {
      fetch("http://localhost:8080/banque/agences/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      }).then(() => {
        forceUpdate(); // rel
      });
    }
  };
  // select villes
  useEffect(() => {
    axios.get("http://localhost:8080/banque/villes/read").then((res) => {
      console.log("villes ", res.data)
      setVilles(res.data);
    });
  }, []);

  const handleChange = (event) => {
    setV(event.target.value);
  };

  // ALL
  const getAllAgences = async () => {
    setLoad(true);
    try {
      const res = await axios.get("http://localhost:8080/banque/agences/read")
      setAg(
        res.data.map((row) => ({
          id: row.id,
          code: row.code,
          adresse: row.adresse,
          ville: row.ville.nom,
        }))
      );
      setVilles([...villes, v]);
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    getAllAgences();
  }, [upTB]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "Ville",
      dataIndex: "ville",
      key: "ville",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined" onClick={() => console.log(record)}>
            Update
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => console.log(record.id)}
          >
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];
  const onChange = (filters) => {
    console.log("params", filters.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PublicIcon sx={{ m: 3 }}>
            <LockOutlinedIcon />
          </PublicIcon>
          <Typography component="h1" variant="h5">
            Ajouter Agence
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="adresse"
              label="adresse"
              id="adresse"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="Code"
              id="code"
              autoFocus
            />
            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel id="demo-simple-select-label">Villes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={v}
                label="villes"
                onChange={handleChange}
              >
                {villes?.map((item) => (
                  <MenuItem>ertg</MenuItem>
                ))}
              </Select>

            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>

      <Table
        columns={columns}
        dataSource={ag}
        loading={loading}
        bordered
        onChange={onChange}
      />
    </ThemeProvider>
  );
}