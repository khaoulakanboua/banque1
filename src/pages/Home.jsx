import React, { useEffect, useState } from "react";
import { Button, Img, Input, Line, List, Text } from "../components";
import { Clientervice } from "../service/client.service";
import { Compteservice } from "../service/compte.service";
import { Operationservice } from "../service/operation.service";
import { utilisateurService } from "../service/utilisateur.service";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import axios from 'axios'
import QRCode from 'qrcode.react';



const Home = () => {
  const [client, setClient] = useState(null);
  const [compte, setCompte] = useState(null);
  const [operations, setOperations] = useState(null);
  const [id, setId] = useState(null);
  const [idO, setIdO] = useState(null);

  
  const [numeroCompte, setnumeroCompte] = useState(null);

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await Clientervice.getByEmail(utilisateurService.getId());
        setClient(clientResponse.data);
        console.log(clientResponse.data);
        //console.log(utilisateurService.getId());
        console.log(utilisateurService.getNom());
        console.log(utilisateurService.getPrenom());
        console.log(utilisateurService.getCin());


      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (client) {
      setId(client.id);
    }
  }, [client]);
 
  
  const fetchDataCompte = async () => {
    if (utilisateurService.getId()) {
      try {
        const compteResponse = await Compteservice.getByClient(utilisateurService.getId());
        setCompte(compteResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    fetchDataCompte();

  }, []);
  
  useEffect(() => {
    if (compte) {
      setId(compte.id);
      setnumeroCompte(compte.numeroCompte);
    }
  }, [compte]);
  
  useEffect(() => {
    Operationservice.getAllOperation().then((res) => setOperations(res.data));
  }, []);
  
  const fetchDataOperation = async () => {
    if (utilisateurService.getId()) {
      try {
        const operationResponse = await Operationservice.getByCompte(utilisateurService.getId());
        setOperations(operationResponse.data);
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    fetchDataOperation();
    console.log(operations)

  }, []);
  
  useEffect(() => {
    if (operations) {
      setIdO(operations.id);

      //setnumeroCompte(compte.numeroCompte);
    }
  }, [operations]);


  return (
    <>
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
                              {utilisateurService.getNom()} {utilisateurService.getPrenom()}
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
                              12/22
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
                <Text className="text-bluegray_900" as="h3" variant="h3">
                  Recent Transaction
                </Text>
                <List
                  className="bg-white_A700 flex-col gap-2.5 grid items-center p-6 sm:px-5 rounded-[25px] w-full"
                  orientation="vertical"
                >
                  <div className="flex flex-1 flex-row items-center justify-start w-full">
                    <Button
                      className="flex h-[55px] items-center justify-center rounded-[50%] w-[55px]"
                      size="mdIcn"
                      variant="icbFillGray102"
                    >
                      <Img
                        src="images/img_videocamera.svg"
                        className="h-7"
                        alt="videocamera"
                      />
                    </Button>
                    <div className="flex flex-col gap-[7px] items-start justify-start ml-[17px]">
                      <Text
                        className="font-medium text-bluegray_600"
                        variant="body1"
                      >
                        Deposit from my Card (Virement)
                      </Text>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        28 January 2021
                      </Text>
                    </div>
                    <Text
                      className="font-medium ml-[13px] text-red_700"
                      variant="body1"
                    >
                      -$850
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
                      +$2,500
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
                      +$5,400
                    </Text>
                  </div>
                </List>
              </div>
            </div>
            <div className="flex md:flex-col flex-row gap-[30px] items-center justify-between w-full">
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Recent Sales</h5>
                    <DataTable value={operations} rows={5} paginator responsiveLayout="scroll">
                        <Column field="montant" header="montant" sortable style={{ width: '35%' }} />
                        <Column field="date" header="date" sortable style={{ width: '35%' }} />
                        <Column
                            header="View"
                            style={{ width: '15%' }}
                            body={() => (
                                <>
                                    <Button icon="pi pi-search" type="button" text />
                                </>
                            )}
                        />
                    </DataTable>
                </div>
                </div>
                <div className="flex md:flex-1 flex-col gap-5 items-start justify-start w-[32%] md:w-full">
  <Text className="text-bluegray_900" as="h3" variant="h3">
    Scan your QR Code
  </Text>
  {/* Render the QR code */}
  <QRCode value={`NOM: ${utilisateurService.getNom()} Prenom: ${utilisateurService.getPrenom()}  Numero Compte:${compte?.numeroCompte}`} />
</div>
           </div>
           

          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
