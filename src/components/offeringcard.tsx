import React from "react";

type OfferingcardProps = {
  title: string;
  subtitle: string;
  classname?: string;
  subtitleClassname?: string
};

const Offeringcard = ({
  title,
  subtitle,
  classname = "",
  subtitleClassname = ""
}: OfferingcardProps) => {
  return (
    <>
      <div
        className={`px-6 py-8 md:p-12 w-full rounded-md min-w-[200px] border border-[#e3e3e3] ${classname}`}
      >
        <img
          src={"/assets/images/W55sUXVqufgAAAABJRU5ErkJggg==.png"}
          alt=""
          className="h-[30px] w-[30px]"
        />
        <h3 className="mt-4 text-[1.3rem] md:text-[2rem] font-medium text-[#353535]">
          {title}
        </h3>
        <p className={` ${subtitleClassname} text-[0.9rem] mt-2`}>{subtitle}</p>
      </div>
    </>
  );
};

export default Offeringcard;
