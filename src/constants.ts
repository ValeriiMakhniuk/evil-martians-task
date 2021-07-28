import { ErrorMessages } from "./types";

export const ERROR_MESSAGES_DELIMETER = "_";
export const MIN_PASSWORD_LENTGH = 8;

export const passwordValidationStatus: Record<ErrorMessages, string> = {
  [ErrorMessages.MINIMUM]: "more than 7 characters",
  [ErrorMessages.CONTAINS]: "special character",
  [ErrorMessages.ISNUMBER]: "number",
  [ErrorMessages.LOWERCASE]: "lowercase character",
  [ErrorMessages.UPPERCASE]: "uppercase character",
};

export const initialValues = {
  email: "",
  password: "",
};
