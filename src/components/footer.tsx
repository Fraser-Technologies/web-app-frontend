import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-12 md:px-8 ">
      <div className="lg:flex justify-between md:mx-auto lg:mx-auto mb-16 md:w-2/3">
        <div className="flex justify-between mx-6 w-full mr-12">
          <div className="text-gray-500 w-1/2">
            <h4 className="mb-12 text-black text-lg font-medium">Services</h4>
            <ul>
              <li className="mb-8">
                <a href="#">How it works</a>
              </li>
              <li className="mb-8">
                <a href="#">Intercity trips</a>
              </li>
              <li className="mb-8">
                <a href="#">Bus Charter</a>
              </li>
              <li className="mb-8">
                <a href="#">Business</a>
              </li>
            </ul>
          </div>
          <div className=" text-gray-500 w-1/2">
            <h4 className="mb-12 text-black text-lg font-medium">Legal</h4>
            <ul>
              <li className="mb-8">
                <a href="#">Terms of Service</a>
              </li>
              <li className="mb-8">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-8">
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between mx-6 w-full mt-12 md:mt-0">
          <div className=" text-gray-500 w-1/2">
            <h4 className="mb-12 text-black text-lg font-medium">Partner</h4>
            <ul>
              <li className="mb-8">
                <a href="#">Driver</a>
              </li>
              <li className="mb-8">
                <a href="#">Bus Owner</a>
              </li>
              <li className="mb-8">
                <a href="#">Fleet Owner</a>
              </li>
              <li className="mb-8">
                <a href="#">Ticket Outlet</a>
              </li>
              <li className="mb-8">
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>
          <div className="text-gray-500 w-1/2">
            <h4 className="mb-12 text-black text-lg font-medium">Contact Us</h4>
            <ul>
              <li className="mb-8 w-2/3">
                <a href="mailto:contact@ridefraser.com" className="w-2/3">
                  Send an Email
                </a>
              </li>
              <li className="mb-8">
                <a href="tel:07045533534">Call</a>
              </li>
              <li className="mb-8">
                <a href="https://chat.whatsapp.com/Lo53CNTd3D2L1AobyzRREa">
                  Join the Community
                </a>
              </li>
              <li className="mb-8">
                <a href="#">Got a suggestion?</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full border-t md:mx-32 mb-12"></div>
      <div className="md:flex justify-between mx-6 md:mx-8 lg:mx-32">
        <div className="items-center flex-row">
          <img
            src="/assets/images/fraser-black-logo.svg"
            alt="RideFraser Logo"
            className="h-6"
          />
          <div className="text-gray-500 mt-4 text-[14px]">
            © 2023 Fraser. All rights reserved.
          </div>
        </div>
        <li className="flex items-center space-x-8 mt-12 mb-6 md:mb-0 md:mt-2">
          <a
            href="https://www.instagram.com/ridefraser/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/ridefraser"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/ridefraser/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="fab fa-linkedin fa-lg" />
          </a>
        </li>
      </div>
    </footer>
  );
};

export default Footer;
