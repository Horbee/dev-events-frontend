import { FormikHelpers, useFormik } from "formik";
import { EventData } from "models/event";
import * as Yup from "yup";

export interface EventFormValues {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}

export const useEventForm = (
  onSubmit: (
    values: EventFormValues,
    formikHelpers: FormikHelpers<EventFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<EventFormValues>
) =>
  useFormik<EventFormValues>({
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
      time: Yup.string().required("Time is a Required Field")
    }),
    onSubmit
  });

export const getInitialValues = ({
  name,
  address,
  date,
  description,
  performers,
  time,
  venue
}: EventData): EventFormValues => ({
  name,
  address,
  date,
  description,
  performers,
  time,
  venue
});
