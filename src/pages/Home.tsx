import Sidebar from "../components/Sidebar";

import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";
import backgroundImage from "../assets/logo.svg";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          minH: "100vh",
          minW: "100vw",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          position: "relative",
        }}
      >
        <Sidebar />
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Welcome To Platform <br />
              <Text as={"span"} color={"yellow.400"}>
                Baca.a
              </Text>
            </Heading>
            <Text color={"black"}>
              Baca.a merupakan platform untuk mendengarkan audiobook yang dapat
              diakses secara gratis dan dapat diakses dimana saja dan kapan
              saja. Baca.a juga menyediakan fitur untuk membuat pengguna nyaman
              dalam menggunakannya. Telah digunakan oleh 2+ pengguna
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
