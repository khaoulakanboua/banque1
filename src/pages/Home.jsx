import React, { useEffect, useState } from "react";
import { Button, Img, Input, Line, List, Text } from "../components";
import { Clientervice } from "../service/client.service";
import { Compteservice } from "../service/compte.service";


const Home = () => {
  const [client, setClient] = useState(null)
  const [compte, setCompte] = useState(null)
  const [id, setId] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await Clientervice.getByCin("EE43");
        setClient(clientResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setId(client?.id)
        console.log(id)
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (client) {
      setId(client.id);
    }
  }, [client]);

  useEffect(() => {
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
  
    fetchDataCompte();
  }, [id]);





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
                      My Card
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
                        Deposit from my Card
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
              <div className="flex md:flex-1 flex-col gap-[18px] items-start justify-start w-[66%] md:w-full">
                <Text className="text-bluegray_900" as="h3" variant="h3">
                  Weekly Activity
                </Text>
                <div className="bg-white_A700 flex flex-col gap-[22px] items-end justify-start p-7 sm:px-5 rounded-[25px] w-full">
                  <div className="flex flex-row gap-[30px] items-center justify-end w-[30%] md:w-full">
                    <div className="flex flex-row gap-2.5 items-start justify-start w-[38%]">
                      <div className="bg-indigo_200 h-[15px] rounded-[50%] w-[15px]"></div>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        Diposit
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2.5 items-start justify-start w-[47%]">
                      <div className="bg-indigo_600 h-[15px] rounded-[50%] w-[15px]"></div>
                      <Text
                        className="font-normal text-bluegray_400"
                        variant="body2"
                      >
                        Withdraw
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start mr-0.5 w-[99%] md:w-full">
                    <div className="flex flex-col gap-[9px] justify-start w-full">
                      <div className="flex md:flex-col flex-row gap-2.5 items-center justify-between w-full">
                        <div className="flex flex-col gap-[21px] items-start justify-start">
                          <Text
                            className="font-normal text-bluegray_400"
                            variant="body4"
                          >
                            500
                          </Text>
                          <Text
                            className="font-normal text-bluegray_400"
                            variant="body4"
                          >
                            400
                          </Text>
                          <Text
                            className="font-normal text-bluegray_400"
                            variant="body4"
                          >
                            300
                          </Text>
                          <Text
                            className="font-normal text-bluegray_400"
                            variant="body4"
                          >
                            200
                          </Text>
                          <Text
                            className="font-normal text-bluegray_400"
                            variant="body4"
                          >
                            100
                          </Text>
                          <Text
                            className="font-normal ml-3.5 md:ml-[0] text-bluegray_400"
                            variant="body4"
                          >
                            0
                          </Text>
                        </div>
                        <Img
                          src="images/img_group899.svg"
                          className="h-[186px]"
                          alt="Group899"
                        />
                      </div>
                      <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-end md:ml-[0] ml-[72px] w-[84%] md:w-full">
                        <Text
                          className="font-normal text-bluegray_400"
                          variant="body4"
                        >
                          Sat
                        </Text>
                        <Text
                          className="font-normal sm:ml-[0] ml-[67px] text-bluegray_400"
                          variant="body4"
                        >
                          Sun
                        </Text>
                        <Text
                          className="font-normal sm:ml-[0] ml-[65px] text-bluegray_400"
                          variant="body4"
                        >
                          Mon
                        </Text>
                        <Text
                          className="font-normal sm:ml-[0] ml-[65px] text-bluegray_400"
                          variant="body4"
                        >
                          Tue
                        </Text>
                        <Text
                          className="font-normal ml-16 sm:ml-[0] text-bluegray_400"
                          variant="body4"
                        >
                          Wed
                        </Text>
                        <Text
                          className="font-normal ml-16 sm:ml-[0] text-bluegray_400"
                          variant="body4"
                        >
                          Thu
                        </Text>
                        <Text
                          className="font-normal h-4 sm:ml-[0] ml-[70px] text-bluegray_400"
                          variant="body4"
                        >
                          Fri
                        </Text>
                      </div>
                    </div>
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
