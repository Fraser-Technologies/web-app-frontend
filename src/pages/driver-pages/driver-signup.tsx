/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import { Input } from "antd";
import { FaArrowRight, FaCaretDown, FaChevronLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import {
  registerAsADriverAction,
  updateUserAction,
} from "../../state/action/user.action";
import { api } from "../../utils/api";
import { deleteFileAction } from "../../state/action/image.action";
import { MdCancel } from "react-icons/md";
import { RequestError } from "../../utils/requestError";
import {
  createBusAction,
  updateBusAction,
} from "../../state/action/bus.action";
import { addAccountAction } from "../../state/action/balance.action";
import { availableCities } from "../../utils/availableCitiesData";
import { banks } from "../../utils/banksData";
import { busTypes } from "../../utils/busTypesData";
import LoadingWheel from "../../components/loading-svg";
import { FraserButton } from "../../components/Button";

const DriverSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const { userInfo: newDriver } = useAppSelector(
  //     (state: RootState) => state.registerAsDriver
  //   );
  const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
  const { bus, error: createBusError } = useAppSelector(
    (state: RootState) => state.createBus
  );

  const { loading, error, image } = useAppSelector(
    (state: RootState) => state.uploadFile
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [locationName, setlocationName] = useState("");
  const [location, setlocation] = useState(false);
  const [make, setMake] = useState("");
  const [modelList, setModelList] = useState<string[]>([]);
  const [makeOpen, setMakeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [accountNo, setAccountNo] = useState("");
  const [bankFilter, setBankFilter] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [uploadProfilePicError, setUploadProfilePicError] =
    useState<string>("");

  const profilePicRef = useRef<HTMLInputElement>(null);
  const vehicleInsuranceRef = useRef<HTMLInputElement>(null);
  const roadWorthinessRef = useRef<HTMLInputElement>(null);
  const driverLicenseRef = useRef<HTMLInputElement>(null);

  const [driverLicense, setDriverLicense] = useState<string>("");
  const [proofOfInsurance, setProofOfInsurance] = useState<string>("");
  const [roadWorthiness, setRoadWorthiness] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadingProfile, setUploadingProfile] = useState<boolean>(false);
  const [driverLicenseImageLoading, setDriverLicenseImageLoading] =
    useState<boolean>(false);
  const [vehicleInsuranceImageLoading, setVehicleInsuranceImageLoading] =
    useState<boolean>(false);
  const [roadWorthinessLoading, setRoadWorthinessLoading] =
    useState<boolean>(false);

  const pages = [1, 2, 3, 4];

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const uploadProfilePics = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadProfilePicError("");
    const fileObj: any = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    let formData = new FormData();
    formData.append("image", fileObj);
    setUploadingProfile(true);
    await api
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }: any) => {
        console.log("the res ", data);
        setProfile(data?.image);
        setUploadingProfile(false);
      })
      .catch((error) => {
        setUploadProfilePicError(RequestError(error));
        setProfile("");
        setUploadingProfile(false);
      });
  };

  const uploadDriverLicense = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj: any = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    let formData = new FormData();
    formData.append("image", fileObj);

    setDriverLicenseImageLoading(true);
    await api
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async ({ data }: any) => {
        setDriverLicense(data?.image);
        dispatch(
          updateUserAction(userInfo?._id, { driver_license: data?.image })
        );
      })
      .catch((error) => {});

    setDriverLicenseImageLoading(false);
  };

  const uploadRoadWorthiness = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj: any = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    let formData = new FormData();
    formData.append("image", fileObj);
    setRoadWorthinessLoading(true);
    await api
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async ({ data }: any) => {
        setRoadWorthiness(data?.image);
        dispatch(
          updateBusAction(bus?._id, {
            road_worthiness_cert: data?.image,
          })
        );
      })
      .catch((error) => {});

    setRoadWorthinessLoading(false);
  };

  const uploadVehicleInsurance = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj: any = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    let formData = new FormData();
    formData.append("image", fileObj);
    setVehicleInsuranceImageLoading(true);

    await api
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async ({ data }: any) => {
        setProofOfInsurance(data?.image);
        dispatch(
          updateBusAction(bus?._id, {
            bus_insurance: data?.image,
          })
        );
      });

    setVehicleInsuranceImageLoading(false);
  };

  const DriverData = {
    first_name: fName,
    last_name: lName,
    email: email,
    driver_license_number: licenseNumber,
    location: locationName,
    image: profile,
    phone: "+234" + phone,
  };

  const DriverAccount = {
    bank_name: bankFilter,
    account_number: accountNo,
    account_name: accountName,
  };

  const DriverBus = {
    make,
    model,
    driver: userInfo?._id,
    capacity: vehicleCapacity,
    registration_number: registrationNumber,
  };

  const goToNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNext = () => {
    setUploadProfilePicError("");

    if (currentPage === 1) {
      if (
        !fName ||
        !lName ||
        !email ||
        !licenseNumber ||
        !locationName ||
        !profile ||
        !phone
      ) {
        setShowError(true);
        setErrorMessage("All fields are required");
        return;
      }
      setShowError(false);
      goToNextPage();
    }

    if (currentPage === 2) {
      if (!make || !model || !vehicleCapacity || !registrationNumber) {
        setShowError(true);
        setErrorMessage("All fields are required");
        return;
      }
      setShowError(false);
      goToNextPage();
    }

    if (currentPage === 3) {
      if (!driverLicense || !roadWorthiness || !roadWorthiness) {
        setShowError(true);
        setErrorMessage("Upload all relevant documents");
        return;
      }
      setShowError(false);
      goToNextPage();
    }
  };

  const [submitLoading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!bankFilter || !accountName || !accountNo) {
        setShowError(true);
        setErrorMessage("Please add your payment information.");
        return;
      }
      await dispatch(registerAsADriverAction(DriverData));
      await dispatch(createBusAction(DriverBus));
      await dispatch(addAccountAction(userInfo?.user_token, DriverAccount));

      setCurrentPage(5);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="bg-black flex flex-col items-center w-full h-screen">
      <div className="flex items-center w-full mt-6">
        <div className="flex m-auto mb-6">
          <div className="py-1 border-r border-[#000000]">
            <img
              className="pr-[10px] h-[18px]"
              src="/assets/images/fraser-black-logo.svg"
              alt=""
            />
          </div>
          <span className="ml-[10px]">Driver Portal</span>
        </div>
      </div>

      <div className="bg-white overflow-y-scroll fixed bottom-8 h-[85vh] w-5/6 md:w-1/3 mx-auto rounded-md">
        <div
          className={`py-4 rounded-t-md fixed md:w-1/3 px-4 md:px-8 z-20 w-5/6 bg-white border-b border-[#EFF3EF] ${
            currentPage === 5 && "hidden"
          }`}
        >
          <div className="flex items-center justify-between w-2/6">
            {pages.map((e) => (
              <React.Fragment key={e}>
                <div
                  className={`h-3 w-3 rounded-md ${
                    currentPage >= e
                      ? "bg-[#000000] text-white"
                      : "bg-[#EFF3EF]"
                  }`}
                />
                {e !== pages[pages.length - 1] && (
                  <div
                    className={`border-b h-0.5 w-6 ${
                      currentPage >= e + 1
                        ? "bg-[#000000] text-white"
                        : "bg-gray-100"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div>
            <h3 className="mt-6 text-xl font-medium">
              {currentPage === 1 && "Personal Information"}
              {currentPage === 2 && "Vehicle Information"}
              {currentPage === 3 && "Document Upload"}
              {currentPage === 4 && "Payment Information"}
            </h3>
            {/* <p className=" text-[#929292] text-sm mt-1 w-11/12">
              {currentPage === 1 &&
                "Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
              {currentPage === 2 &&
                "Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
              {currentPage === 3 &&
                "Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
              {currentPage === 4 &&
                "Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
            </p> */}
          </div>
        </div>

        {/* PAGES */}
        <div className="">
          {/*  */}
          {/* PAGE 1 */}
          {currentPage === 1 && (
            <div className="px-4 md:px-8 py-8 mt-24 mb-32">
              {showError && currentPage === 1 && (
                <p className="text-red-600 mb-8">{errorMessage}</p>
              )}
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    First Name
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="First Name"
                  value={fName}
                  required={true}
                  size="small"
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Last Name
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Last Name"
                  value={lName}
                  required={true}
                  size="small"
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">Phone</label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Phone Number"
                  value={phone}
                  required={true}
                  size="small"
                  type="number"
                  prefix={"+234"}
                  onChange={(e) => {
                    setPhone(
                      e.target.value.startsWith("0")
                        ? e.target.value.slice(1)
                        : e.target.value
                    );
                  }}
                />
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Driver’s License Number
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="License Number"
                  value={licenseNumber}
                  required={true}
                  size="small"
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-4 text-left duration-300 ease-in-out">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Primary Location
                  </label>
                </div>
                <button
                  type="button"
                  className="inline-flex h-12 text-[14px] items-center w-full px-2 py-2 mb-2  leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => {
                    setlocation(!location);
                  }}
                >
                  {locationName}
                  <FaCaretDown className="ml-auto" />
                </button>
                {location && (
                  <div className="absolute z-10 w-full py-4 text-[14px] mt-2 bg-white rounded-md shadow-xs shadow-lg scroll-auto">
                    {availableCities.map((e) => {
                      return (
                        <a
                          href="#"
                          className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setlocationName(e.state);
                            setlocation(false);
                          }}
                        >
                          {e.state}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col pb-4 mb-4 border-b ">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Profile Image
                  </label>
                </div>

                <input
                  type="file"
                  accept="image/**"
                  ref={profilePicRef}
                  onChange={uploadProfilePics}
                />
              </div>
              {/* {uploadingProfile && (
                <p className="text-blue-500">Uploading Please wait...</p>
              )} */}
              {profile && (
                <div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px]">
                  <img alt="" src={profile} className="w-[30px] h-[30px]" />
                  <span
                    className="p-2 bg-red-400 rounded-lg"
                    onClick={() => {
                      dispatch(deleteFileAction(profile));
                      setProfile("");
                    }}
                  >
                    <MdCancel size="20" />
                  </span>
                </div>
              )}
              {error && (
                <p className="text-red-500"> {uploadProfilePicError}</p>
              )}
            </div>
          )}

          {/* PAGE 2 */}
          {currentPage === 2 && (
            <div className="px-4 md:px-8 py-8 mt-24 mb-40 text-[14px]">
              {/* {(showError || errorMessage) && currentPage === 2 && (
                <p className="text-red-600">{errorMessage || createBusError}</p>
              )} */}

              <div className="relative w-full mb-4 text-left duration-300 ease-in-out">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">Bus Make</label>
                </div>
                <button
                  type="button"
                  className="inline-flex h-12 items-center w-full px-2 py-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-[6px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => {
                    setMakeOpen(!makeOpen);
                  }}
                >
                  {make}
                  <FaCaretDown className="ml-auto" />
                </button>
                {makeOpen && (
                  <div className="absolute z-20 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                    {busTypes.map((e) => {
                      return (
                        <a
                          href="#"
                          className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setMake(e.make);
                            setModelList(e.models);
                            setMakeOpen(false);
                          }}
                        >
                          {e.make}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <div
                className={`relative w-full text-left duration-300 ease-in-out z-10 mb-4 ${
                  modelList.length === 0 && "hidden"
                }`}
              >
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Bus Model
                  </label>
                </div>
                <button
                  type="button"
                  className="inline-flex h-12 items-center w-full px-2 py-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-[6px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => {
                    setModelOpen(!modelOpen);
                  }}
                >
                  {model}
                  <FaCaretDown className="ml-auto" />
                </button>
                {modelOpen && (
                  <div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                    {modelList.map((e) => {
                      return (
                        <a
                          href="#"
                          className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setModel(e);
                            setModelOpen(false);
                          }}
                        >
                          {e}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Vehicle Capacity
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Vehicle Capacity"
                  type="number"
                  value={vehicleCapacity}
                  required={true}
                  size="small"
                  onChange={(e) => setVehicleCapacity(Number(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Vehicle Registration Number
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="AA 1234 KJA"
                  value={registrationNumber}
                  required={true}
                  size="small"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* PAGE 3 */}
          {currentPage === 3 && (
            <div className="flex flex-col px-4 text-[14px] md:text-base md:px-8 py-8 mt-24 mb-32">
              <div className="flex flex-col pb-4 mb-4 border-b ">
                {/* {showError && currentPage === 3 && (
                  <p className="text-red-600">{errorMessage}</p>
                )} */}
                <p className="mb-3 text-[#22B11E]">
                  Driver’s License (as image)
                </p>

                <input
                  type="file"
                  accept="image/**"
                  ref={driverLicenseRef}
                  onChange={uploadDriverLicense}
                />
                {driverLicenseImageLoading && (
                  <p className="text-blue-500 mt-[3px]">
                    uploading driver license ...
                  </p>
                )}

                {driverLicense && (
                  <div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px] mt-[3px]">
                    <img
                      alt=""
                      src={driverLicense}
                      className="w-[30px] h-[30px]"
                    />
                    <span
                      className="p-2 bg-red-400 rounded-lg"
                      onClick={() => {
                        dispatch(deleteFileAction(driverLicense));
                        setDriverLicense("");
                      }}
                    >
                      <MdCancel size="20" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col pb-4 mb-4 border-b ">
                <p className="mb-3 text-[#22B11E]">
                  Proof of Vehicle Insurance (as image)
                </p>

                <input
                  type="file"
                  accept="image/**"
                  ref={vehicleInsuranceRef}
                  onChange={uploadVehicleInsurance}
                />

                {vehicleInsuranceImageLoading && (
                  <p className="text-blue-500 mt-[3px]">
                    uploading vehicle insurance ...
                  </p>
                )}

                {proofOfInsurance && (
                  <div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px] mt-[3px]">
                    <img
                      alt=""
                      src={proofOfInsurance}
                      className="w-[30px] h-[30px]"
                    />
                    <span
                      className="p-2 bg-red-400 rounded-lg"
                      onClick={() => {
                        dispatch(deleteFileAction(proofOfInsurance));
                        setProofOfInsurance("");
                      }}
                    >
                      <MdCancel size="20" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col pb-4 mb-4 border-b mb-24">
                <p className="mb-3 text-[#22B11E]">
                  Road Worthiness Certificate
                </p>

                <input
                  type="file"
                  accept="image/**"
                  ref={roadWorthinessRef}
                  onChange={uploadRoadWorthiness}
                />

                {roadWorthinessLoading && (
                  <p className="text-blue-500 mt-[3px]">
                    uploading road worthiness cert ...
                  </p>
                )}

                {roadWorthiness && (
                  <div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px]">
                    <img
                      alt=""
                      src={roadWorthiness}
                      className="w-[30px] h-[30px]"
                    />
                    <span
                      className="p-2 bg-red-400 rounded-lg"
                      onClick={() => {
                        dispatch(deleteFileAction(roadWorthiness));
                        setRoadWorthiness("");
                      }}
                    >
                      <MdCancel size="20" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentPage === 4 && (
            // banks
            <div className="px-4 md:px-8 py-8 mt-24 mb-40 text-[14px]">
              <div className="relative w-full mb-4 text-left duration-300 ease-in-out">
                {/* {showError && currentPage === 4 && (
                  <p className="text-red-600">{errorMessage}</p>
                )} */}
                <div className="mb-4">
                  <div className="mb-2">
                    <label className="text-[#929292] text-[14px]">
                      Account Name
                    </label>
                  </div>
                  <Input
                    className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                    placeholder="Account Name"
                    type="text"
                    value={accountName}
                    required={true}
                    size="small"
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">Bank</label>
                </div>
                <input
                  type="text"
                  className="inline-flex h-12 items-center w-full px-2 py-2 mb-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  placeholder="Bank Name"
                  onClick={() => {
                    setBankOpen(!bankOpen);
                  }}
                  onChange={(e) => {
                    setBankFilter(e.target.value);
                  }}
                  value={bankFilter}
                />
                {bankOpen && (
                  <div className="absolute w-full z-10 mt-2 bg-white h-[240px] overflow-scroll rounded-md shadow-xs shadow-lg">
                    {banks
                      .filter((e) =>
                        e.toLowerCase().includes(bankFilter.toLowerCase())
                      )
                      .map((e) => {
                        return (
                          <a
                            href="#"
                            className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              setBankFilter(e);
                              setBankOpen(false);
                            }}
                          >
                            {e}
                          </a>
                        );
                      })}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-[#929292] text-[14px]">
                    Account Number
                  </label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="0123456789"
                  value={accountNo}
                  required={true}
                  size="small"
                  onChange={(e) => setAccountNo(e.target.value)}
                />
              </div>
            </div>
          )}
          {currentPage === 5 && (
            <div className="h-[70vh] items-center flex flex-col px-6 md:px-8">
              <img
                src="/assets/images/success.gif"
                width="120px"
                alt=""
                className="mt-auto mb-6"
              />
              <div className="w-5/6 md:w-2/3 mb-8 md:mb-24 text-center ">
                We have received your submission, our team will review shortly
                and get back to you.
              </div>

              <button
                className={`items-center justify-center w-full p-3 font-medium rounded-md border border-[#000000] hover:border-[#929292]`}
                onClick={() => {
                  navigate(_paths_.DRIVER_PORTAL);
                }}
              >
                {/* <LoadingWheel param={.}/> */}
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* BUTTONS */}

        <div
          className={`fixed bottom-8 bg-white border-t border-[#EFF3EF] rounded-b-md w-5/6 md:w-1/3 pb-6 ${
            currentPage === 5 && "hidden"
          }`}
        >
          <div className="flex items-center m-auto mx-4 md:mx-8 mt-6 mb-3">
            <FraserButton
              title={"Previous"}
              buttonType={"secondary"}
              secondaryColor={"black"}
              size={"regular"}
              onClick={() => handleBack()}
              className={`w-1/2 mr-2 ${currentPage === 1 && "hidden"}`}
            />

            <FraserButton
              title={currentPage === pages.length ? "Submit" : "Next"}
              size={"regular"}
              loader={submitLoading}
              className={"w-full"}
              onClick={() => {
                currentPage === pages.length ? handleSubmit() : handleNext();
              }}
            />
          </div>

          <FraserButton
            title={"I already have an account"}
            size={"regular"}
            buttonType={"tertiary"}
            icon={<FaArrowRight />}
            iconposition={"right"}
            onClick={() => {
              navigate("/driverlogin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverSignUp;
