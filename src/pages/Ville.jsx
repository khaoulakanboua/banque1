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

export default function Ville() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [v, setV] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [selectedAgence, setselectedAgence] = useState(null);
  //

  // SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
      code: data.get("code"),
      
    };
    if (!d) {
      alert("Ville vide !");
    } else {
      fetch("/banque/villes/create", {
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
      const res = await axios.get("/banque/villes/read");
      setVl(
        res.data.map((row) => ({
          id: row.id,
          nom: row.nom,
          code: row.code,
        }))
      );
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
    axios.delete(`/banque/villes/delete/${id}`).then((result) => {
      console.log("delete ", id);
    });
    forceUpdate(); // rel
  }

  // villes

  // select villes
  useEffect(() => {
    axios.get("/banque/villes/read").then((res) => {
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
    let upForm = {
      id: selectedAgence.id,
      nom: form.getFieldValue("nom"),
      code: form.getFieldValue("code"),
    }
    console.log("upForm ", upForm)
    axios
      .put(`/banque/villes/update`, upForm)
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
      nom: selectedAgence?.nom,
      code: selectedAgence?.code,
    });
  }, [selectedAgence, form]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
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
            Ajouter Ville
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nom"
              label="nom"
              id="nom"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="code"
              id="code"
              autoFocus
            />
           
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
            nom: selectedAgence?.nom,
            code: selectedAgence?.code,

          }}
        >
          <Form.Item
            label="Nom"
            name="nom"
            rules={[
              {
                required: true,
                message: "Please input your nom!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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

          


        </Form>
      </Modal>
    </ThemeProvider>
  );
}