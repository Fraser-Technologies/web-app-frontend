import React, { useState } from "react";
import "./../styles/Waitlist.css";
import { Col, Row } from "reactstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { async } from "@firebase/util";
import BeatLoader from "react-spinners/BeatLoader";
import { db } from "../components/Firebase";
import "firebase/compat/firestore";
import Layout from "../components/layouts/SignInLayout";
import { Input, Modal } from "antd";

const Waitlist = () => {
  const [modal, openModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    <Layout title="Waitlist">
      <div className="waitlist-body">
        <div className="container">
          <div className="wrapper">
            <div className="logo-container">
              <div className="logo-wrapper">
                <h1 className="logo">Fraser</h1>
              </div>
            </div>
            <div className="waitlist-text">
              <h1 className="header-text">
                Move freely <br />{" "}
                <span className="cities">between cities.</span>
              </h1>
              <p className="subtitle-text">
                {" "}
                Do you want to travel between cities comfortably, conveniently
                and affordably, use Fraser.
                <br />
                <br />
                Be the first to know when we launch.
              </p>
            </div>
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

            {/* Modal */}

            {modal && (
              <Modal
                title={
                  <p className="text-[16px] text-[#929292] mt-4 w-11/12">
                    Fraser goes the extra mile to ensure your convenience and
                    safety without breaking the bank.😊
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
                    className={`w-full p-3 mt-6 font-medium rounded-lg ${
                      loginValid
                        ? "bg-[#00ff6a] hover:bg-[#58FF9E]"
                        : "bg-[#f5f5f5]"
                    } `}
                    type="submit"
                    onClick={loginValid ? handleSubmit : () => {}}
                  >
                    {loading ? (
                      <BeatLoader
                        color={"#000000"}
                        loading={loading}
                        size={15}
                      />
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              </Modal>
            )}

            {/* <Modal
              // cssModule={STYLE.modal}
              className="form-modal"
              size="lg"
              isOpen={modal}
              centered={true}
              toggle={() => openModal(!modal)}
            >
              <ModalHeader
                close={null}
                className="modal-header"
                toggle={() => openModal(!modal)}
              >
                <p className="modal-header-subtitle">
                  Fraser goes the extra mile to ensure your convenience and
                  safety without breaking the bank.😊
                  <br />
                  <br />
                  P.S. Get free trips when you join our waitlist
                </p>
              </ModalHeader>

              <ModalBody>
                
              </ModalBody>
            </Modal> */}

            {/* Button */}

            <button
              className="Button"
              onClick={() => {
                openModal(true);
              }}
            >
              Get Early Access
            </button>

            <div className="image-container">
              <div className="image-bg-left">
                <div className="image-bg">
                  <img className="homepage" src="/Homepage.png" alt="" />
                </div>
              </div>
            </div>
            {/* <Form /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Waitlist;
