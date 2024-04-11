import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Profile from './components/Profile'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/signOut' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
