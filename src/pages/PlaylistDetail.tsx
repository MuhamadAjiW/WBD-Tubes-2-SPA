import React, {useState} from "react";
import {
    Heading,
    Flex,
    IconButton,
    Box,
    Image,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react'

import { ArrowBackIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FiPlay } from "react-icons/fi";


const PlaylistDetails = () => {
    const navigate = useNavigate()

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

    const recommendedDummy = [
        {
            title: "Judul Buku 6",
            wordCount: 10000,
            duration: 40,
            releaseDate: "2023-10-20"
        },
        {
            title: "Judul Buku 7",
            wordCount: 2000,
            duration: 20,
            releaseDate: "2023-10-30"
        },
        {
            title: "Judul Buku 8",
            wordCount: 100,
            duration: 10,
            releaseDate: "2023-10-2"
        },
        {
            title: "Judul Buku 9",
            wordCount: 500,
            duration: 20,
            releaseDate: "2023-10-5"
        },
        {
            title: "Judul Buku 10",
            wordCount: 8000,
            duration: 40,
            releaseDate: "2023-10-26"
        }
    ]

    let rowCount = 1;

    let recommendedCount = 1;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Function to open delete modal
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }

    // Function to close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <>
            <Flex
            flexDir="column">
                <IconButton
                        icon={<ArrowBackIcon />}
                        variant="outline"
                        colorScheme="gray"
                        mr={2}
                        marginBottom="1rem"
                        w="10px"
                        onClick={() => {
                            navigate('/playlists')
                        }}
                />
                <Flex
                flexDir="row"
                marginBottom="1rem">
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' borderRadius="30px" boxSize="150px" marginRight="1rem"/>
                    <Flex
                    flexDir="column">
                        <Heading marginBottom="0.5rem">Playlist 1</Heading>
                        <Text marginBottom="0.5rem"
                        style={{ wordWrap: "break-word" }}
                        maxWidth="500px">
                            Playlist description
                        </Text>
                        <Text as="b">Author's name</Text>
                    </Flex>
                </Flex>

                <TableContainer>
                    <Table variant="striped" size="lg" w="145vh" colorScheme="gray">
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
                                                icon={<Icon as={FiPlay} />}
                                                variant="outline"
                                                colorScheme="teal"
                                                mr={2}
                                                onClick={() => {
                                                    
                                                }}
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                variant="outline"
                                                colorScheme="red"
                                                mr={2}
                                                onClick={() => {
                                                    openDeleteModal();
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

                <Heading size="md" marginTop="5rem" marginBottom="1rem">Books you can add to the playlist</Heading>

                <TableContainer>
                    <Table variant="striped" size="lg" w="145vh" colorScheme="gray">
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
                                recommendedDummy.map((item) => (
                                    <Tr key={item.title}>
                                        <Td textAlign="center" verticalAlign="middle">{recommendedCount++}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.title}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.wordCount}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.duration}</Td>
                                        <Td textAlign="center" verticalAlign="middle">{item.releaseDate}</Td>
                                        <Td textAlign="center" verticalAlign="middle">
                                            <IconButton
                                                icon={<AddIcon />}
                                                variant="outline"
                                                colorScheme="teal"
                                                mr={2}
                                                onClick={() => {
                                                // Handle the edit action
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
                        Are you sure you want to delete this book from the playlist?
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
        </>
    )
}

export default PlaylistDetails;