import React, { useState } from "react";
// import styled from "styled-components";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import { accordiondata } from "./AccordionData";
import "./Accordion.css"
import Button from "../Button/Button";

const Accordion = () => {
  const [selected, setSelection] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelection(null);
    }
    setSelection(i);
  };
  return (
    <>
      <div className="accordion">
        {accordiondata.map((accordiondata, i) => (
          <div className="item" onClick={() => toggle(i)}>
            <div className="title">
              <h2 className="accordion-title-text">
                {" "}
                {accordiondata.topline}{" "}
              </h2>
              <span>
                {" "}
                <FaChevronDown
                  className={selected === i ? "iconshow" : ""}
                />{" "}
              </span>
            </div>
            <div className={selected === i ? "show" : "content"}>
              {accordiondata.text}
              <Button buttonText="Get Started" buttonIcon={<FaArrowRight />} className="button accordion-button"/>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
