import React, { useEffect, useReducer, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";
import { Operationservice } from "../service/operation.service";
import { Compteservice } from "../service/compte.service";

const theme = createTheme();

export default function Operation() {
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

 
  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await Operationservice.getAllOperation();
      setVl(
        res.data.map((row) => ({
          id: row.id,
          dtype:row.dtype,
          code: row.code,
          date: row.date,
          montant:row.montant,
          compte:row.compte.numeroCompte,
                 })
                 )
      );
      console.log(res.data);
      setVilles([...villes, vl]);
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    getVl();
  }, [upTB]);

 
  // villes

  // select villes
  useEffect(() => {
    Compteservice.getAllCompte()
    .then((res) => {
      setAllV(res.data);
    });
  }, []);

 
  useEffect(() => {
    form.setFieldsValue({
      code: selectedAgence?.code,
      adresse: selectedAgence?.adresse,
      ville: selectedAgence?.ville
    });
  }, [selectedAgence, form]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
        title: "dtype",
        dataIndex: "dtype",
        key: "dtype",
      },
    {
        title: "code",
        dataIndex: "code",
        key: "code",
      },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "montant",
      dataIndex: "montant",
      key: "montant",
    },
    {
      title: "compte",
      dataIndex: "compte",
      key: "compte",
      filters: allV.map((v) => ({
        text: v.numeroCompte,
        value: v.numeroCompte,
      })),
      onFilter: (value, record) => record.ville.indexOf(value) === 0,
    },
    
  ];
  const onChange = (filters) => {
    console.log("params", filters.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
      </Container>

      <Table
        columns={columns}
        dataSource={vl}
        loading={loading}
        bordered
        onChange={onChange}
      />
      
       
    </ThemeProvider>
  );
}