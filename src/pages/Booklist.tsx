import React, {useEffect, useState} from 'react';
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
import { useCookies } from 'react-cookie';
import { REST_BASE_URL } from '../constants/constants';
import { toast } from "react-toastify";
import axios from 'axios';

interface IBookP {
    bookp_id: number;
    title: string;
    genre: string;
    synopsis: string;
    release_date: Date;
    word_count: number;
    duration: number;
    graphic_cntn: boolean;
    image_path: string;
    audio_path: string;
    author_id: number;
}

const BookList = () => {

    const [cookies, setCookie] = useCookies(['token']);
    const [bookPData, setBookPData] = useState<IBookP[]>([]);

    // Fetch Author Books
    const fetchBookP = async () => {

        const token = cookies.token;

        const response = await fetch(`${REST_BASE_URL}/books/author/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': token ?? "Bearer " + token,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`API request failed with status: ${response.status}`);
        } else {
            const data = await response.json();
            setBookPData(data.data)
        }
    }

    useEffect(() => {
        fetchBookP();
    }, [])

    let rowCount = 1;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [bookModalData, setBookModalData] = useState<IBookP | null>(null)

    // Function to open delete modal
    const openDeleteModal = (data) => {
        setIsDeleteModalOpen(true);
        setBookModalData(data)
    }

    // Function to close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    // Delete Book
    const deleteBook = async (bookp_id: number | null) => {
        try {
            const token = cookies.token;

            // Send a DELETE request to the server
            const response = await fetch(`${REST_BASE_URL}/books/${bookp_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token ?? "Bearer " + token,
                },
            });

            if (!response.ok) {
                console.error(`API request failed with status: ${response.status}`);
            } else {
                // Book deleted successfully, update the bookPData state
                setBookPData((prevData) => prevData.filter((item) => item.bookp_id !== bookp_id));
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    const [image, setImage] = useState("");
    const handleImage = async (file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            if (event.target && event.target.result) {
                var res = event.target.result.split(",")[1];
                setImage(res);
            }
        };
        reader.readAsDataURL(file);
    };

    const [audio, setAudio] = useState("");
    const handleAudio = async (file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            if (event.target && event.target.result) {
                var res = event.target.result.split(",")[1];
                setAudio(res);
            }
        };
        reader.readAsDataURL(file);
    };

    const [isModalOpen, setisModalOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [synopsis, setSynopsis] = useState("");
    const [word_count, setWordCount] = useState(0);
    const [release_date, setReleaseDate] = useState(new Date());
    const [graphic_cntn, setGraphicCntn] = useState(false);
    const [author_id, setAuthorId] = useState(1);

    const image_path = "";
    const audio_path = "";

    const [modalMode, setModalMode] = useState("add")
    
    // Function to open addmodal
    const openAddModal = () => {
        setisModalOpen(true)
        setModalMode("add")
        setTitle("");
        setGenre("");
        setSynopsis("");
        setWordCount(0);
        setDuration(0);
        setGraphicCntn(false);
        setReleaseDate(new Date());
        setImage("");
        setAudio("");
    }

    // Function to open edit modal
    const openEditModal = (item) => {
        setisModalOpen(true)
        setModalMode("edit")
        setTitle(item.title);
        setGenre(item.genre);
        setSynopsis(item.synopsis);
        setWordCount(item.word_count);
        setDuration(item.duration);
        setGraphicCntn(item.graphic_cntn);
        setReleaseDate(item.release_date);
    }

    // Function to close add/edit modal
    const closeModal = () => {
        setisModalOpen(false)
        setModalMode("add")
        setTitle("");
        setGenre("");
        setSynopsis("");
        setWordCount(0);
        setDuration(0);
        setGraphicCntn(false);
        setReleaseDate(new Date());
        setImage("");
        setAudio("");
    }

    const addBook = async () => {
        if (!title || !genre || !duration || !synopsis || !word_count || !release_date || !image || !audio) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        const body = {
            title,
            genre,
            duration,
            synopsis,
            word_count,
            release_date,
            image,
            audio,
            author_id,
            graphic_cntn,
            image_path,
            audio_path,
        };

        try {
            const token = cookies.token;
            const response = await fetch(`${REST_BASE_URL}/books`, {
                method: "POST",
                headers: {
                    'Authorization': token ?? "Bearer " + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                console.error(`API request failed with status: ${response.status}`);
                toast.error("Failed to add the book. Please try again.");
            } else {
                // Book added successfully, update the bookPData state
                const newData = await response.json();
                setBookPData((prevData) => [...prevData, newData.data]);
                toast.success("Book added successfully!");
                closeModal(); // Close the modal after successful addition
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
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
                                    bookPData.map((item) => (
                                        <Tr key={item.title}>
                                            <Td textAlign="center" verticalAlign="middle">{rowCount++}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.title}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.word_count}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.duration}</Td>
                                            <Td textAlign="center" verticalAlign="middle">{item.release_date.slice(0,10)}</Td>
                                            <Td textAlign="center" verticalAlign="middle">
                                                <IconButton
                                                    icon={<EditIcon />}
                                                    variant="outline"
                                                    colorScheme="teal"
                                                    mr={2}
                                                    onClick={() => {
                                                        openEditModal(item);
                                                    }}
                                                />
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    variant="outline"
                                                    colorScheme="red"
                                                    mr={2}
                                                    onClick={() => {
                                                        openDeleteModal(item)
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
                            Are you sure you want to delete {bookModalData?.title}?
                        </ModalBody>
                        <ModalFooter textAlign="center" verticalAlign="middle">
                            <Flex
                            flexDir="row"
                            alignItems="center"
                            w="100%"
                            >
                                <Button onClick={() => {
                                    deleteBook(bookModalData?.bookp_id);
                                    closeDeleteModal();}} style={{color: "white"}} backgroundColor="red.400" w="50%">Delete</Button>
                                <Button onClick={closeDeleteModal} style={{color: "white"}} backgroundColor="blue.100" ml={3} w="50%">Cancel</Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal
                // This is add modal
                isOpen={isModalOpen} onClose={closeModal} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center" verticalAlign="middle">{modalMode === "add" ? "Add Book" : "Edit Book"}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex>
                                <FormControl marginRight="1rem">
                                    <FormLabel>Title</FormLabel>
                                    <Input placeholder='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Word Count</FormLabel>
                                    <Input placeholder='Count' type='number' value={word_count} onChange={(e) => setWordCount(Number(e.target.value))}/>
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl marginRight="1rem">
                                    <FormLabel>Duration in minutes</FormLabel>
                                    <Input placeholder='Duration' type='number' value={duration} onChange={(e) => setDuration(Number(e.target.value))}/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Release Date</FormLabel>
                                    <Input type='date' />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Genre</FormLabel>
                                <Input placeholder="Fiction, Education, etc" type='text' value={genre} onChange={(e) => setGenre(e.target.value)}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Synopsis</FormLabel>
                                <Textarea placeholder='Write your book synopsis here' size="sm" value={synopsis} onChange={(e) => setSynopsis(e.target.value)}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Insert Book Cover Image</FormLabel>
                                <Input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files[0])}/>
                            </FormControl>
                            
                            <FormControl>
                                <FormLabel>Insert Book Audio</FormLabel>
                                <Input type="file" accept='audio/*' onChange={(e) => handleAudio(e.target.files[0])}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={modalMode === "add" ? addBook : closeModal} colorScheme='blue' mr={3}>
                                Save Book
                            </Button>
                            <Button onClick={() => {
                                closeModal();
                            }}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </>
    )
};

export default BookList;