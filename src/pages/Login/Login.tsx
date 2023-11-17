import React, { useState } from "react";

import { Link, useNavigate } from 'react-router-dom';
// import { FaGoogle } from "react-icons/fa";
import backgroundImage from "@assets/logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { validateEmailAndPassword, loginRequest } from './LoginUtil';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(['token']);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
    setPasswordError("");
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = async () => {
    const check = validateEmailAndPassword(email, password);
    if(check.valid){
      const loginResponse: ServerResponse = await loginRequest(email, password)
      if(!loginResponse.valid){
        console.error("Login fetch failed");
        setEmailError(loginResponse.message);
        setPasswordError(loginResponse.message);
        return;
      }
      console.log("Login fetch successful")
      setCookie('token', loginResponse.data);
      navigate('/home');
    
    } else{
      check.emailError? setEmailError(check.emailError) : setEmailError("");
      check.passwordError? setPasswordError(check.passwordError) : setPasswordError("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minH: "100vh",
        minW: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack marginTop={"5vh"}>
          <Heading fontSize={"4xl"}>Welcome Back 👋</Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              bg="white"
              placeholder="Masukkan email"
            />
            {emailError && <Text color="gray">{emailError}</Text>}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                bg="white"
                placeholder="Masukkan password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && <Text color="gray">{passwordError}</Text>}
          </FormControl>
          <Button
            colorScheme="yellow"
            variant="solid"
            size="md"
            mt={4}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Text fontSize={"md"} color={"gray.600"} mt={4}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "black" }}>
              Register
            </Link>{" "}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
