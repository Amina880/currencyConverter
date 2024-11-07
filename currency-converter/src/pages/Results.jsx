import React from 'react'
import SearchResults from '../components/searchResults'
import Layout from '../components/Layout'


function Results() {
  return (
    <>
    {/*Conversion Results Page: Displays the converted currencies */}
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-blue-900'>
    <Layout>
        <SearchResults />
    </Layout>
    </div>
    </>
  )
}

export default Results
