import React, {useState, useEffect} from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom';
import { REST_BASE_URL } from '../constants/constants'
import { useCookies } from 'react-cookie'

interface IAuthor {
    author_id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    bio: string;
}

export default function Sidebar() {
    const [sideSize, changesideSize] = useState("large")
    const [author, setAuthor] = useState(null)
    const history = useNavigate();
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['token']);
    let currentRoute = location.pathname.slice(1);

    if (currentRoute.includes("playlist")) {
        currentRoute = "Playlists"
    }

    const [activeSideItem, setactiveSideItem] = useState<string | null>(currentRoute)
    const handleSideItemClick = (title: string) => {
        setactiveSideItem(title);
        history(`/${title}`);
    }

    const fetchAuthor = async () => {
        const token = cookies.token;

        const response = await fetch(`${REST_BASE_URL}/authors/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': token ?? "Bearer " + token,
            },
        });
        
        if (!response.ok) {
            console.error(`API request failed with status: ${response.status}`);
        }


        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType?.includes("application/json")) {
            const data = await response.json();
            setAuthor(data)
        } else {
            console.error(`Unexpected content type: ${contentType}`);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, []);


    return (
        <Flex
            pos="fixed"
            left="5"
            h="95vh"
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
                        <Heading as="h3" size="sm">{author?.name}</Heading>
                        <Text color="gray">{author?.bio}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}