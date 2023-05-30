import React, { useEffect, useState, useRef } from "react";
import { Img, Input, List, Text } from "../components";
import { Clientervice } from "../service/client.service";
import { Compteservice } from "../service/compte.service";
import { Operationservice } from "../service/operation.service";
import { utilisateurService } from "../service/utilisateur.service";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import QRCode from 'qrcode.react';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Banqueservice } from '../service/banque.service';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
};
const Home = () => {
  const [client, setClient] = useState(null);
  const [compte, setCompte] = useState(null);
  const [operations, setOperations] = useState(null);
  const [id, setId] = useState(null);
  const [banqueDialog, setBanqueDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [montant, setMontant] = useState();
  const toast = useRef(null);

  const [lineOptions, setLineOptions] = useState(null);

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    setLineOptions(lineOptions);
  };

  const fetchData = async () => {
    try {
      const clientResponse = await Clientervice.getByEmail(utilisateurService.getTokenInfo().sub);
      setClient(clientResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setId(client?.id)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (client) {
      setId(client.id);
    }
  }, [client]);

  const fetchDataCompte = async () => {
    if (id) {
      try {
        const compteResponse = await Compteservice.getByClient(id);
        setCompte(compteResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchDataCompte();
  }, [id]);

 

  const fetchDataOperation = async () => {
    if (id) {
      try {
        const operationResponse = await Operationservice.getByCompte(id);
        setOperations(operationResponse.data);

      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchDataOperation();
  }, [id]);

 /* useEffect(() => {
    console.log(operations);
  }, [operations]);*/
  ///************************* */

  const saveProduct = () => {
    if (!montant || !compte.compteRecoit) {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Remplir tous les info', life: 3000 });
    } else {
      try {
        if (montant > compte.solde) {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'sold insuffisant', life: 3000 });
        }
        else {
          Banqueservice.viremantBetweenClientByNumeroCompte(compte.numeroCompte, compte.compteRecoit, montant)
            .then(() => {
              setSubmitted(true);
              setBanqueDialog(false)
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Retrait done', life: 2000 });
              fetchData();
              fetchDataCompte();
            })
        }
      }
      catch (error) {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'err', life: 3000 });
      };
    }
  };
  const hideDialog = () => {
    setSubmitted(false);
    setBanqueDialog(false);
  };

  const onInputNumberChange = (e) => {
    const val = e.value || 0;
    setMontant(val);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...compte };

    _product[`${name}`] = val;

    setCompte(_product);
  };


  const banqueDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const renderMontant = (rowData) => {
    return (
      <>
        {rowData.montant} DH
      </>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="bg-gray_100 flex sm:flex-col md:flex-col flex-row font-inter sm:gap-5 md:gap-5 items-start mx-auto pb-[30px] w-full">
        <div className="flex flex-1 flex-col gap-[25px] items-center justify-start md:px-5 w-full">
          <div className="flex flex-col gap-6 items-center justify-start w-[94%] md:w-full my-4 mx-auto">
            <div className="flex md:flex-col flex-row gap-[30px] items-center justify-between w-full">
              <div className="flex md:flex-1 flex-col items-center justify-start w-[66%] md:w-full">
                <div className="flex flex-col gap-5 items-center justify-start w-full">
                  <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                    <Text className="text-bluegray_900" as="h3" variant="h3">
                      My Card  <Text className="text-bluegray_900" variant="body2">
                      </Text>
                    </Text>
                  </div>
                  <div className="flex md:flex-col flex-row gap-[30px] items-center justify-between w-full">
                    <div className="bg-indigo_600 flex md:flex-1 flex-col gap-[33px] items-center justify-end pt-6 rounded-[25px] w-[48%] md:w-full">
                      <div className="flex flex-col gap-[29px] items-start justify-start w-[87%] md:w-full">
                        <div className="flex flex-row items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start ml-4">
                            <Text
                              className="font-lato text-white_A700"
                              variant="body5"
                            >
                              Balance
                            </Text>
                            <Text
                              className="font-inter font-normal mt-1 text-white_A700"
                              as="h4"
                              variant="h4"
                            >
                              {compte?.solde} DH
                            </Text>
                          </div>
                          <Img
                            src="images/img_chipcard.png"
                            className="h-[34px] md:h-auto mr-20 object-cover w-[34px]"
                            alt="ChipCard"
                          />
                        </div>
                        <div className="flex flex-row gap-[59px] items-center justify-start ml-4 md:ml-[0] w-[76%] md:w-full" >
                          <div className="flex flex-col items-start justify-start">
                            <Text
                              className="text-white_A700_b2"
                              variant="body5"
                            >
                              CARD HOLDER
                            </Text>
                            <Text
                              className="font-normal mt-1 text-white_A700"
                              variant="body2"
                            >
                              {client?.nom} {client?.prenom}
                            </Text>
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <Text
                              className="text-white_A700_b2"
                              variant="body5"
                            >
                              VALID THRU
                            </Text>
                            <Text
                              className="font-normal mt-1 text-white_A700"
                              variant="body2"
                            >
                              12/27
                            </Text>
                          </div>
                        </div>
                      </div>
                      <Input
                        wrapClassName="flex w-full"
                        className="font-normal leading-[normal] md:text-xl p-0 placeholder:text-white_A700 sm:text-lg text-[22px] text-left text-white_A700 w-full"
                        name="Group319"
                        placeholder={compte?.numeroCompte}
                        suffix={
                          <Img
                            src="images/img_contrast.svg"
                            className="ml-[35px] mr-6 my-5"
                            alt="contrast"
                          />
                        }
                        shape="CustomBorderBL25"
                        size="lg"
                        variant="GradientWhiteA70026WhiteA70026"
                      ></Input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-1 flex-col gap-5 items-start justify-start w-[32%] md:w-full">
              
                <List
                  className="bg-white_A700 flex-col gap-2.5 grid items-center p-6 sm:px-5 rounded-[25px] w-full"
                  orientation="vertical"
                >
                  <div className="flex flex-1 flex-row items-center justify-start w-full">
                    <Button
                      className="flex h-[55px] items-center justify-center rounded-[50%] w-[55px]"
                      size="mdIcn"
                      variant="icbFillGray102"
                      onClick={() => setBanqueDialog(true)}
                    >
                      <Img
                        src="images/img_videocamera.svg"
                        className="h-7"
                        alt="videocamera"
                      />

                    </Button>
                    <Dialog visible={banqueDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Virement : " modal className="p-fluid" footer={banqueDialogFooter} onHide={hideDialog}>

                      <div className="field">
                        <label htmlFor="compteEnvoie" className="font-bold">
                          Num compte Envoie :
                        </label>
                        <InputText id="compteEnvoie" value={compte?.numeroCompte} required rows={3} cols={20} />
                      </div>
                      <div className="field">
                        <label htmlFor="compteRecoit" className="font-bold">
                          Num compte Recoit :
                        </label>
                        <InputText id="compteRecoit" value={compte?.compteRecoit} onChange={(e) => onInputChange(e, 'compteRecoit')} required rows={3} cols={20} />
                        {submitted && !compte?.compteRecoit && <small className="p-error">Numero de compte vide!</small>}
                      </div>
                      <div className="formgrid grid">
                        <div className="field col">
                          <label htmlFor="montant" className="font-bold">
                            Price
                          </label>
                          <InputNumber id="montant" value={montant} onValueChange={(e) => onInputNumberChange(e, 'montant')} required mode="currency" currency="MAD" locale="en-US" />
                        </div>
                      </div>

                    </Dialog>

                    <div className="flex flex-col gap-[7px] items-start justify-start ml-[17px]">
                      <Text
                        className="font-medium text-bluegray_600"
                        variant="body1"
                      ><Text
                    >
                    </Text>
                        Virement
                      </Text>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        30 Mai 2023
                      </Text>
                    </div>
                    <Text
                      className="font-medium ml-[13px] text-red_700"
                      variant="body1"
                    >
                      -{montant} DH
                    </Text>
                  </div>

                  <div className="flex flex-1 flex-row items-center justify-start w-full">
                    <Button
                      className="flex h-[55px] items-center justify-center rounded-[50%] w-[55px]"
                      size="mdIcn"
                      variant="icbFillGray102"
                    >
                      <Img
                        src="images/img_link.svg"
                        className="h-7"
                        alt="link"
                      />
                    </Button>
                    <div className="flex flex-col gap-[7px] items-center justify-start ml-[17px]">
                      <Text
                        className="font-medium text-bluegray_600"
                        variant="body1"
                      >
                        Deposit Paypal
                      </Text>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        25 January 2021
                      </Text>
                    </div>
                    <Text
                      className="font-medium ml-[46px] text-green_600"
                      variant="body1"
                    >
                      +2,500 DH
                    </Text>
                  </div>
                  <div className="flex flex-1 flex-row items-center justify-start w-full">
                    <Button
                      className="flex h-[55px] items-center justify-center rounded-[50%] w-[55px]"
                      size="mdIcn"
                      variant="icbFillGray102"
                    >
                      <Img
                        src="images/img_clock.svg"
                        className="h-7"
                        alt="clock"
                      />
                    </Button>
                    <div className="flex flex-col gap-[7px] items-start justify-start ml-[17px]">
                      <Text
                        className="font-medium text-bluegray_600"
                        variant="body1"
                      >
                        Jemi Wilson
                      </Text>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        21 January 2021
                      </Text>
                    </div>
                    <Text
                      className="font-medium ml-12 text-green_600"
                      variant="body1"
                    >
                      +5,400 DH
                    </Text>
                  </div>
                  <div className="flex flex-col gap-[7px] items-end mt-[-220px] mr-[50px]">
                    <QRCode value={`NOM: ${client?.nom} Prenom: ${client?.prenom} Numero Compte:${compte?.numeroCompte}`} />
                  </div>
                </List>
              </div>
            </div>
            <div className="flex md:flex-col flex-row gap-[30px] items-center justify-between w-full">
              <div className="col-12 xl:col-6">
                <div className="card">
                  <h5>Recent Transactions</h5>
                  <DataTable value={operations} rows={5} paginator responsiveLayout="scroll">
                    <Column field="montant" header="montant" sortable style={{ width: '35%' }} body={renderMontant} />
                    <Column field="date" header="date" sortable style={{ width: '35%' }} />
                  </DataTable>
                </div>
              </div>
              <div className="flex md:flex-1 flex-col gap-5 items-start justify-start w-[32%] md:w-full">
                {/* Render the QR code */}
                <div className="col-12 xl:col-6">
                  <div className="card">
                    <h5>Sales Overview</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
