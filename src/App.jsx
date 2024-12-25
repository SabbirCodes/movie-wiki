import React from 'react'
import Home from './pages/Home'
import Favorites from './pages/Favorite'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { MovieProvider } from './context/MovieContext'


function App() {
  return (
    <MovieProvider>
    <>
    <div className='fixed top-0 left-0 w-full z-20'>
      <Navbar />
    </div>
    <main className='p-8 box-border w-[100%] flex flex-col'>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/favorites' element={<Favorites /> } />
      </Routes>
    </main>
    </>
    </MovieProvider>
  )
}

export default App