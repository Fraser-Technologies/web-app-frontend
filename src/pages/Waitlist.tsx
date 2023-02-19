import React, { useState } from "react";
import "./../styles/Waitlist.css";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { async } from "@firebase/util";
import BeatLoader from "react-spinners/BeatLoader";
import { db } from "../components/Firebase";
import "firebase/compat/firestore";

const Waitlist = () => {
	const [modal, openModal] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

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
		<>
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
						<div>
							<Modal
								// cssModule={STYLE.modal}
								className="form-modal"
								size="lg"
								isOpen={modal}
								centered={true}
								toggle={() => openModal(!modal)}>
								<ModalHeader
									close={null}
									className="modal-header"
									toggle={() => openModal(!modal)}>
									<p className="modal-header-subtitle">
										Fraser goes the extra mile to ensure your convenience and
										safety without breaking the bank.😊
										<br />
										<br />
										P.S. Get free trips when you join our waitlist
									</p>
								</ModalHeader>

								<ModalBody>
									<form onSubmit={handleSubmit}>
										<Row>
											<Col lg={12}>
												<div className="form-field">
													<label className="form-label" htmlFor="name">
														First name
													</label>
													<input
														type="text"
														className="form-control"
														value={firstName}
														onChange={(e) => setFirstName(e.target.value)}
													/>
												</div>
											</Col>
											<Col lg={12}>
												<div className="form-field">
													<label className="form-label" htmlFor="name">
														Last name
													</label>
													<input
														type="text"
														className="form-control"
														value={lastName}
														onChange={(e) => setLastName(e.target.value)}
													/>
												</div>
											</Col>
											<Col lg={12}>
												<div className="form-field">
													<label className="form-label" htmlFor="email">
														Email
													</label>
													<input
														type="email"
														className="form-control"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</Col>
										</Row>

										<button className="modal-button Button" type="submit">
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
								</ModalBody>
							</Modal>

							{/* Button */}
						</div>

						<button
							className="Button"
							onClick={() => {
								openModal(true);
							}}>
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
		</>
	);
};

export default Waitlist;
