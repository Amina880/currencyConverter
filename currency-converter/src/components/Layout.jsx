import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

function Layout({children}) {

//Consistent layout for all pages; includes a nav, content, and a footer  
  return (
    <>
    <Nav />
    {children}
    <Footer />
      
    </>
  )
}

export default Layout
