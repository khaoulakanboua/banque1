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

const theme = createTheme();

export default function Agence() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [v, setV] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [selectedZone, setSelectedZone] = useState(null);
  //

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
    if (!d) {
      alert("Agence vide !");
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

  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await axios.get("http://localhost:8080/banque/agences/read");
      setVl(
        res.data.map((row) => ({
          id: row.id,
          code: row.code,
          adresse: row.adresse,
          ville: row.ville.nom,
        }))
      );
      setVilles([...villes, vl]);
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
    axios.delete(`http://localhost:8080/banque/agences/delete/${id}`).then((result) => {
      console.log("delete ", id);
    });
    forceUpdate(); // rel
  }

  // villes

  // select villes
  useEffect(() => {
    axios.get("http://localhost:8080/banque/villes/read").then((res) => {
      setAllV(res.data);
    });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value)
    setV(event.target.value);
  };
  //
  //MODAL
  const ModalhandleChange = (e) => {
    setMv(e.target.value);
  };
  //

  const updateZone = () => {
    axios
      .put(`http://localhost:8080/banque/agences/update`, {
        id: selectedZone.id,
        code: form.getFieldValue("code"),
          adresse: form.getFieldValue("adresse"),
        ville: {
          id: modalVille,
        },
      })
      .then((result) => {
        getVl();
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    forceUpdate();
  };

  const handleCancel = () => {
    setSelectedZone(null);
    setOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    setSelectedZone(record);
    setOpen(true);
  };

  const handleSubmit = () => {
    setModalText("The modal will be closed after one second");
    setConfirmLoading(true);
    updateZone();
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("SelectedZone after update: ", selectedZone);
  }, [selectedZone]);
  useEffect(() => {
    form.setFieldsValue({ 
          code: selectedZone?.code,
          adresse: selectedZone?.adresse,
          ville: selectedZone?.ville, });
  }, [selectedZone, form]);
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
      filters: allV.map((v) => ({
        text: v.nom,
        value: v.nom,
      })),
      onFilter: (value, record) => record.ville.indexOf(value) === 0,
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
            Ajouter Agence
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="code"
              id="code"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="adresse"
              label="adresse"
              id="adresse"
              autoFocus
            />
            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel id="demo-simple-select-label">Villes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vl}
                label="villes"
                onChange={handleChange}
              >
                {allV?.map((item) => (
                  <MenuItem value={item.id}>{item.nom}</MenuItem>
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
                        
                        code: selectedZone?.code,
                        adresse: selectedZone?.adresse,
                        ville : selectedZone?.ville
                        
                    }}
                >
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: "Please input your code!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Adresse"
                        name="adresse"
                        rules={[
                            {
                                required: true,
                                message: "Please input your adresse!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                   
              <InputLabel id="demo-simple-select-label">Villes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vl}
                label="villes"
                onChange={handleChange}
              >
                {allV?.map((item) => (
                  <MenuItem value={item.id}>{item.nom}</MenuItem>
                ))}
              </Select>
    
              
              </Form>
            </Modal>
    </ThemeProvider>
  );
}