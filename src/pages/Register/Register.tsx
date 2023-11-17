import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
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
import { REST_API_URL } from "@constants/constants";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [fullnameError, setFullnameError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFullname(event.target.value);

  const validateEmailAndPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;
    const usernameRegex = /^[ -~]+$/;
    const fullnameRegex = /^[ -~]+$/;
    let valid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Email format is invalid");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!usernameRegex.test(username)) {
      console.log(username);
      setUsernameError("Username contains non ASCII characters");
      valid = false;
    } else {
      setUsernameError("");
    }
    if (!fullnameRegex.test(fullname)) {
      console.log(fullname);
      setFullnameError("Fullname contains non ASCII characters");
      valid = false;
    } else {
      setFullnameError("");
    }
    return valid;
  };

  const handleRegister = async () => {
    if (validateEmailAndPassword()) {
        const response = await fetch(`${REST_API_URL}/authors`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            name: fullname,
            bio: "This user does not have a bio",
          })
      });
      
      const contents: ServerResponse = await response.json();
      console.log(contents);
      if (!contents.valid) {
        console.log("Failed");
        if(!contents.valid){
          if(contents.data.error.nameError){
            setFullnameError(contents.data.error.nameError);
          } else{
            setFullnameError(contents.message);
          }
          if(contents.data.error.passwordError){
            setPasswordError(contents.data.error.passwordError)
          }
          if(contents.data.error.usernameError){
            setUsernameError(contents.data.error.nameError);
          }
          if(contents.data.error.emailError){
            setEmailError(contents.data.error.emailError);
          }
          return;
        }
        return;
      }


      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType?.includes("application/json")) {
          if(response.status == 201){
            console.log("Success");
            navigate('/login');
          } else{
            console.log("Failed");
            if(!contents.valid){
              if(contents.data.error.nameError){
                setFullnameError(contents.data.error.nameError);
              } else{
                setFullnameError(contents.message);
              }
              if(contents.data.error.passwordError){
                setPasswordError(contents.data.error.passwordError)
              }
              if(contents.data.error.usernameError){
                setUsernameError(contents.data.error.nameError);
              }
              if(contents.data.error.emailError){
                setEmailError(contents.data.error.emailError);
              }
              return;
            }
          }
      } else {
          console.error(`Unexpected content type: ${contentType}`);
      }
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
        <Stack marginTop={"1vh"}>
          <Heading fontSize={"4xl"}>Welcome To Baca.a 👋</Heading>
          {/* <Button
            leftIcon={<FaGoogle />}
            colorScheme="black"
            variant="outline"
            size="md"
            mt={4}
            _hover={{ bg: "white" }}
            onClick={handleRegister}
          >
            Sign in with Google
          </Button> */}
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
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              bg="white"
              placeholder="Masukkan username"
            />
            {usernameError && <Text color="gray">{usernameError}</Text>}
          </FormControl>
          <FormControl id="fullname">
            <FormLabel>Fullname</FormLabel>
            <Input
              type="text"
              value={fullname}
              onChange={handleFullnameChange}
              bg="white"
              placeholder="Masukkan fullname"
            />
            {fullnameError && <Text color="gray">{fullnameError}</Text>}
          </FormControl>
          <Button
            colorScheme="yellow"
            variant="solid"
            size="md"
            mt={4}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Text fontSize={"md"} color={"gray.600"} mt={0}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>{" "}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
