import React from 'react'
import CurrencySelector from '../components/CurrencySelector'
import Layout from '../components/Layout'


function Home() {

  return (
    <>
    {/*Home Page */}
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-blue-900'>
        <Layout>
        <div className='mx-auto mt-6 sm:mt-12 mb-2 w-fit font-medium text-center sm:text-2xl text-lg text-white pb-4 sm:pb-8 '>
            {/*Hero Piece*/}
            <p>Global Currency Conversions You Can Trust</p>
        </div>
        <CurrencySelector />
        </Layout>
    </div> 
    </>
  )
}

export default Home
