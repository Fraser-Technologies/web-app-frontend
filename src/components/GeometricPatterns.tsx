import React from "react";

const GeometricPatterns = () => {
  return (
    <div className="flex flex-wrap overflow-hidden">
      <div className="w-1/4 h-24 lg:h-32 bg-black z-0 shape-circle-sm rotate-45"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-red-500 z-0  shape-triangle-md rotate-90"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-green-500 z-0  shape-square-lg rotate-135"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-blue-500 z-0  shape-hexagon-xl rotate-180"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-purple-500 z-0  shape-octagon-2xl rotate-225"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-orange-500 z-0  shape-ellipse-3xl rotate-270"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-teal-500 z-0  shape-star-4xl rotate-315"></div>
      <div className="w-1/4 h-24 lg:h-32 bg-pink-500 z-0  shape-plus-5xl rotate-360"></div>
    </div>
  );
};

export default GeometricPatterns;
