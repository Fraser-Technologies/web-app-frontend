import React from "react";
import { FaCaretDown } from "react-icons/fa";

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
      <div>
        <div>
          <p className="mb-2 text-gray-500">{topLabel}</p>
          <div className="flex items-center">
            <div className="bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
              {dropdownLabel}
            </div>
            {/* START BUSSTOP */}
            <div className="relative inline text-left w-full">
              <div className="rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex items-center justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={onClickFunction}
                  onChange={onChangeFunction}
                >
                  {displayText}
                  <FaCaretDown className="ml-auto" />
                </button>
              </div>

              {dropControllerBool && (
                <>
                  <div className={dropDownClassName}>
                    <div className="w-full h-[240px] pb-12 overflow-y-scroll rounded-md bg-white shadow-xs w-full py-4">
                      {dataSetName == null ? (
                        <div className="px-6 py-2 animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                              </div>
                              <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        dataSetMapFunction
                      )}
                      <div
                        onClick={addNewOnClickFunction}
                        className="absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50"
                      >
                        +Add New
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownComponent;
