import React from 'react'
import Layout from '../components/Layout'
import FavouritesResult from '../components/FavouritesResult'

function Favourites() {
  return (
    <>
    {/*Favourites Page: Displays all the bookmarked currencies */}
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-blue-900'>
    <Layout>
        <FavouritesResult />
    </Layout>
    </div>
      
    </>
  )
}

export default Favourites
