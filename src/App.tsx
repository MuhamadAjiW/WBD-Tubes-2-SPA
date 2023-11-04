import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookList from './pages/Booklist'
import Playlist from './pages/Playlist'
import Subscriber from './pages/Subscriber'
import PlaylistDetails from './pages/PlaylistDetail'
import Login from './pages/Login'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/playlists" element={<Playlist />} />
              <Route path="/subscribers" element={<Subscriber />} />
              <Route path="/playlistdetails" element={<PlaylistDetails />} />
            </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
