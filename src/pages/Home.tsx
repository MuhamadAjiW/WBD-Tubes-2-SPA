import React from 'react';
import Sidebar from '../components/Sidebar';
import { Flex } from '@chakra-ui/react';

const Home = () => {
    return (
        <>
        <Sidebar />
        <Flex flex="1" p="20px" marginLeft="13%">
            <div>
                <h1>Author's home page</h1>
            </div>
        </Flex>
        </>
    )
};

export default Home;