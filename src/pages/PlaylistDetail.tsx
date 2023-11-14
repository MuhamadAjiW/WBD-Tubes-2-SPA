import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
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
} from "@chakra-ui/react";

import { ArrowBackIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useCookies } from "react-cookie";
import { AUDIO_BASE_URL, REST_BASE_URL } from "../constants/constants";

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

interface IPlaylistBook {
  bookp_id: number;
  playlist_id: number;
  bookp: IBookP;
}

interface IPlaylist {
  playlist_id: number;
  title: string;
  description: string;
  image_path: string;
  author_id: number;
}

interface IAuthor {
  author_id: number;
  bio: string;
  email: string;
  name: string;
  username: string;
}

const PlaylistDetails = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const [playlistData, setPlaylistData] = useState<IPlaylist>();
  const [playlistBooks, setPlaylistBooks] = useState<IPlaylistBook[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<IBookP[]>([]);
  const [authorData, setAuthorData] = useState<IAuthor | null>(null);
  const [playlist_id, setPlaylistId] = useState(0);
  const [bookToDelete, setBookToDelete] = useState(0);

  let rowCount = 1;

  let recommendedCount = 1;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open delete modal
  const openDeleteModal = (bookp_id) => {
    setIsDeleteModalOpen(true);
    setBookToDelete(bookp_id);
  };

  // Function to close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBookToDelete(0);
  };

  const { id } = useParams();
  const location = useLocation();
  const { playlist } = location.state || {};

  const fetchPlaylistBook = async () => {
    const token = cookies.token;

    const response = await fetch(
      `${REST_BASE_URL}/playlists/` + String(playlist.playlist_id) + "/books",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token ?? "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
    } else {
      const data = await response.json();

      console.log(data);
      setPlaylistData(data.playlistData);
      setPlaylistBooks(data.booksInPlaylist);
      setRecommendedBooks(data.recommendationBooks);
      setAuthorData(data.authorData);
      setPlaylistId(data.playlistData.playlist_id);

      console.log(data.booksInPlaylist);
    }
  };

  const addPlaylistBook = async (bookp_id) => {
    try {
      const token = cookies.token;

      const body = {
        bookp_id,
        playlist_id,
      };

      const response = await fetch(`${REST_BASE_URL}/playlists/${id}/books`, {
        method: "POST",
        headers: {
          Authorization: token ?? "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
      } else {
        // Handle success, maybe show a success message or close a modal
        console.log("Book added to playlist successfully");
        // Filter out the book from recommendedBooks

        fetchPlaylistBook(); // Refetch data after a successful addition
      }
    } catch (error) {
      console.error("Error adding book to playlist:", error);
    }
  };

  const deletePlaylistBook = async (bookp_id) => {
    try {
      const token = cookies.token;

      const body = {
        bookp_id,
        playlist_id,
      };

      const response = await fetch(`${REST_BASE_URL}/playlists/${id}/books`, {
        method: "DELETE",
        headers: {
          Authorization: token ?? "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
      } else {
        // Handle success, maybe show a success message or close a modal
        console.log("Book deleted from playlist successfully");
        // Filter out the book from recommendedBooks

        fetchPlaylistBook(); // Refetch data after a successful addition
      }
    } catch (error) {
      console.error("Error adding book to playlist:", error);
    }
  };

  useEffect(() => {
    fetchPlaylistBook();
  }, []);

  // State to manage the audio playback
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to handle audio play/pause
  const toggleAudio = (audioPath: string) => {
    if (isPlaying) {
      // Pause the audio
      audioRef.current!.pause();
    } else {
      // Start playing the audio
      setAudioSrc(audioPath);
      console.log(audioPath);
      audioRef.current!.play();
    }

    // Toggle the play state
    setIsPlaying(!isPlaying);
  };

  const audioPlayer = new Audio();

  useEffect(() => {
    // Set the audio source when it changes
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
    }
  }, [audioSrc]);

  return (
    <>
      <Sidebar />
      <Flex
        flex="1"
        p="20px"
        flexDirection="column"
        ml={{ base: "0", lg: "20%" }}
      >
        <Flex flexDir="column">
          <IconButton
            icon={<ArrowBackIcon />}
            variant="outline"
            colorScheme="gray"
            mr={2}
            marginBottom="1rem"
            w="10px"
            onClick={() => {
              navigate("/playlists");
            }}
          />
          <Flex flexDir="row" marginBottom="1rem">
            <Image
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              borderRadius="30px"
              boxSize="150px"
              marginRight="1rem"
            />
            <Flex flexDir="column">
              <Heading marginBottom="0.5rem">{playlist.title}</Heading>
              <Text
                marginBottom="0.5rem"
                style={{ wordWrap: "break-word" }}
                maxWidth="500px"
              >
                {playlist.description}
              </Text>
              <Text as="b">{authorData?.name}</Text>
            </Flex>
          </Flex>

          <TableContainer>
            <Table
              variant="striped"
              size="md"
              colorScheme="gray"
              overflowX="auto"
            >
              <Thead>
                <Tr>
                  <Th textAlign="center" verticalAlign="middle">
                    No.
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Title
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Word Count
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Duration
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Release Date
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {playlistBooks.map((item) => (
                  <Tr key={item.bookp.title}>
                    <Td textAlign="center" verticalAlign="middle">
                      {rowCount++}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.bookp.title}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.bookp.word_count}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.bookp.duration}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.bookp.release_date
                        ? new Date(item.bookp.release_date)
                            .toISOString()
                            .slice(0, 10)
                        : "No date available"}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <IconButton
                        icon={<Icon as={FiPlay} />}
                        variant="outline"
                        colorScheme="teal"
                        mr={2}
                        onClick={() => {
                          toggleAudio(
                            `${AUDIO_BASE_URL}${item.bookp.audio_path.slice(
                              17
                            )}`
                          );
                        }}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        variant="outline"
                        colorScheme="red"
                        mr={2}
                        onClick={() => {
                          openDeleteModal(item.bookp.bookp_id);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Heading size="md" marginTop="5rem" marginBottom="1rem">
            Books you can add to the playlist
          </Heading>

          <TableContainer>
            <Table
              variant="striped"
              size="md"
              colorScheme="gray"
              overflowX="auto"
            >
              <Thead>
                <Tr>
                  <Th textAlign="center" verticalAlign="middle">
                    No.
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Title
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Word Count
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Duration
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Release Date
                  </Th>
                  <Th textAlign="center" verticalAlign="middle">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recommendedBooks.map((item) => (
                  <Tr key={item.title}>
                    <Td textAlign="center" verticalAlign="middle">
                      {recommendedCount++}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.title}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.word_count}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.duration}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      {item.release_date
                        ? new Date(item.release_date).toISOString().slice(0, 10)
                        : "No date available"}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <IconButton
                        icon={<AddIcon />}
                        variant="outline"
                        colorScheme="teal"
                        mr={2}
                        onClick={() => {
                          addPlaylistBook(item.bookp_id);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Modal
          // This is delete modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" verticalAlign="middle">
              Delete Book
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign="center" verticalAlign="middle">
              Are you sure you want to delete this book from the playlist?
            </ModalBody>
            <ModalFooter textAlign="center" verticalAlign="middle">
              <Flex flexDir="row" alignItems="center" w="100%">
                <Button
                  onClick={() => {
                    deletePlaylistBook(bookToDelete);
                    closeDeleteModal();
                  }}
                  style={{ color: "white" }}
                  backgroundColor="red.400"
                  w="50%"
                >
                  Delete
                </Button>
                <Button
                  onClick={closeDeleteModal}
                  style={{ color: "white" }}
                  backgroundColor="blue.100"
                  ml={3}
                  w="50%"
                >
                  Cancel
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default PlaylistDetails;
