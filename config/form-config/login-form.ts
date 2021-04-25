import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const useLoginForm = (
  onSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<LoginFormValues>
) =>
  useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      ...intialValues
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-Mail must be valid.")
        .required("E-Mail is a Required Field"),
      password: Yup.string().required("Password is a Required Field")
    }),
    onSubmit
  });
