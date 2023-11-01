import React, {useState} from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Center
} from '@chakra-ui/react'

import {
    FiMenu,
    FiBook,
    FiList,
    FiUser,
    FiSettings,
    FiHome
} from 'react-icons/fi'

import {IoPawOutline} from 'react-icons/io5'
import SideItem from './SideItem'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [sideSize, changesideSize] = useState("large")
    const [activeSideItem, setactiveSideItem] = useState<string | null>(null)
    const history = useNavigate();
    const handleSideItemClick = (title) => {
        setactiveSideItem(title);
        history(`/${title}`);
    }


    return (
        <Flex
            pos="sticky"
            left="5"
            h="100vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            borderRadius={sideSize == "small" ? "15px" : "30px"}
            w={sideSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p='5%'
                flexDir='column'
                w="100%"
                alignItems={sideSize == "small" ? "center" : "flex-start"}
                as='nav'
            >
                <IconButton 
                    background='none'
                    mt={5}
                    _hover={{background:'none'}}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (sideSize == "small") 
                            changesideSize("large")
                        else 
                            changesideSize("small")
                    }}
                />

                <SideItem sideSize={sideSize} icon={FiHome} title="Home" active={activeSideItem === 'Home'} onClick={() => handleSideItemClick('Home')} />
                <SideItem sideSize={sideSize} icon={FiBook} title="Books" active={activeSideItem === 'Books'} onClick={() => handleSideItemClick('Books')} /> 
                <SideItem sideSize={sideSize} icon={FiList} title="Playlists" active={activeSideItem === 'Playlists'} onClick={() => handleSideItemClick('Playlists')} />  
                <SideItem sideSize={sideSize} icon={FiUser} title="Subscribers" active={activeSideItem === 'Subscribers'} onClick={() => handleSideItemClick('Subscribers')} />                 
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={sideSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={sideSize == "small" ? "none" : "flex"}/>
                <Flex mt={4} align='center'>
                    <Avatar size='sm'/>
                    <Flex flexDir='column' ml={4} display={sideSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Author</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}