import React from "react";

const Progress = ({
  value,
  primaryColor = "bg-green-500",
  secondaryColor = "bg-gray-800",
}: {
  value: number;
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  return (
    <div className={`w-full h-2.5 ${secondaryColor} overflow-hidden rounded`}>
      <div
        className={`h-full ${primaryColor} transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress;
