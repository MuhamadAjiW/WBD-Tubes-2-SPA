import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookList from './pages/Booklist'
import Playlist from './pages/Playlist'
import Subscriber from './pages/Subscriber'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Flex>
          <Sidebar />
          <Flex flex="1" p="20px"> {/* Content container */}
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/playlists" element={<Playlist />} />
              <Route path="/subscribers" element={<Subscriber />} />
            </Routes>
          </Flex>
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
