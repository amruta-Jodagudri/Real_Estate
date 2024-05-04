import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import About from './Pages/About';
import CreateListings from './Pages/CreateListings';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

export default function App() {
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/create-listing' element={<CreateListings/>}/>
            </Route>
        </Routes>
      </Router>
    </div>
  )
}
