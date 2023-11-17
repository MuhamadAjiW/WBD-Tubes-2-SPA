import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
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
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import TopBar from "@components/TopBar";
import { useCookies } from "react-cookie";
import { REST_API_URL } from "@constants/constants";
import { toast } from "react-toastify";
import { IBookP } from "@utils/interfaces/IBookP";
import { getAccountID } from "@utils/AuthUtil";
import { fetchBookP } from "./BooklistUtil";

const BookList = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [bookPData, setBookPData] = useState<IBookP[]>([]);

  let rowCount = 1;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookModalData, setBookModalData] = useState<IBookP | null>(null);
  const [image, setImage] = useState("");
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setisModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState(0);
  const [synopsis, setSynopsis] = useState("");
  const [word_count, setWordCount] = useState(0);
  const [release_date, setReleaseDate] = useState(new Date());
  const [graphic_cntn, setGraphicCntn] = useState(false);
  const [author_id, setAuthorId] = useState(0);
  const [bookp_id, setBookPId] = useState(0);

  const image_path = "";
  const audio_path = "";

  // Function to open delete modal
  const openDeleteModal = (data) => {
    setIsDeleteModalOpen(true);
    setBookModalData(data);
  };

  // Function to close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  // Function to open addmodal
  const openAddModal = () => {
    setisModalOpen(true);
    setModalMode("add");
    setTitle("");
    setGenre("");
    setSynopsis("");
    setWordCount(0);
    setDuration(0);
    setGraphicCntn(false);
    setReleaseDate(new Date());
    setImage("");
    setAudio("");
  };

  // Function to open edit modal
  const openEditModal = (item) => {
    setisModalOpen(true);
    setModalMode("edit");
    setTitle(item.title);
    setGenre(item.genre);
    setSynopsis(item.synopsis);
    setWordCount(item.word_count);
    setDuration(item.duration);
    setGraphicCntn(item.graphic_cntn);
    setReleaseDate(item.release_date);
    setBookPId(item.bookp_id);
  };

  // Function to close add/edit modal
  const closeModal = () => {
    setisModalOpen(false);
    setModalMode("add");
    setTitle("");
    setGenre("");
    setSynopsis("");
    setWordCount(0);
    setDuration(0);
    setGraphicCntn(false);
    setReleaseDate(new Date());
    setImage("");
    setAudio("");
    setBookPId(0);
  };

  useEffect(() => {
    getAccountID(cookies.token).then((result) => {
      if (!result.valid) {
        removeCookie('token', {path:'/'});
        window.location.href = "/login";
        return;
      }
      setAuthorId(result.data);

      fetchBookP(result.data, cookies.token).then((authorBooks) => {
        console.log(authorBooks);
        if (authorBooks.valid) {
          setBookPData(authorBooks.data)
        }
      })
    })
  }, []);


  // Delete Book
  const deleteBook = async (bookp_id: number | null) => {
    try {
      const token = cookies.token;

      // Send a DELETE request to the server
      const response = await fetch(`${REST_API_URL}/books/${bookp_id}`, {
        method: "DELETE",
        headers: {
          ...(token && {"Authorization": `Bearer ${token}`}),
        },
      });

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
      } else {
        // Book deleted successfully, update the bookPData state
        setBookPData((prevData) =>
          prevData.filter((item) => item.bookp_id !== bookp_id)
        );
        toast.success("Book deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

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

  // Add book to rest
  const addBook = async () => {
    if (
      !title ||
      !genre ||
      !duration ||
      !synopsis ||
      !word_count ||
      !release_date ||
      !image ||
      !audio
    ) {
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
      const response = await fetch(`${REST_API_URL}/books`, {
        method: "POST",
        headers: {
          ...(token && {"Authorization": `Bearer ${token}`}),
          "Content-Type": "application/json",
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
      console.error("Error adding book:", error);
    }
  };

  const editBook = async () => {
    if (
      !title ||
      !genre ||
      !duration ||
      !synopsis ||
      !word_count ||
      !release_date
    ) {
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
      const response = await fetch(
        `${REST_API_URL}/books/` + String(bookp_id),
        {
          method: "PATCH",
          headers: {
            ...(token && {"Authorization": `Bearer ${token}`}),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
        toast.error("Failed to edit the book. Please try again.");
      } else {
        // Book edited successfully, update the bookPData state
        const newData = await response.json();

        // Find the index of the book in the state
        const index = bookPData.findIndex(
          (item) => item.bookp_id === newData.data.bookp_id
        );

        if (index !== -1) {
          // Update the specific book in the state
          setBookPData((prevData) => {
            const newDataArray = [...prevData];
            if (newDataArray[index]) {
              newDataArray[index] = newData.data;
            }
            return newDataArray;
          });
        }

        toast.success("Book edited successfully!");
        closeModal(); // Close the modal after successful addition
      }
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  return (
    <>
      <TopBar />
      <Flex flex="1" p="20px" flexDirection="column">
        <Flex flexDir="column">
          <Flex
            flex="1"
            p="20px"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ md: "space-between", base: "center" }}
            alignItems={{ base: "center", md: "flex-start" }}
            px={{ md: "10px", base: "10px" }}
          >
            <Heading as="h1" size="2xl">
              Books Management
            </Heading>
            <IconButton
              icon={<AddIcon />}
              variant="outline"
              colorScheme="green"
              mt={{ base: "2", md: "0" }}
              onClick={() => {
                openAddModal();
              }}
            />
          </Flex>
          <TableContainer overflowX="auto" mt="4">
            <Table variant="striped" size="sm" colorScheme="gray">
              <TableCaption>Author's published book</TableCaption>
              <Thead>
                <Tr>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    No.
                  </Th>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    Title
                  </Th>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    Word Count
                  </Th>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    Duration
                  </Th>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    Release Date
                  </Th>
                  <Th
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ padding: "4px", minWidth: 0 }}
                  >
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookPData.map((item) => (
                  <Tr key={item.title}>
                    <Td textAlign="center" verticalAlign="middle">
                      {rowCount++}
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
                      {item.release_date.slice(0, 10)}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align={{ base: "center", md: "initial" }}
                        justify="center"
                      >
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
                            openDeleteModal(item);
                          }}
                        />
                      </Flex>
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
              Are you sure you want to delete {bookModalData?.title}?
            </ModalBody>
            <ModalFooter textAlign="center" verticalAlign="middle">
              <Flex flexDir="row" alignItems="center" w="100%">
                <Button
                  onClick={() => {
                    deleteBook(bookModalData?.bookp_id);
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

        <Modal
          // This is add modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isCentered
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" verticalAlign="middle">
              {modalMode === "add" ? "Add Book" : "Edit Book"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <FormControl marginRight="1rem">
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Word Count</FormLabel>
                  <Input
                    placeholder="Count"
                    type="number"
                    value={word_count}
                    onChange={(e) => setWordCount(Number(e.target.value))}
                  />
                </FormControl>
              </Flex>
              <Flex>
                <FormControl marginRight="1rem">
                  <FormLabel>Duration in minutes</FormLabel>
                  <Input
                    placeholder="Duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Release Date</FormLabel>
                  <Input
                    type="date"
                    onChange={(e) => setReleaseDate(new Date(e.target.value))}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  placeholder="Fiction, Education, etc"
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Synopsis</FormLabel>
                <Textarea
                  placeholder="Write your book synopsis here"
                  size="sm"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Insert Book Cover Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Insert Book Audio</FormLabel>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleAudio(e.target.files[0])}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <input
                    type="checkbox"
                    id="graphicContentCheckbox"
                    checked={graphic_cntn}
                    onChange={(e) => setGraphicCntn(e.target.checked)}
                  />
                  <FormLabel htmlFor="graphicContentCheckbox" ml={2}>
                    Include Graphic Content
                  </FormLabel>
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={modalMode === "add" ? addBook : editBook}
                colorScheme="blue"
                mr={3}
              >
                Save Book
              </Button>
              <Button
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default BookList;
