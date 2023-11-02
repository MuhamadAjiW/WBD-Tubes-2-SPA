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
    FormLabel,
    Input,
    InputGroup,
    FormControl,
    Textarea,
  } from '@chakra-ui/react'

import { EditIcon, DeleteIcon, AddIcon, ViewIcon } from "@chakra-ui/icons";
import { color } from 'framer-motion';

const Playlist = () => {

    const dummyData = [
        {
            title: "Playlist 1",
            description: "Ini playlist 1",
            bookCount: 10,
            totalDuration: 200
        },
        {
            title: "Playlist 2",
            description: "Ini playlist 2",
            bookCount: 5,
            totalDuration: 100
        },
        {
            title: "Playlist 3",
            description: "Ini playlist 3",
            bookCount: 2,
            totalDuration: 40
        },
        {
            title: "Playlist 4",
            description: "Ini playlist 4",
            bookCount: 4,
            totalDuration: 80
        },
        {
            title: "Playlist 5",
            description: "Ini playlist 5",
            bookCount: 8,
            totalDuration: 150
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

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Function to open delete modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    }

    // Function to close delete modal
    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }

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
                w="150vh"
                marginBottom="2rem">
                    <Heading as="h1" size="2xl">Playlists Management</Heading>
                    <IconButton
                        icon={<AddIcon />}
                        variant="outline"
                        colorScheme="green"
                        mr={2}
                        onClick={() => {
                            openAddModal();
                        }}
                    />
                </Flex>
                <TableContainer>
                    <Table variant="striped" size="lg" w="150vh" colorScheme="gray">
                        <TableCaption>Author's playlists</TableCaption>
                        <Thead>
                            <Tr>
                                <Th textAlign="center" verticalAlign="middle">No.</Th>
                                <Th textAlign="center" verticalAlign="middle">Title</Th>
                                <Th textAlign="center" verticalAlign="middle">Description</Th>
                                <Th textAlign="center" verticalAlign="middle">Book Count</Th>
                                <Th textAlign="center" verticalAlign="middle">Total Duration</Th>
                                <Th textAlign="center" verticalAlign="middle">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                dummyData.map((item) => (
                                    <Tr key={item.title}>
                                        <Td textAlign="center" verticalAlign="middle">{rowCount++}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.title}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.description}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.bookCount}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.totalDuration}</Td>
                                        <Td textAlign="center" verticalAlign="middle">
                                            <IconButton
                                                icon={<ViewIcon />}
                                                variant="outline"
                                                colorScheme="blue"
                                                mr={2}
                                                onClick={() => {
                                                // Handle the view action
                                                }}
                                            />
                                            <IconButton
                                                icon={<EditIcon />}
                                                variant="outline"
                                                colorScheme="teal"
                                                mr={2}
                                                onClick={() => {
                                                // Handle the edit action
                                                }}
                                            />
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
            //This is delete modal
            isOpen={isDeleteModalOpen} onClose={closeDeleteModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" verticalAlign="middle">Delete Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign="center" verticalAlign="middle">
                        Are you sure you want to delete this playlist?
                    </ModalBody>
                    <ModalFooter textAlign="center" verticalAlign="middle">
                        <Flex
                        flexDir="row"
                        alignItems="center"
                        w="100%"
                        >
                            <Button onClick={closeDeleteModal} style={{color: "white"}} backgroundColor="red.400" w="50%">Delete</Button>
                            <Button onClick={closeDeleteModal} style={{color: "white"}} backgroundColor="blue.100" ml={3} w="50%">Cancel</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
            // This is add modal
            isOpen={isAddModalOpen} onClose={closeAddModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" verticalAlign="middle">Add Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl marginRight="1rem">
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' type='text' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder="Your playlist description" size="sm" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeAddModal} colorScheme='blue' mr={3}>
                            Save Playlist
                        </Button>
                        <Button onClick={closeAddModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default Playlist;