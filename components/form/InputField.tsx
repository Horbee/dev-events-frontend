import { useField } from "formik";

import { Box, FormControl, FormLabel, Input, InputProps, Text } from "@chakra-ui/react";

interface InputFieldProps extends InputProps {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  isRequired,
  children,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <Box>
      <FormControl id={props.id} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        {children ?? (
          <Input
            isInvalid={!!(meta.error && meta.touched)}
            {...field}
            {...props}
          />
        )}
      </FormControl>
      {meta.error && meta.touched && <Text color="red.400">{meta.error}</Text>}
    </Box>
  );
};
