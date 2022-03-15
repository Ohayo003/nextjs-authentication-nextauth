import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  Link,
  chakra,
} from "@chakra-ui/react";
import { useState, forwardRef } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface TextFieldProps {
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps & InputProps>(
  ({ error, type, ...props }, ref) => {
    const isEmail = type === "email";
    const isPswd = type === "password";

    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormControl isInvalid={!!error}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {isEmail && <CFaUserAlt color="gray.300" />}
            {isPswd && <CFaLock color="gray.300" />}
          </InputLeftElement>

          <Input ref={ref} type={type} {...props} />

          {isPswd && (
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>

        {isPswd && (
          <FormHelperText textAlign="right">
            <Link>forgot password?</Link>
          </FormHelperText>
        )}

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
