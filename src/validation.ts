import { FormikErrors } from "formik";
import * as Yup from "yup";
import { ERROR_MESSAGES_DELIMETER, initialValues } from "./constants";
import { ErrorMessages, InitialValues } from "./types";

type ReturnType =
  | void
  | object
  | Promise<FormikErrors<InitialValues>>
  | undefined;

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "min")
    .matches(/[A-Z]/, ErrorMessages.UPPERCASE)
    .matches(/[a-z]/, ErrorMessages.LOWERCASE)
    .matches(/[0-9]/, ErrorMessages.ISNUMBER)
    .matches(/[^A-Za-z0-9]/, ErrorMessages.CONTAINS),
});

const defaultErrorsObject = Object.keys(initialValues).reduce(
  (acc, key) => ({ ...acc, [key]: "" }),
  {}
);

export const validate = (values: InitialValues): ReturnType => {
  return validationSchema
    .validate(values, { abortEarly: false })
    .catch((validationError: Yup.ValidationError) => {
      return validationError.inner.reduce<Record<string, string>>(
        (errAcc, innerError) => {
          const { errors, path: key } = innerError;

          if (!key) {
            return errAcc;
          }

          const exists = errAcc[key];

          return {
            ...errAcc,
            [key]: `${errors.join(ERROR_MESSAGES_DELIMETER)}${
              exists.length > 0 ? `${ERROR_MESSAGES_DELIMETER}${exists}` : ""
            }`,
          };
        },
        defaultErrorsObject
      );
    });
};
