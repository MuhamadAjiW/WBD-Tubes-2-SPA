import React, {useState} from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Flex,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    ModalFooter,
    background,
  } from '@chakra-ui/react'

import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { color } from 'framer-motion';

const Subscriber = () => {

    const dummyData = [
        {
            username: "user1",
            email: "user1@example.com",
        },
        {
            username: "user2",
            email: "user2@example.com",
        },
        {
            username: "user3",
            email: "user3@example.com",
        },
        {
            username: "user4",
            email: "user4@example.com",
        },
        {
            username: "user5",
            email: "user5@example.com",
        }
    ]

    let rowCount = 1;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Function to open delete modal
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }

    // Function to close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

    // Function to open pending request modal
    const openSubscribeModal = () => {
        setIsSubscribeModalOpen(true);
    }

    // Function to close pending request modal
    const closeSubscribeModal = () => {
        setIsSubscribeModalOpen(false)
    }

    const subscribeDummyData = [
        {
            username: "user6"
        },
        {
            username: "user7"
        },
        {
            username: "user8"
        },
        {
            username: "user9"
        },
        {
            username: "user10"
        }
    ]
    

    return (
        <>
            <Flex
            flexDir="column"
            justifyContent="flex-start"
            alignItems="center"
            >
                <Flex
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                w="145vh"
                marginBottom="2rem">
                    <Heading as="h1" size="2xl">Subscriber List</Heading>
                    <Button
                        variant="outline"
                        colorScheme="black"
                        _hover={{backgroundColor:"black", color: "white"}}
                        mr={2}
                        onClick={() => {
                            openSubscribeModal();
                        }}
                    >Pending Request
                    </Button>
                </Flex>
                <TableContainer>
                    <Table variant="striped" size="lg" w="145vh" colorScheme="gray">
                        <TableCaption>Author's Subscribers</TableCaption>
                        <Thead>
                            <Tr>
                                <Th textAlign="center" verticalAlign="middle">No.</Th>
                                <Th textAlign="center" verticalAlign="middle">Username</Th>
                                <Th textAlign="center" verticalAlign="middle">Email</Th>
                                <Th textAlign="center" verticalAlign="middle">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                dummyData.map((item) => (
                                    <Tr key={item.title}>
                                        <Td textAlign="center" verticalAlign="middle">{rowCount++}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.username}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.email}</Td>
                                        <Td textAlign="center" verticalAlign="middle">
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                variant="outline"
                                                colorScheme="red"
                                                mr={2}
                                                onClick={() => {
                                                    openDeleteModal()
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>

            <Modal 
            // This is delete modal
            isOpen={isDeleteModalOpen} onClose={closeDeleteModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" verticalAlign="middle">Remove Subscriber</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign="center" verticalAlign="middle">
                        Are you sure you want to remove this user from your subscriber list?
                    </ModalBody>
                    <ModalFooter textAlign="center" verticalAlign="middle">
                        <Flex
                        flexDir="row"
                        alignItems="center"
                        w="100%"
                        >
                            <Button onClick={closeDeleteModal} style={{color: "white"}} backgroundColor="red.400" w="50%">Remove</Button>
                            <Button onClick={closeDeleteModal} style={{color: "white"}} backgroundColor="blue.100" ml={3} w="50%">Cancel</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
            // This is pending request modal
            isOpen={isSubscribeModalOpen} onClose={closeSubscribeModal} isCentered
            scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" verticalAlign="middle">Subscribe Requests</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign="center" verticalAlign="middle">
                        <Table variant="simple" w="100%">
                            <Thead>
                                <Tr>
                                    <Th textAlign="center" verticalAlign="middle">Username</Th>
                                    <Th textAlign="center" verticalAlign="middle">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    subscribeDummyData.map((item) => (
                                        <Tr key={item.username}>
                                            <Td textAlign="center" verticalAlign="middle">{item.username}</Td>
                                            <Td textAlign="center" verticalAlign="middle" >
                                                <Button onClick={closeSubscribeModal} style={{color: "white"}} backgroundColor="blue.500" ml={3} w="30%">Confirm</Button>
                                                <Button onClick={closeSubscribeModal} style={{color: "white"}} backgroundColor="red.400" w="30%" marginLeft="10px">Delete</Button>
                                            </Td>
                                        </Tr>
                                    )) 
                                }
                            </Tbody>
                        </Table>
                    </ModalBody>
                </ModalContent>

            </Modal>
        </>
    )
};

export default Subscriber;