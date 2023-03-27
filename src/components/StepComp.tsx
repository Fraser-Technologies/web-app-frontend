import React from "react";

type StepCompProps = {
  stepNumber: string;
  stepTitle: string;
  stepSubtitle: string;
  classname?: string;
};

const StepComp = ({
  stepNumber,
  stepSubtitle,
  stepTitle,
  classname = "",
}: StepCompProps) => {
  return (
    <div className={`${classname}`}>
      <div className="flex">
        <div className="w-12 mr-6">
          <div className="bg-[#00FF6a] rounded-full  h-12 w-12 flex justify-center items-center ">
            {stepNumber}
          </div>
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-[#ffffff] text-[24px]">
            {stepTitle}
          </h4>
          <p className="mt-[15px] w-4/6 text-[#8E8E93] font-light md:text-[15px] text-[12px]">
            {stepSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepComp;
