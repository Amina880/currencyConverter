import { LucideMoon, LucideSun } from 'lucide-react';
import React from 'react'
import { useState, useEffect } from 'react';

function DarkModeToggle() {
    //State Management (default is light mode or false)
    const[darkMode, setDarkMode] = useState(false);

    //Runs once on mount to check if a dark mode preference exists from local storage
    useEffect(() => {
        const savedMode = localStorage.getItem('dark-mode') === 'true';
        setDarkMode(savedMode);
        //Adds dark mode class to the element if saved mode is true
        document.documentElement.classList.toggle('dark', savedMode)
    }, [])

    //Toggles dark mode and updates local storage
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('dark-mode', !darkMode);
        //Dark mode class is toggled in the element
        document.documentElement.classList.toggle('dark')
    }
  return (
    <>
    {/*Dark mode toggle button */}
    <button onClick={toggleDarkMode}>
        {darkMode ? <LucideSun color='white'/> : <LucideMoon color='white' />}
    </button>
      
    </>
  )
}

export default DarkModeToggle
