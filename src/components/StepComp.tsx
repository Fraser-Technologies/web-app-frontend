import React from "react";

type StepCompProps = {
  stepNumber: string;
  stepTitle: string;
  stepSubtitle: string;
  classname?: string;
  cardclassname?: string;
};

const StepComp = ({
  stepNumber,
  stepSubtitle,
  stepTitle,
  classname = "",
  cardclassname = "",
}: StepCompProps) => {
  return (
    <div className={`${classname}`}>
      <div className="flex">
        <div className="w-12 mr-4">
          <div className="bg-[#00FF6a] rounded-full  h-12 w-12 flex justify-center items-center ">
            {stepNumber}
          </div>
        </div>
        <div className={`w-full ${cardclassname} bg-white hover:bg-primary-100 p-8 rounded-md`}>
          <h4 className="font-medium text-[#000000] text-[18px]">
            {stepTitle}
          </h4>
          <p className="mt-[12px] text-[#353535] font-light md:text-[0.9rem] text-[0.9rem]">
            {stepSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepComp;
