import { FormikErrors } from "formik";
import * as Yup from "yup";
import { ERROR_MESSAGES_DELIMETER, initialValues } from "./constants";
import { ErrorMessages, TInitialValues } from "./types";

type ReturnType =
  | void
  | object
  | Promise<FormikErrors<TInitialValues>>
  | undefined;

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, ErrorMessages.MINIMUM)
    .matches(/[A-Z]/, ErrorMessages.UPPERCASE)
    .matches(/[a-z]/, ErrorMessages.LOWERCASE)
    .matches(/[0-9]/, ErrorMessages.ISNUMBER)
    .matches(/[^A-Za-z0-9]/, ErrorMessages.CONTAINS),
});

const defaultErrorsObject: Record<keyof typeof initialValues, null> | {} =
  Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: null }),
    {}
  );

export const validate = (values: TInitialValues): ReturnType => {
  return validationSchema
    .validate(values, { abortEarly: false })
    .then(() => null)
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
              !!exists ? `${ERROR_MESSAGES_DELIMETER}${exists}` : ""
            }`,
          };
        },
        defaultErrorsObject
      );
    });
};
