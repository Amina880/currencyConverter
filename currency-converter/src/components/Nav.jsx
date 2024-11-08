import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle';

function Nav() {
    //Toggling navbar
    const[ isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen)

  return (
    <>
    {/*Nav for larger screens */}
        <div className='hidden sm:flex sm:items-center sm:justify-between'>
            <Link to="/">
            <img className='w-20 sm:w-32' src="/images/currency-converter-favicon-color.png" alt='logo'/>
            </Link>
            <div className='sm:flex sm:justify-evenly w-1/3'>
                <Link to="/" className=' text-white'>Home</Link>
                <Link to="/favourites" className=' text-white'>Favourites</Link>
                <DarkModeToggle />
            </div>
        </div>

    {/*Nav for mobile screens */}
            <div className='sm:hidden flex justify-between'>
                <Link to="/">
                <img className='w-20' src="/images/currency-converter-favicon-color.png" alt='logo'/>
                </Link>
                <div className='flex justify-evenly w-1/2'>
                    <button onClick={toggleNav}>
                        {isOpen ? <X color='white' className='w-20' /> : <Menu color='white' className='w-20 '/>}
                    </button>
                    <DarkModeToggle className='w-20' />
                </div>
            </div>
            {/*Mobile Links */}
            {isOpen && (
                <div className='flex flex-col items-center justify-center w-full left-0 bg-white dark:bg-slate-800 dark:text-slate-100 space-y-4 h-screen underline underline-offset-4 decoration-1 decoration-slate-400 dark:decoration-white'>
                <Link to="/">Home</Link>
                <Link to="/favourites">Favourites</Link>
                </div>
            )}
        
      
    </>
  )
}

export default Nav
