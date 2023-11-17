import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RequireAuth, RequireNoAuth } from "@utils/AuthUtil";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import BookList from "@pages/Booklist/Booklist";
import Playlist from "@pages/Playlist/Playlist";
import Subscriber from "@pages/Subscriber/Subscriber";
import PlaylistDetails from "@pages/PlaylistDetail/PlaylistDetail";
import NotFound from "@pages/Error/NotFound";
import Home from "@pages/Home/Home";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<RequireNoAuth element={<Login />} />} />
          <Route
            path="/login"
            element={<RequireNoAuth element={<Login />} />}
          />
          <Route
            path="/register"
            element={<RequireNoAuth element={<Register />} />}
          />
          {/* Protected */}
          <Route path="/home" element={<RequireAuth element={<Home />} />} />
          <Route
            path="/books"
            element={<RequireAuth element={<BookList />} />}
          />
          <Route
            path="/playlists"
            element={<RequireAuth element={<Playlist />} />}
          />
          <Route
            path="/subscribers"
            element={<RequireAuth element={<Subscriber />} />}
          />
          <Route
            path="/playlistdetails/:id"
            element={<RequireAuth element={<PlaylistDetails />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
