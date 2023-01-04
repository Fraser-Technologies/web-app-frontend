import { Input } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";
import { useState } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { Button } from "../../Button";
import { cities } from "../adminData/busstops-test-data";

const BusStopManagement = () => {
  const [flip, setFlip] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);
  const handleOpenModal = (data: any, flipValue: any) => {
    setFlip(flipValue);
    setModalVisible(true);
    setModalData(data);
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

  //LEKAN HELP OUT HERE, I'M TRYING TO DO IT SUCH THAT WHEN A USER CLICKS THE CHECK MARK AT (SEARCH FOR CHECKPOINT 1), 
  //THE VALUE IS SAVED AND IT IS THE NEW PLACEHOLDER FOR THAT INPUT FIELD
  const [inputFields, setInputFields] = React.useState<string[]>([]);
  const [cityName, setCityName] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleAddInputField = () => {
    setInputFields((prevInputFields) => [...prevInputFields, ""]);
    setVisible(true);
    setIsEditing(true);
  };

  const handleSave = (index: number) => {
    setInputFields((prevInputFields) => {
      const newInputFields = [...prevInputFields];
      newInputFields[index] = cityName;
      return newInputFields;
    });
    setIsEditing(false);
  };

  const handleDelete = (index: number) => {
    setInputFields((prevInputFields) => {
      const newInputFields = [...prevInputFields];
      newInputFields.splice(index, 1);
      return newInputFields;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setInputFields((prevInputFields) => {
      const newInputFields = [...prevInputFields];
      newInputFields[index] = value;
      return newInputFields;
    });
  };

  return (
    <div>
      {/* BUSSTOPS HEADER */}
      <div className="border-b h-14 w-full my-2">
        <div className="flex justify-between">
          <h2 className="text-lg mt-2 font-medium">Busstops</h2>{" "}
        </div>
      </div>

      {/* BODY */}
      <div className="flex justify-between items-center w-full mb-4 pb-4 border-b">
        Cities
        {/* BUTTON TO CREATE A NEW CITY */}
        <Button
          title="+ Add new city"
          type="submit"
          className="px-4 py-2 text-xs rounded-md bg-primary-100"
          onClick={() => {
            //OPENS CREATE CITY
            handleOpenModal(null, "create");
          }}
        />
      </div>

      <div className="grid gap-4 grid-cols-2">
        {/* API CALL HERE RETURNS THE LIST OF CITIES AND THE NUMBER OF BUSSTOPS */}
        {Object.keys(cities).map((city) => (
          <div
            key={city}
            className="w-full h-56 bg-black text-white rounded-md flex flex-col items-center justify-center"
            onClick={() => {}} //OnClick Opens the city
          >
            <div className="text-xl">{city}</div>
            <div className="text-sm">{cities[city].length} Bus stops</div>
          </div>
        ))}
      </div>

      {flip === "create"
        ? modalVisible && (
            <Modal
              title={
                <div className="boder-b text-lg font-medium">Add City</div>
              }
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
            >
              <div className="mt-8">
                <div className="mb-1">
                  <label className="text-gray-500">City Name</label>
                </div>
                <Input
                  className="hover:border-green-500 focus:border-green-600 h-12 w-full"
                  placeholder="City name"
                  value={cityName}
                  required={true}
                  onChange={(e) => setCityName(e.target.value)}
                />
              </div>

              <div className="mt-4 w-full">
                {visible ? (
                  <div className="text-gray-500 w-full border-b mt-4 mb-2">
                    Stops
                  </div>
                ) : (
                  ""
                )}

                {/* //CHECKPOINT 1 */}
                {inputFields.map((field, index) =>
                  isEditing ? (
                    <div className="mt-2 relative flex items-center">
                      <Input
                        className="hover:border-green-500 focus:border-green-600 h-12 w-full"
                        // 
                        placeholder="City name"
                        value={field}
                        required
                        onChange={(e) => handleInputChange(e, index)}
                        autoFocus
                      />

                      {/* //CHECKPOINT 1 BUTTON */}
                      <button
                        className="absolute right-0 top-0 mr-4 mt-4"
                        onClick={() => {
                          handleSave(index);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div
                      // onClick={() => setIsEditing(true)}
                      className="mt-2 relative flex items-center"
                    >
                      <Input
                        className="hover:border-green-500 focus:border-green-600 h-12 w-full"
                        placeholder="City name"
                        value={field}
                        required
                        onChange={(e) => handleInputChange(e, index)}
                        disabled
                      />
                      <button
                        className="absolute right-0 top-0 text-gray-500 mr-12 mt-4"
                        onClick={() => setIsEditing(true)}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="absolute right-0 top-0 mr-4 text-gray-500 mt-4"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )
                )}
                <button
                  className={`w-full p-3 mt-4 mb-4 text-[#22B11E] font-medium rounded-lg hover:text-[#4DD34A]`}
                  onClick={handleAddInputField}
                >
                  + Add Stops
                </button>
              </div>

              <button
                className={`w-full p-3 mb-6 font-medium rounded-lg ${
                  true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
                } `}
                onClick={() => {
                  if (true) {
                    // setFlip("review");
                  }
                }}
              >
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
                Create City
              </button>
            </Modal>
          )
        : //  REVIEW MODAL SHOWS AFTER CREATING TRIP
        flip === "review"
        ? modalVisible && (
            <Modal
              title={
                <div className="boder-b text-lg font-medium">Trip Details</div>
              }
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
            >
              <Button
                title="Continue"
                type="submit"
                className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
                onClick={() => {
                  //API CALL FOR CREATING TRIP
                  //THEN SET FLIP IF SUCCESS. TO SUCCESS AS SHOWN BELOW
                  //   setFlip("success");
                }}
              />
              <Button
                title="Edit"
                type="submit"
                className="w-full mt-4 mb-6 px-4 py-3 text-xs rounded-md border text-gray-500 border-gray-500"
                onClick={() => {
                  //   setFlip("create");
                }}
              />
            </Modal>
          )
        : null}
    </div>
  );
};

export default BusStopManagement;
