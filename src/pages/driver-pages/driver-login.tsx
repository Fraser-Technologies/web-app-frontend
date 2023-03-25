import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../../state/action/user.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import LoadingWheel from "../../components/loading-svg";
import OtpInput from "react18-input-otp";
import { FraserButton } from "../../components/Button";
import { FaArrowRight, FaChair } from "react-icons/fa";

const DriverLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo, loading, error } = useAppSelector(
    (state: RootState) => state.userLogin
  ); 
  const [phone, setPhone] = useState<string>("");
  const [flip, setFlip] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pin, setPIN] = useState<any>("");
  const [value, setValue] = useState("");

  const handleInput = (text: any) => {
    setPIN(text);
  };

  const handleVerify = () => {};

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    // const formattedValue = inputValue.replace(regex, ",");
    // setValue(formattedValue);
  };
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  const handleModalOpen = (data: any, flip: any) => {
    setFlip(flip);
    setModalVisible(true);
  };

  const logInDriver = () => {
    dispatch(userLoginAction("+234" + phone));
  };

  useEffect(() => {
    if (userInfo?.user_type === "driver") {
      return navigate(_paths_.DRIVER_PORTAL);
    }
  }, [navigate, userInfo]);

  return (
    <div className="bg-black flex w-full items-center h-screen ">
      <div className="w-full z-20 mx-[24px] md:w-4/12 md:m-auto">
        {/* <div className="flex items-center md:m-auto mb-6">
          <img
            className="pr-[10px] md:ml-auto h-[18px] border-r border-black"
            src="/assets/images/fraser-black-logo.svg"
            alt=""
          />
          <span className="ml-[8px] md:ml-[10px] mr-auto">Driver Portal</span>
        </div> */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-white w-full rounded-md text-[14px] pb-8 ">
          <div className="border-b w-full pb-4 px-4 md:px-12 py-4 ">
            <h3 className="text-lg font-medium w-2/3 pt-4">
              Enter your mobile number to continue
            </h3>
          </div>
          {/* <p className="text-[#929292] mt-4">
						Unlock the earning potential of your vehicle and enjoy
						financial freedom with a steady stream of income!
					</p> */}
          <div className="mt-12 px-4 md:px-12">
            <div className="mb-2">
              <label className="text-gray-500">Mobile Number</label>
            </div>
            <Input
              className="w-full h-12 hover:border-green-500 focus:border-green-500 active:border-green-600"
              placeholder="903 123 1234"
              value={phone}
              prefix={"+234"}
              type="number"
              required={true}
              onChange={(e) => {
                setPhone(
                  e.target.value.startsWith("0")
                    ? e.target.value.slice(1)
                    : e.target.value
                );
              }}
            />
          </div>
          <div className="px-4 md:px-12">
            <FraserButton
              title={"Continue"}
              size={"regular"}
              loader={loading}
              className={"w-full mt-8 mb-4"}
              onClick={() => {
                logInDriver();
              }}
            />
            <FraserButton
              title={"I don't have an account"}
              size={"regular"}
              buttonType={"tertiary"}
              className={"w-full"}
              icon={<FaArrowRight />}
              iconposition={"right"}
              onClick={() => {
                navigate("/driversignup");
              }}
            />
          </div>
        </div>
      </div>

      {flip === "pin" && modalVisible && (
        <Modal
          title=""
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={"320px"}
        >
          <div className="text-lg text-center font-medium">
            <div className="pt-8 mb-3">You are about to withdraw</div>
            <div className="text-[24px] mb-8">₦ {Number(value)}</div>
          </div>
          <div className="mt-2 mb-1 text-center w-full justify-center flex">
            Input your PIN to continue
          </div>
          <OtpInput
            value={pin}
            onChange={handleInput}
            numInputs={4}
            isInputNum={true}
            shouldAutoFocus={true}
            onSubmit={handleVerify}
            className={"w-full"}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              borderRadius: "6px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
              outline: "#000",
              justify: "space-between",
            }}
            containerStyle={{
              width: "100%",
              display: "flex",
              // justifyContent: "space-between",
            }}
          />
          <FraserButton
            title={"Request Payout"}
            // loader={loadingWithdraw}
            size={"regular"}
            className={"w-full mt-8"}
            onClick={() => {}}
          />
        </Modal>
      )}
    </div>
  );
};

export default DriverLogin;
