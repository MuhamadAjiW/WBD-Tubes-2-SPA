import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export default function SideItem({ sideSize, icon, title, active, onClick }) {
  const size = useBreakpointValue({ base: "sm", lg: "lg" });
  return (
    <Flex
      mt={30}
      flexDir={size === "lg" ? "row" : "column"}
      w="100%"
      alignItems={size === "lg" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#AEC8CA" : "#fff"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={size === "lg" ? "100%" : undefined}
          onClick={onClick}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={size === "lg" ? "flex" : "none"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
