import React from "react";
import { Button } from "@chakra-ui/react";

const FormButton = ({
  text,
  onClickFunction,
  disabled,
}: {
  text: string;
  onClickFunction: () => void;
  disabled: boolean;
}) => {
  return (
    <Button
      colorScheme="yellow"
      mt={4}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
export default FormButton;
