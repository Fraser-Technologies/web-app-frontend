import React, { useState } from "react";
import "./../styles/Waitlist.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import { db } from "../Firebase";
import "firebase/compat/firestore";
import { Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { _paths_ } from "../utils/routes";


const Waitlist = () => {
  const [modal, openModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginValid =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    email.match(emailRegex);

  //   const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleOk = () => {
    openModal(false);
  };

  const handleCancel = () => {
    openModal(false);
  };

  const usersCollectionRef = collection(db, "users");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (firstName.length !== 0 && lastName.length !== 0 && email.length !== 0) {
      //   alert("firebase runs");
      setLoading(true);
      await addDoc(usersCollectionRef, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        CreatedAt: serverTimestamp(),
      })
        .then(() => {
          setLoading(false);
          alert(
            "Thank you for joining our waitlist. We will keep you updated once we launch. Welcome to the good side."
          );
        })
        .catch((error: any) => {
          alert(error.message);
        });

      setEmail("");
      setFirstName("");
      setLastName("");
      openModal(false);
    } else alert("Empty Fields");
  };

  return (
    // <Layout title="Waitlist">
    <div className="w-full bg-black text-white">
      <div className="w-full h-[100vh] overflow-y-scroll md:overflow-hidden">
        <div className="text-center">
          <h1 className="mt-8 text-[32px]">Fraser</h1>

          <div className="px-4 mt-12 md:mt-40 lg:mt-28 mb-6 text-[64px] md:text-[80px] lg:text-[120px] font-medium md:font-semibold leading-none md:leading-12 md:tracking-tight">
            <div className="text-primary-100">Move freely</div>
            <div className="w-full">between cities</div>
          </div>
          <p className="px-4 w-full md:w-4/6 lg:w-1/3 md:mx-auto mb-8 md:mb-16 lg:mb-8 text-gray-300 md:text-[22px]">
            Travel comfortably, conveniently and affordably between cities with Fraser.
          </p>
          

          <div className="mx-8 md:w-1/2 lg:w-1/4 md:mx-auto">
            <button
              className="py-6 lg:py-8 lg:px-16 w-full rounded-xl text-[18px] bg-[#00ff6a] hover:bg-[#0be466] text-black mb-4 lg:mb-6"
              onClick={() => {
                openModal(true);
              }}
            >
              Join Waitlist
            </button>
            <button
              className="py-6 md:py-8 md:px-16 w-full rounded-xl text-[18px] border border-[#ffffff] hover:border-[#e3e3e3] hover:text-[#e3e3e3] text-white"
              onClick={() => {
                navigate(_paths_.BOOKRIDE);
              }}
            >
              Get Early Access 👀
            </button>
          </div>

          <div className="h-[30vh] md:h-[50vh] mt-0 md:mt-12 lg:mt-0 lg:h-full overflow-hidden">
          <div className="image-container ">
            <div className="image-bg-left">
              <div className="image-bg">
                <img className="homepage" src="/Homepage.png" alt="" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {modal && (
        <Modal
          title={
            <p className="text-[16px] text-[#929292] mt-4 w-11/12">
              Fraser goes the extra mile to ensure your convenience and safety
              without breaking the bank.😊
              <br />
              <br />
              P.S. Get free trips when you join our waitlist
            </p>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={modal}
          centered={true}
          footer={false}
          closable={true}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-field mb-6 mt-8">
              <label className="form-label" htmlFor="name">
                First name
              </label>

              <Input
                className="w-full h-12 mt-2 hover:border-green-500 focus:border-green-500 active:border-green-600"
                placeholder="First Name"
                value={firstName}
                type="text"
                required={true}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-field mb-6">
              <label className="form-label" htmlFor="name">
                Last name
              </label>

              <Input
                className="w-full h-12 mt-2 hover:border-green-500 focus:border-green-500 active:border-green-600"
                placeholder="Last Name"
                value={lastName}
                type="text"
                required={true}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-field mb-6">
              <label className="form-label" htmlFor="email">
                Email
              </label>

              <Input
                className="w-full h-12 mt-2 hover:border-green-500 focus:border-green-500 active:border-green-600"
                placeholder="Email Address"
                value={email}
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className={`w-full p-3 mt-6 text-medium rounded-lg mb-8 ${
                loginValid ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
              } `}
              type="submit"
              onClick={loginValid ? handleSubmit : () => {}}
            >
              {loading ? (
                <BeatLoader color={"#000000"} loading={loading} size={15} />
              ) : (
                "Join Waitlist"
              )}
            </button>
          </form>
        </Modal>
      )}
      <div className="Patterns-dots Landing-dots Patterns_animatedIn__2wrQM">
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
    </div>
    
    // </Layout>
  );
};

export default Waitlist;