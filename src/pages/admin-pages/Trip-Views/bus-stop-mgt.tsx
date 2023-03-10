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
import { FraserButton } from "../../../components/Button";
import LoadingWheel from "../../../components/loading-svg";

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
        <FraserButton
          title="+ Add new city"
          type="submit"
          size="regular"
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
                <LoadingWheel param={loading} />
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

          <FraserButton
            title="Delete"
            type="submit"
            size="regular"
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
          <FraserButton
            title="Cancel"
            type="submit"
            size="regular"
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

          <FraserButton
            title="Close"
            type="submit"
            size="regular"
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

          <FraserButton
            title="Okay"
            type="submit"
            size="regular"
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
