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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";
import { Compteservice } from "../service/compte.service";
import { Agenceservice } from "../service/agence.service";
import { Clientervice } from "../service/client.service";
import { utilisateurService } from "../service/utilisateur.service";

const theme = createTheme();

export default function Compte() {
  const [clients, setClients] = useState([]);
  const [agences, setAgences] = useState([]);

  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [cl, setCl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [allC, setAllC] = useState([]);

  const [v, setV] = useState("");
  const [c, setC] = useState("");
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);

  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [modalClient, setMc] = useState("");

  const [selectedAgence, setselectedAgence] = useState(null);
  //

  // SAVE
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let d = {
      numeroCompte: data.get("numeroCompte"),
      solde: data.get("solde"),
      agence: {
        id: v,
      },
      client: {
        id: c,
      },
    };
  
    if (!d) {
      alert("Compte vide !");
    } else {
      try {
        console.log(utilisateurService.getRole());
        await Compteservice.AddCompte(d)
       
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Ignoring the 403 Forbidden error
          console.log('Request failed with status code 403 - Forbidden');
        } else {
          // Handle other errors
          console.log('Error:', error);
        }
      }
    }
    forceUpdate(); // re-render or update state
  };
  
  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  




  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await Compteservice.getAllCompte();
      console.log(res.data)
      setVl(
        res.data.map((row) => ({
          id: row.id,
          numeroCompte: row.numeroCompte,
          solde: row.solde,
          agence: row.agence.adresse,
          client: row.client.nom,

        }))
      );
      setAgences([...agences, vl]);
      setClients([...clients, vl]);

    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    getVl();
  }, [upTB]);

  // Delete
  function deleteUser(id) {
    Compteservice.DeleteCompte(id)
    .then((result) => {
      console.log("delete ", id);
    });
    forceUpdate(); // rel
  }

  // villes

  // select villes
  useEffect(() => {
    Agenceservice.getAllAgence()
    .then((res) => {
      setAllV(res.data);
    });
  }, []);

  useEffect(() => {
   Clientervice.getAllClient()
   .then((res) => {
      setAllC(res.data);
    });
  }, []);

  const handleChange4 = (event) => {
    setText(event.target.value);
  };
  const handleChange = (event) => {
    console.log(event.target.value)
    setV(event.target.value);
  };
  const handleChange1 = (event) => {
    console.log(event.target.value)
    setC(event.target.value);
  };
  //
  //MODAL
  const ModalhandleChange = (e) => {
    setMv(e.target.value);
  };
  const ModalhandleChange1 = (e) => {
    setMc(e.target.value);
  };
  //

  const updateZone = () => {
    let upForm = {
      id: selectedAgence.id,
      numeroCompte: form.getFieldValue("numeroCompte"),
      solde: form.getFieldValue("solde"),
      agence:{
        id : modalVille,
      },
      client:{
        id : modalClient,
      } 
    }
    console.log("upForm ", upForm)
    Compteservice.UpdateCompte(upForm)
     .then(() => {
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    forceUpdate();
  };

  const handleCancel = () => {
    setselectedAgence(null);
    setOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    setselectedAgence(record);
    setOpen(true);
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    updateZone();
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("selectedAgence after update: ", selectedAgence);
  }, [selectedAgence]);
  useEffect(() => {
    form.setFieldsValue({
      numeroCompte: selectedAgence?.numeroCompte,
      solde: selectedAgence?.solde,
      agence: selectedAgence?.agence,
      client: selectedAgence?.client,

    });
  }, [selectedAgence, form]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "numeroCompte",
      dataIndex: "numeroCompte",
      key: "numeroCompte",
    },
    {
      title: "Solde",
      dataIndex: "solde",
      key: "solde",
    },
    {
      title: "Agence",
      dataIndex: "agence",
      key: "agence",
      filters: allV.map((v) => ({
        text: v.adresse,
        value: v.adresse,
      })),
      onFilter: (value, record) => record.agence.indexOf(value) === 0,
    },
    {
        title: "Client",
        dataIndex: "client",
        key: "client",
        filters: allC.map((c) => ({
          text: c.nom,
          value: c.nom,
        })),
        onFilter: (value, record) => record.client.indexOf(value) === 0,
      },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined" onClick={() => handleUpdate(record)}>
            Update
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteUser(record.id)}
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PublicIcon sx={{ m: 3 }}>
            <LockOutlinedIcon />
          </PublicIcon>
          <Typography component="h1" variant="h5">
            Ajouter Compte
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="numeroCompte"
              label="numeroCompte"
              id="numeroCompte"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="solde"
              label="solde"
              id="solde"
              autoFocus
              value={text}
          onChange={handleChange4}
          onKeyPress={handleKeyPress}
          error={!isValid}
          helperText={!isValid ? "Veuillez entrer uniquement des caractères numériques." : ""}
            />

            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel>Agence</InputLabel>
              <Select
                value={vl}
                label="agences"
                onChange={handleChange}
              >
                {allV?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.adresse}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel>Client</InputLabel>
              <Select
                value={vl}
                label="clients"
                onChange={handleChange1}
              >
                {allC?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.nom}</MenuItem>
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
        dataSource={vl}
        loading={loading}
        bordered
        onChange={onChange}
      />
      <Modal
        forceRender
        title="Title"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={form.submit}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            numeroCompte: selectedAgence?.numeroCompte,
            solde: selectedAgence?.solde,
            agence: selectedAgence?.agence,
            client: selectedAgence?.client


          }}
        >
          <Form.Item
            label="numeroCompte"
            name="numeroCompte"
            rules={[
              {
                required: true,
                message: "Please input your numero de compte!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="solde"
            name="solde"
            rules={[
              {
                required: true,
                message: "Please input your solde!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <InputLabel id="demo-simple-select-label">Agence</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAgence?.agence}
            label="villes"
            onChange={ModalhandleChange}
          >
            {allV?.map((item) => (
              <MenuItem  key={item.id}value={item.id}>{item.adresse}</MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAgence?.client}
            label="villes"
            onChange={ModalhandleChange1}
          >
            {allC?.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.nom}</MenuItem>
            ))}
          </Select>

        </Form>
      </Modal>
    </ThemeProvider>
  );
}