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

import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { color } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const BookList = () => {

    const dummyData = [
        {
            title: "Judul Buku 1",
            wordCount: 10000,
            duration: 40,
            releaseDate: "2023-10-20"
        },
        {
            title: "Judul Buku 2",
            wordCount: 2000,
            duration: 20,
            releaseDate: "2023-10-30"
        },
        {
            title: "Judul Buku 3",
            wordCount: 100,
            duration: 10,
            releaseDate: "2023-10-2"
        },
        {
            title: "Judul Buku 4",
            wordCount: 500,
            duration: 20,
            releaseDate: "2023-10-5"
        },
        {
            title: "Judul Buku 5",
            wordCount: 8000,
            duration: 40,
            releaseDate: "2023-10-26"
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
            <Sidebar />
            <Flex flex="1" p="20px" marginLeft="13%">
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
                        <Heading as="h1" size="2xl">Books Management</Heading>
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
                        <Table variant="striped" size="lg" w="145vh" colorScheme="gray">
                            <TableCaption>Author's published book</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center" verticalAlign="middle">No.</Th>
                                    <Th textAlign="center" verticalAlign="middle">Title</Th>
                                    <Th textAlign="center" verticalAlign="middle">Word Count</Th>
                                    <Th textAlign="center" verticalAlign="middle">Duration</Th>
                                    <Th textAlign="center" verticalAlign="middle">Release Date</Th>
                                    <Th textAlign="center" verticalAlign="middle">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    dummyData.map((item) => (
                                        <Tr key={item.title}>
                                            <Td textAlign="center" verticalAlign="middle">{rowCount++}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.title}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.wordCount}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.duration}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.releaseDate}</Td>
                                            <Td textAlign="center" verticalAlign="middle">
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
                // This is delete modal
                isOpen={isDeleteModalOpen} onClose={closeDeleteModal} isCentered >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center" verticalAlign="middle">Delete Book</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody textAlign="center" verticalAlign="middle">
                            Are you sure you want to delete this book?
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
                isOpen={isAddModalOpen} onClose={closeAddModal} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center" verticalAlign="middle">Add Book</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex>
                                <FormControl marginRight="1rem">
                                    <FormLabel>Title</FormLabel>
                                    <Input placeholder='Title' type='text' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Word Count</FormLabel>
                                    <Input placeholder='Count' type='number' />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl marginRight="1rem">
                                    <FormLabel>Duration in minutes</FormLabel>
                                    <Input placeholder='Duration' type='number' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Release Date</FormLabel>
                                    <Input type='date' />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Genre</FormLabel>
                                <Input placeholder="Fiction, Education, etc" type='text' />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Synopsis</FormLabel>
                                <Textarea placeholder='Write your book synopsis here' size="sm" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Insert Book Cover Image</FormLabel>
                                <Input type="file" accept="image/*" />
                            </FormControl>
                            
                            <FormControl>
                                <FormLabel>Insert Book Audio</FormLabel>
                                <Input type="file" accept='audio/*' />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={closeAddModal} colorScheme='blue' mr={3}>
                                Save Book
                            </Button>
                            <Button onClick={closeAddModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </>
    )
};

export default BookList;