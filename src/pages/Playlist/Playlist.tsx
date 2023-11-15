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
  FormControl,
  Textarea,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon, AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TopBar from "@components/TopBar";
import { useCookies } from "react-cookie";
import { REST_BASE_URL } from "@constants/constants";
import { toast } from "react-toastify";
import { IPlaylist } from "@utils/interfaces/IPlaylist";

const Playlist = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [playlistData, setPlaylistData] = useState<IPlaylist[]>([]);

  const fetchPlaylist = async () => {
    const token = cookies.token;

    const response = await fetch(`${REST_BASE_URL}/playlists/author/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token ?? "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
    } else {
      const data = await response.json();
      setPlaylistData(data.data);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  // Function to open delete modal
  const openDeleteModal = (item) => {
    setIsDeleteModalOpen(true);
    setTitle(item.title);
    setPlaylistId(item.playlist_id);
  };

  // Function to close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTitle("");
    setPlaylistId(0);
  };

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const image_path = "";
  const [author_id, setAuthorId] = useState(1);
  const [playlist_id, setPlaylistId] = useState(0);
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

  // Add playlist to rest
  const addPlaylist = async () => {
    if (!title || !description || !image) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const body = {
      title,
      description,
      image_path,
      image,
      author_id,
    };

    try {
      const token = cookies.token;
      const response = await fetch(`${REST_BASE_URL}/playlists`, {
        method: "POST",
        headers: {
          Authorization: token ?? "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
        toast.error("Failed to add the playlist. Please try again.");
      } else {
        // Book added successfully, update the bookPData state
        const newData = await response.json();
        setPlaylistData((prevData) => [...prevData, newData.data]);
        toast.success("Playlist added successfully!");
        closeModal(); // Close the modal after successful addition
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  // Delete playlist
  const deletePlaylist = async (playlist_id: number) => {
    try {
      const token = cookies.token;

      // Send a DELETE request to the server
      const response = await fetch(
        `${REST_BASE_URL}/playlists/${playlist_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ?? "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
      } else {
        // Book deleted successfully, update the bookPData state
        setPlaylistData((prevData) =>
          prevData.filter((item) => item.playlist_id !== playlist_id)
        );
        toast.success("Playlist deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  // Edit playlist
  const editPlaylist = async () => {
    if (!title || !description) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const body = {
      title,
      description,
      image_path,
      image,
      author_id,
    };

    try {
      const token = cookies.token;
      const response = await fetch(
        `${REST_BASE_URL}/playlists/` + String(playlist_id),
        {
          method: "PATCH",
          headers: {
            Authorization: token ?? "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
        toast.error("Failed to edit the playlist. Please try again.");
      } else {
        // Book edited successfully, update the playlistData state
        const newData = await response.json();

        setPlaylistData((prevData) => {
          const newDataArray = prevData.map((item) =>
            item.playlist_id === newData.data.playlist_id ? newData.data : item
          );
          return newDataArray;
        });

        toast.success("Playlist edited successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error editing playlist:", error);
    }
  };

  // Function to open addmodal
  const openAddModal = () => {
    setisModalOpen(true);
    setModalMode("add");
    setTitle("");
    setDescription("");
  };

  // Function to open edit modal
  const openEditModal = (item) => {
    setisModalOpen(true);
    setModalMode("edit");
    setTitle(item.title);
    setDescription(item.description);
    setAuthorId(item.author_id);
    setPlaylistId(item.playlist_id);
  };

  // Function to close add/edit modal
  const closeModal = () => {
    setisModalOpen(false);
    setModalMode("add");
    setTitle("");
    setDescription("");
  };

  let rowCount = 1;

  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <Flex flex="1" p="20px" flexDirection="column">
        <Flex
          flex="1"
          p="20px"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ md: "space-between", base: "center" }}
          alignItems={{ base: "center", md: "flex-start" }}
          px={{ md: "10px", base: "10px" }}
        >
          <Heading as="h1" size="2xl" mt={{ base: "2", md: "0" }}>
            Playlists Management
          </Heading>
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
          <Table variant="striped" size="md" colorScheme="gray">
            <TableCaption>Author's playlists</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center" verticalAlign="middle">
                  No.
                </Th>
                <Th textAlign="center" verticalAlign="middle">
                  Title
                </Th>
                <Th textAlign="center" verticalAlign="middle">
                  Description
                </Th>
                <Th textAlign="center" verticalAlign="middle">
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {playlistData.map((item) => (
                <Tr key={item.title}>
                  <Td textAlign="center" verticalAlign="middle">
                    {rowCount++}
                  </Td>
                  <Td textAlign="center" verticalAlign="middle">
                    {item.title}
                  </Td>
                  <Td textAlign="center" verticalAlign="middle">
                    {item.description}
                  </Td>
                  <Td textAlign="center" verticalAlign="middle">
                    <Flex align="center" justify="center">
                      <IconButton
                        icon={<ViewIcon />}
                        variant="outline"
                        colorScheme="blue"
                        mr={2}
                        onClick={() => {
                          navigate(`/playlistdetails/${item.playlist_id}`, {
                            state: { playlist: item },
                          });
                        }}
                      />
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

        <Modal
          //This is delete modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" verticalAlign="middle">
              Delete Playlist
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign="center" verticalAlign="middle">
              Are you sure you want to delete {title}?
            </ModalBody>
            <ModalFooter textAlign="center" verticalAlign="middle">
              <Flex flexDir="row" alignItems="center" w="100%">
                <Button
                  onClick={() => {
                    deletePlaylist(playlist_id);
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
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" verticalAlign="middle">
              {modalMode === "add" ? "Add Playlist" : "Edit Playlist"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Your playlist description"
                  size="sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Insert Playlist Cover Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={modalMode === "add" ? addPlaylist : editPlaylist}
                colorScheme="blue"
                mr={3}
              >
                Save Playlist
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Playlist;
