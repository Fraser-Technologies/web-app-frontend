import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../../state/action/user.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import LoadingWheel from "../../components/loading-svg";

const DriverLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { userInfo, loading, error } = useAppSelector(
		(state: RootState) => state.userLogin
	);
	const [phone, setPhone] = useState<string>("");

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

				<div className="bg-white w-full rounded-md text-[14px] pb-12 ">
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
            <button
              className={` w-full p-3 mt-6 font-medium rounded-md ${
                true
                  ? "bg-primary-100 text-black hover:bg-[#58FF9E]"
                  : "bg-[#f5f5f5]"
                // loginValid ? "bg-[#000000] text-white hover:bg-[#353535]" : "bg-[#f5f5f5]"
              } `}
              onClick={() =>
                // loginValid &&
                logInDriver()
              }
            >
              <LoadingWheel param={loading}/>
              Continue
            </button>

						<button
							className=" flex items-center justify-center w-full cursor-pointer mt-6 text-[#22B11E]  hover:text-[#179713]"
							onClick={() => {
								navigate("/driversignup");
							}}>
							I don't have an account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DriverLogin;
