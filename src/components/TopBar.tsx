import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const history = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let currentRoute = location.pathname.slice(1);

  if (currentRoute.includes("playlist")) {
    currentRoute = "Playlists";
  }

  const [activeSideItem, setactiveSideItem] = useState<string | null>(
    currentRoute
  );
  const handleSideItemClick = (title: string) => {
    setactiveSideItem(title);
    history(`/${title}`);
  };
  const logout = () => {
    removeCookie('token',{path:'/'});
    window.location.href = "/login";
  }

  const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");

    return (
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };

  const MobileNavItem = ({ label, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
      <Stack spacing={4} onClick={onToggle}>
        <Box
          py={2}
          as="a"
          href={href ?? "#"}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Box>

        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}
          ></Stack>
        </Collapse>
      </Stack>
    );
  };

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: "Home",
      href: "/home",
      onClick: () => {
        handleSideItemClick("Home");
      },
      active: activeSideItem === "Home",
    },
    {
      label: "Books",
      href: "/Books",
      onClick: () => {
        handleSideItemClick("Books");
      },
      active: activeSideItem === "Books",
    },
    {
      label: "Playlist",
      href: "/playlists",
      onClick: () => {
        handleSideItemClick("Playlist");
      },
      active: activeSideItem === "Playlist",
    },
    {
      label: "Subscriber",
      href: "subscribers",
      onClick: () => {
        handleSideItemClick("Subscriber");
      },
      active: activeSideItem === "Subscriber",
    },
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue("yellow.400", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.900", "white")}
            fontWeight={600}
          >
            Welcome To Baca.a
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={1200}
            variant={"link"}
            href={"#"}
            color={"white"}
            textUnderlineOffset={2}
            onClick={logout}
          >
            Log Out
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
