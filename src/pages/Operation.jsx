import React, { useEffect, useReducer, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm, Modal, Form, Input, Button, DatePicker } from "antd";
import { Operationservice } from "../service/operation.service";
import { Compteservice } from "../service/compte.service";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const theme = createTheme();

export default function Operation() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState([]);
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [v, setV] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [selectedAgence, setselectedAgence] = useState(null);
  // date filter
  const [dateFilter, setDateFilter] = useState(null);

  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await Operationservice.getAllOperation();
      setVl(
        res.data.map((row) => ({
          id: row.id,
          code: row.code,
          date: row.date,
          montant: row.montant,
          compte: row.compte.numeroCompte,
        }))
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

  // select villes
  useEffect(() => {
    Compteservice.getAllCompte().then((res) => {
      setAllV(res.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      code: selectedAgence?.code,
      adresse: selectedAgence?.adresse,
      ville: selectedAgence?.ville,
    });
  }, [selectedAgence, form]);



  const generatePDF = () => {
    const tableRef = document.getElementById("table-to-pdf"); // Give your table an id attribute
    
    html2canvas(tableRef).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 10);
      pdf.save("table.pdf");
    });
  };
  

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={dateFilter}
            onChange={(dateFilter) => {
              // Ensure the date value is a moment object
              const momentDate = dateFilter ? dateFilter : null;
              console.log(momentDate); // Log the selected date

              setDateFilter(momentDate);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
           <Space>
            <Button
              type="primary"
              onClick={() => {
                setDateFilter(dateFilter ? [dateFilter] : []);
                confirm(); // Use confirm function from the parameter
              }}
              size="small"
              style={{ width: 90 }}
            >
              Filter
            </Button>
            <Button
              onClick={() => {
                setDateFilter([]);
                clearFilters(); // Use clearFilters function from the parameter
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        const recordDate = moment(record.date, "YYYY-MM-DD");
        return value ? recordDate.isSame(value, "day") : true;
      },
      render: (text) => {
        const dateObj = moment(text);
        return dateObj.isValid() ? dateObj.format("YYYY-MM-DD") : "";
      },
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
      onFilter: (value, record) => record.compte.indexOf(value) === 0,
    },
  ];

  const onChange = (pagination, filters) => {
    setDateFilter(filters.date.length ? filters.date[0] : null);
    console.log(dateFilter)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      </Container>
      <Table
        id="table-to-pdf" // Add an id attribute to your table
        columns={columns}
        dataSource={vl}
        loading={loading}
        bordered
        onChange={onChange}
      />
      <Button onClick={generatePDF}>Generate PDF</Button> {/* Add a button to trigger PDF generation */}
    </ThemeProvider>
  );
  
}
