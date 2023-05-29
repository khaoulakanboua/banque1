import React, { useEffect, useReducer, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Button, DatePicker } from "antd";
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
  // date filter
  const [datetimeFilter, setDatetimeFilter] = useState(null);

  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await Operationservice.getAllOperation();
      const updatedVl = res.data.map((row) => ({
        id: row.id,
        code: row.code,
        date: row.date,
        montant: row.montant,
        compte: row.compte.numeroCompte,
      }));
      setVl(updatedVl);
      setVilles([...villes, ...updatedVl]); // Use spread operator to merge the updated data with existing data
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

  const exportToExcel = () => {
    const csvContent = vl
      .map(
        (row) =>
          `${row.id},${row.code},"${moment(row.date).format(
            "YYYY-MM-DD HH:mm:ss"
          )}",${row.montant},${row.compte}`
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "table.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
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
    },
  ];

  const onChange = (pagination, filters) => {
    const selectedDatetimeFilter = filters.date ? filters.date[0] : null;
    setDatetimeFilter(selectedDatetimeFilter);
  };

  const handleDateTimeFilterChange = (value) => {
    setDatetimeFilter(value ? value.startOf("minute") : null);
  };

  const filteredData = datetimeFilter
    ? vl.filter((row) =>
        moment(row.date).isSameOrAfter(datetimeFilter, "minute")
      )
    : vl;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      </Container>
      <DatePicker
        showTime
        format="YYYY-MM-DD"
        onChange={handleDateTimeFilterChange}
      />

      <Table
        id="table-to-pdf"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        bordered
        onChange={onChange}
      />

      <Button onClick={generatePDF}>Generate PDF</Button>
      <Button onClick={exportToExcel}>Export to Excel</Button>
    </ThemeProvider>
  );
}
