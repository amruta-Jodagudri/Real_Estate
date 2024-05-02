import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
    const {currentUser} = useSelector((state)=>state.user)
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className="flex justify-between item-center max-w-6xl mx-auto p-3">
                <Link to='/' className='font-bold text-sm sm:text-3xl flex flex-wrap mt-1'>
                    <span className='text-slate-500'>Ams</span>
                    <span className='text-slate-700'>Estate</span>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex gap-4 pt-4 text-center'>
                    <Link to='/'>
                        <li className='hidden text-xl sm:inline font-bold text-slate-700 hover:underline'>
                        Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden text-xl sm:inline font-bold text-slate-700 hover:underline'>
                        About
                        </li>
                    </Link>
                    <Link to='/signIn'>
                        {currentUser ? (
                        <Link to='/profile'>
                            <img
                            className='rounded-full h-10 w-10 object-cover'
                            src={currentUser.avatar}
                            alt='profile'/>
                        </Link>
                        ) : (
                        <li className=' text-slate-700 text-xl font-bold hover:underline'> Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}



//--------------poor Stylling----------------
// import React, { useState } from 'react';
// import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// export default function Header() {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     return (
//         <header className='bg-slate-200 shadow-md'>
//             <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
//                 <Link to='/' className='font-bold text-sm sm:text-3xl flex flex-wrap mt-1'>
//                     <span className='text-slate-500'>Ams</span>
//                     <span className='text-slate-700'>Estate</span>
//                 </Link>
//                 <div className="relative">
//                     {/* Show search bar or search icon based on screen size */}
//                     <div className='hidden sm:flex bg-slate-100 p-3 rounded-lg flex items-center'>
//                         <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
//                         <FaSearch className='text-slate-600'/>
//                     </div>
//                     <FaSearch className='sm:hidden text-xl cursor-pointer text-slate-600' onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
//                 </div>

//                 {/* Hamburger menu for mobile view */}
//                 <FaBars className='sm:hidden text-2xl cursor-pointer text-slate-700' onClick={() => setIsDropdownOpen(!isDropdownOpen)} />

//                 {/* Dropdown menu */}
//                 <ul className={`absolute top-14 right-3 bg-white shadow-lg rounded-lg p-3 z-10 ${isDropdownOpen ? 'block' : 'hidden'} sm:flex sm:static sm:shadow-none sm:bg-transparent sm:rounded-none`}>
//                     <li className='block sm:hidden'>
//                         <FaTimes className='text-xl cursor-pointer' onClick={() => setIsDropdownOpen(false)} />
//                     </li>
//                     <Link to='/'><li className='block sm:inline text-slate-700 hover:underline'>Home</li></Link>
//                     <Link to='/about'><li className='block sm:inline text-slate-700 hover:underline'>About</li></Link>
//                     <Link to='/signIn'><li className='block sm:inline text-slate-700 hover:underline'>Sign In</li></Link>
//                 </ul>
//             </div>
//         </header>
//     );
// }



// -----------Styyling to search bar only-------------
// import React, { useState } from 'react';
// import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// export default function Header() {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     return (
//         <header className='bg-slate-200 shadow-md'>
//             <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
//                 <Link to='/' className='font-bold text-2xl flex items-center'>
//                     <span className='text-slate-500'>Ams</span>
//                     <span className='text-slate-700'>Estate</span>
//                 </Link>

//                 {/* Search Bar and Icons */}
//                 <div className='flex items-center gap-4'>
//                     {/* Desktop search bar */}
//                     <div className='hidden sm:flex bg-slate-100 p-2 rounded-lg'>
//                         <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-40 sm:w-64'/>
//                         <FaSearch className='text-slate-600 ml-2'/>
//                     </div>

//                     {/* Mobile search icon */}
//                     <FaSearch
//                         className='sm:hidden text-2xl text-slate-600 cursor-pointer'
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     />

//                     {/* Hamburger menu icon */}
//                     <FaBars
//                         className='sm:hidden text-2xl text-slate-700 cursor-pointer'
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     />
//                 </div>

//                 {/* Dropdown menu */}
//                 <ul className={`absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-10 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'block' : 'hidden'} sm:flex sm:static sm:shadow-none sm:bg-transparent sm:p-0`}>
//                     {/* Close icon for mobile dropdown */}
//                     <li className='block sm:hidden'>
//                         <FaTimes className='text-2xl text-slate-700 cursor-pointer mb-4' onClick={() => setIsDropdownOpen(false)} />
//                     </li>
//                     <Link to='/'><li className='block sm:inline text-slate-700 hover:underline p-2 sm:p-0'>Home</li></Link>
//                     <Link to='/about'><li className='block sm:inline text-slate-700 hover:underline p-2 sm:p-0'>About</li></Link>
//                     <Link to='/signIn'><li className='block sm:inline text-slate-700 hover:underline p-2 sm:p-0'>Sign In</li></Link>
//                 </ul>
//             </div>
//         </header>
//     );
// }

