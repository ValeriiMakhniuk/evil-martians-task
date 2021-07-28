import React from "react";

interface IProps {
  message: string;
}

export const FormError: React.FC<IProps> = ({ message }) => {
  return (
    <div>
      <span>{message}</span>
    </div>
  );
};
