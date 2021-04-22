import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface AddEventFormValues {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}

export const addEventForm = (
  onSubmit: (
    values: AddEventFormValues,
    formikHelpers: FormikHelpers<AddEventFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<AddEventFormValues>
) =>
  useFormik<AddEventFormValues>({
    initialValues: {
      name: "",
      performers: "",
      venue: "",
      address: "",
      date: "",
      time: "",
      description: "",
      ...intialValues
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is a Required Field"),
      performers: Yup.string().required("Performers is a Required Field"),
      venue: Yup.string().required("Performers is a Required Field"),
      address: Yup.string().required("Address is a Required Field"),
      date: Yup.string().required("Date is a Required Field"),
      time: Yup.string().required("Time is a Required Field"),
      description: Yup.string().required("Description is a Required Field")
    }),
    onSubmit
  });
