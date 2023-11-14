import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/Booklist";
import Playlist from "./pages/Playlist";
import Subscriber from "./pages/Subscriber";
import PlaylistDetails from "./pages/PlaylistDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RequireAuth, RequireNoAuth } from "./middlewares/AuthMiddleware";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected */}
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/subscribers" element={<Subscriber />} />
          <Route path="/playlistdetails/:id" element={<PlaylistDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
