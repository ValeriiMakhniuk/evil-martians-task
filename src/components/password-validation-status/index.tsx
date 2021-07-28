import React from "react";
import { passwordValidationStatus } from "../../constants";

interface IProps {
  errors: string[] | undefined;
}

interface IStepProps {
  isValid: boolean;
  message: string;
}

const Status: React.FC<IStepProps> = ({ isValid, message }) => {
  return (
    <div>
      <span>{isValid && "✅"}</span>
      {message}
    </div>
  );
};

export const PasswordValidationStatus: React.FC<IProps> = ({ errors }) => {
  return (
    <div>
      contains:
      <ul>
        {Object.entries(passwordValidationStatus).map(([error, message]) => {
          return (
            <li key={error}>
              <Status message={message} isValid={!errors?.includes(error)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
