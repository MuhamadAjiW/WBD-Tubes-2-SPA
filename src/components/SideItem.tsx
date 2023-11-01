import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import { IconType } from 'react-icons';

export default function SideItem({sideSize, icon, title, active, onClick}) {
    return (
        <Flex
            mt={30}
            flexDir='column'
            w='100%'
            alignItems={sideSize == "small" ? "center" : "flex-start"}
        >

            <Menu placement='right'>
                <Link
                    backgroundColor={active ? '#AEC8CA' : "#fff"}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecor: 'none', backgroundColor: "#AEC8CA"}}
                    w={sideSize == "large" && "100%"}
                    onClick={onClick}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"}/>
                            <Text ml={5} display={sideSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
    )
}