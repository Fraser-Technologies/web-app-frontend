import React from "react";

const WavyLines = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-8">
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "0", transform: "skewY(-12deg)" }}
        />
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "8px", transform: "skewY(-12deg)" }}
        />
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "16px", transform: "skewY(-12deg)" }}
        />
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "24px", transform: "skewY(-12deg)" }}
        />
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "32px", transform: "skewY(-12deg)" }}
        />
        <div
          className="absolute w-full h-1 bg-blue-500"
          style={{ top: "40px", transform: "skewY(-12deg)" }}
        />
      </div>
    </div>
  );
};

export default WavyLines;
