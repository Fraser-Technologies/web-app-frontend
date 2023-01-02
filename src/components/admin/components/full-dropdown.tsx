import React from "react";
import { FaCaretDown } from "react-icons/fa";
import DropDown from "./drop-down";

const DropdownComponent = ({
  topLabel,
  dropdownLabel,
  onClickFunction,
  onChangeFunction,
  dropControllerBool,
  displayText,
  dataSetName,
  dataSetMapFunction,
  fullBodyClassName,
  dropDownClassName,
  addNewOnClickFunction,
}: {
  topLabel: String;
  dropdownLabel: String;
  onChangeFunction: any;
  onClickFunction: any;
  dropControllerBool: boolean;
  displayText: String;
  dataSetName: any;
  dataSetMapFunction: any;
  fullBodyClassName: any;
  dropDownClassName: any;
  addNewOnClickFunction: any;
}) => {
  return (
    <div className={fullBodyClassName}>
      <p className="w-full mb-2 text-gray-500">{topLabel}</p>
      <div className="w-full flex items-center">
        <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
          {dropdownLabel}
        </div>
        <DropDown
          onChangeFunction={onChangeFunction}
          onClickFunction={onClickFunction}
          dropControllerBool={dropControllerBool}
          displayText={displayText}
          dataSetName={dataSetName}
          dataSetMapFunction={dataSetMapFunction}
          dropDownClassName={`&{w-full} ${dropDownClassName}`}
          addNewOnClickFunction={addNewOnClickFunction}
        />
      </div>
    </div>
  );
};

export default DropdownComponent;
