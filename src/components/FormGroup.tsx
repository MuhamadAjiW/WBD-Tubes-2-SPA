import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

const FormGroup = ({
  id,
  type,
  label,
  placeholder,
  value,
}: {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: [string, React.Dispatch<React.SetStateAction<string>>];
}) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (inputValue: string, inputType: string) => {
    switch (inputType) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          setIsValid(false);
          setErrorMessage("Email tidak valid");
        } else {
          setIsValid(true);
          setErrorMessage("");
        }
        break;
      case "password":
        if (inputValue.length < 8) {
          setIsValid(false);
          setErrorMessage("Password harus memiliki minimal 8 karakter");
        } else {
          setIsValid(true);
          setErrorMessage("");
        }
        break;
      default:
        setIsValid(true);
        setErrorMessage("");
        break;
    }
  };

  return (
    <FormControl id={id} isInvalid={!isValid}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={value[0]}
        onChange={(e) => value[1](e.target.value)}
        onBlur={() => validateInput(value[0], type)}
      />
      {!isValid && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default FormGroup;
