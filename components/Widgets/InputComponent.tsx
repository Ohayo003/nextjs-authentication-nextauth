import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IData } from "pages/login";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

type InputComponentType = {
  register: UseFormRegister<IData>;
  email?: FieldError | undefined;
  isEmail: Boolean;
};

const InputComponent = ({ register, email, isEmail }: InputComponentType) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <FormControl isInvalid={isEmail ? !!email : !!null}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {isEmail ? (
            <CFaUserAlt color="gray.300" />
          ) : (
            <CFaLock color="gray.300" />
          )}
        </InputLeftElement>
        <Input
          id="email"
          type={isEmail ? "email" : showPassword ? "Text" : "password"}
          placeholder={isEmail ? "email address" : "Password"}
          {...register(isEmail ? "email" : "password")}
        />
        {isEmail ? null : (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {isEmail ? null : (
        <FormHelperText textAlign="right">
          <Link>forgot password?</Link>
        </FormHelperText>
      )}
      {isEmail ? <FormErrorMessage>{email?.message}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputComponent;
