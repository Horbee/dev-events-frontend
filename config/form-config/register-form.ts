import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const useRegisterForm = (
  onSubmit: (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<RegisterFormValues>
) =>
  useFormik<RegisterFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      ...intialValues
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is a Required Field"),
      email: Yup.string()
        .email("E-Mail must be valid.")
        .required("E-Mail is a Required Field"),
      password: Yup.string().required("Password is a Required Field"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password Confirm is a Required Field")
    }),
    onSubmit
  });
