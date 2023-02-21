import { CircularProgress } from "@mui/material";
import { Alert, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { City_interface } from "../../../interfaces/city_interface";
import {
  addBusStopToCityAction,
  removeBusStopToCityAction,
} from "../../../state/action/busStop.action";
import {
  createCityAction,
  getAllCityAction,
} from "../../../state/action/city.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Button } from "../../../components/Button";

const BusStopManagement = () => {
  const [flip, setFlip] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: any) => state?.createCity);
  const { loading: createBusStopLoading, city: addBusStopToCity } =
    useAppSelector((state: any) => state?.addBusStop);
  const { city } = useAppSelector((state: any) => state?.createCity);

  type deleteBusStopType = {
    id: string;
    busstop: string;
  };
  const { cities } = useAppSelector((state: any) => state?.allCity);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cityName, setCityName] = React.useState("");
  const [cityModalData, setCityModalData] = useState<City_interface>();
  const [busStop, setBusStop] = useState<string>("");
  const [deleteBusStop, setDeleteBusStop] = useState<deleteBusStopType>();

  const handleOpenModal = (data: City_interface, flipValue: any) => {
    setFlip(flipValue);
    setCityModalData(data);
    setModalVisible(true);
  };
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    if (flip !== "delete") {
      setModalVisible(false);
      setFlip("");
    }

    if (flip === "delete") {
      setModalVisible(false);
      setFlip("info");
    }
  };

  const patterns = [
    "bg-blue-900",
    "bg-red-900",
    "bg-yellow-900",
    "bg-green-900",
    "bg-purple-900",
  ];
  const pattern = (): string => {
    return patterns[Math.floor(Math.random() * patterns.length)];
  }; // generate a random pattern

  const createCity = () => {
    dispatch(
      createCityAction({
        city: cityName,
      })
    );

    setFlip("city");
    setFlip("success");
    setCityName("");
  };

  useEffect(() => {
    if (city?._id || addBusStopToCity?._id) {
      dispatch(getAllCityAction());
    }
  }, [addBusStopToCity, city, dispatch]);

  return (
    <div className="pt-12 px-4 pb-12">
      <h2 className="mb-4 pl-4 bg-white fixed border-b top-24 py-8 w-full text-xl font-medium">
          Bus Stops{" "}
        </h2>
        <div className="flex place-content-end my-2  mt-24 w-full  bg-white">
          {/* <h2 className=" text-xs font-medium">Trips</h2> */}
          {/* {loading && <Spinner />} */}
          <Button
            title="+ Add new city"
            type="submit"
            className="px-4 py-2 mb-4 rounded-md bg-primary-100"
            onClick={() => {
              setModalVisible(true);
              setFlip("create");
            }}
          />
        </div>
      {/* BODY */}
     

      <div className="grid gap-4 grid-cols-2">
        {cities?.map((city: City_interface) => {
          return (
            <div
              key={city?._id}
              className={`w-full h-24 ${pattern()} text-white rounded-md flex flex-col items-center justify-center`}
              onClick={() => {
                handleOpenModal(city, "city");
                setCityModalData(city);
              }}
            >
              <div className="text-xs">{city?.city}</div>
              <div className="">{city?.bus_stops?.length}</div>
            </div>
          );
        })}
      </div>

      {/* ADD CITY SESSION */}
      {flip === "create" && modalVisible && (
        <Modal
          title={<div className="boder-b text-lg font-medium">Add City</div>}
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
        >
          <div className="mt-8">
            <div className="mb-2">
              <label className="text-gray-500  ml-2">City Name</label>
            </div>
            <Input
              className="hover:border-green-500 focus:border-green-600 h-10 w-full"
              placeholder="City name"
              value={cityName}
              required={true}
              onChange={(e) => {
                setCityName(e.target.value);
              }}
            />
          </div>
          <br />

          <button
            className={`w-full p-3 mb-2  rounded-lg ${
              true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
            } `}
            onClick={createCity}
          >
            {loading && (
              <span className="mr-2">
                <svg
                  className={`${
                    false ? "animate-spin" : "hidden"
                  } inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="white"
                    stroke="white"
                    stroke-width="5"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="green"
                    stroke="green"
                    stroke-width="5"
                  />
                </svg>
              </span>
            )}
            Create City
          </button>
        </Modal>
      )}

      {/* CITY SESSION */}
      {
        //  CITY MODAL SHOWS ON CLICK OF CITY CARD
        flip === "city" && modalVisible && (
          <Modal
            title={
              <div>
                <div className="text-lg font-medium">
                  {cityModalData?.city}{" "}
                </div>
                <div className=" mt-1 font-normal text-[#949292]">
                  Number of Bus stops {cityModalData?.bus_stops?.length}
                </div>
              </div>
            }
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
          >
            <div className="my-2 mt-4">
              {cityModalData?.bus_stops?.map((busstop: string) => {
                return (
                  <div
                    key={busstop}
                    className="flex py-2 border-b place-items-center justify-between w-full"
                  >
                    {busstop}
                    <button
                      className={`p-2  font-medium rounded-lg `}
                      onClick={() => {
                        setDeleteBusStop({
                          id: cityModalData?._id,
                          busstop: busstop,
                        });
                        setFlip("delete");
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className={`w-full mt-4 p-3  rounded-md bg-primary-100 ${
                true ? " hover:text-[#1D7225]" : "bg-[#f5f5f5]"
              } `}
              onClick={() => {
                setFlip("createBusStop");
              }}
            >
              Add new stop
            </button>
            <button
              className={`w-full mt-2 p-3  rounded-lg text-[#E71D36] ${
                true ? " hover:text-[#C81027]" : "bg-[#f5f5f5]"
              } `}
              onClick={() => {
                // setFlip("createBusStop");
                //LEKAN WE'LL NEED TO FIX THIS
              }}
            >
              Delete City
            </button>
          </Modal>
        )
      }

      {/* DELETE SESSION */}
      {flip === "delete" && modalVisible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={240}
        >
          <div className="w-full place-items-center text-center">
            <FaExclamationCircle
              size={32}
              className="text-[#E71D36] w-full mt-8"
            />
            <div className="boder-b mt-4 text-base font-medium">
              Delete busstop?
            </div>
          </div>

          <Button
            title="Delete"
            type="submit"
            className="w-full py-2 mt-8  rounded-md bg-[#E71D36] text-white"
            onClick={() => {
              dispatch(
                removeBusStopToCityAction(
                  deleteBusStop?.id || "",
                  deleteBusStop?.busstop || ""
                )
              );
              setModalVisible(false);
            }}
          />
          <Button
            title="Cancel"
            type="submit"
            className="w-full py-2 mt-4 mb-4  rounded-md border text-gray-600 border-gray-500"
            onClick={() => {
              setFlip("info");
            }}
          />
        </Modal>
      )}

      {flip === "success" && modalVisible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={240}
        >
          <div className="w-full place-items-center text-center">
            <FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
            <div className="boder-b mt-4 text-base font-medium">
              City created successfully
            </div>
          </div>

          <Button
            title="Close"
            type="submit"
            className="w-full py-2 mt-8 mb-4  rounded-md bg-[#00FF6A] text-black"
            onClick={() => {
              setModalVisible(false);
            }}
          />
        </Modal>
      )}

      {/* CREATE BUS STOP */}
      {flip === "createBusStop" && modalVisible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
        //   width={240}
        >
          <div className="w-full">
            <div className="boder-b mt-4 w-full text-lg font-medium">
              Add New Bus Stop to {cityModalData?.city}{" "}
              {createBusStopLoading && <CircularProgress />}
            </div>
          </div>

          {error && <Alert type="error" message={error} />}

          <div className="mb-4 mt-8 w-full">
            <div className="mb-1">
              <label className="text-gray-500">Bus Stop Name</label>
            </div>
            <Input
              className="hover:border-green-500 active:border-green-600 focus:border-green-600 h-12 w-full"
              placeholder="Bus Stop Name"
              value={busStop}
              required={true}
              onChange={(e) => {
                setBusStop(e.target.value);
              }}
            />
          </div>

          <Button
            title="Okay"
            type="submit"
            className="w-full py-4 mt-4 mb-4  rounded-md bg-[#00FF6A] text-black"
            onClick={() => {
              if (busStop) {
                dispatch(
                  addBusStopToCityAction(cityModalData?._id || "", busStop)
                );
                setFlip("city");
                setCityName("");
                setBusStop("");
              }
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default BusStopManagement;
