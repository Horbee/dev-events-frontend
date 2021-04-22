import { useField } from "formik";

import { Input, InputProps } from "@chakra-ui/react";

interface InputFieldProps extends InputProps {
  name: string;
}

export const InputField = (props: InputFieldProps) => {
  console.log(props.name);
  //   const [field, meta, helpers] = useField("name");
  return (
    <>
      {/* <Input {...field} {...props} /> */}
      <Input {...props} />
      {/* {meta.error && meta.touched && <div>{meta.error}</div>} */}
    </>
  );
};
