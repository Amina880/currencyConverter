import { LucideHeart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function FavouriteButton() {
  //Get the search/convert query from the url
  const location = useLocation();
  const convertParams = new URLSearchParams(location.search); //url after question mark
  const convertQuery = convertParams.get('s'); //url after 's'

  //State management
  const [faveCurrencies, setFaveCurrencies] = useState([]);
  const isFavourited = faveCurrencies.includes(convertQuery);

  useEffect(() => {
    //Get the fave currencies from local storage
    const storedFaves = JSON.parse(localStorage.getItem('favCurrencies')) || [];
    setFaveCurrencies(storedFaves);
  }, [])

  const onClick = () => {
    let updatedFaves;
    //Adds new convert query to fave currencies if not already favourited 
    if(!isFavourited){
      updatedFaves = [...faveCurrencies, convertQuery];
    } else {
      //Removes convert query from fave currencies if already favourited when clicked
      updatedFaves = faveCurrencies.filter(fave => fave != convertQuery)
    }
      //Updates fave currencies and local storage
      setFaveCurrencies(updatedFaves);
      localStorage.setItem('favCurrencies', JSON.stringify(updatedFaves))
  }

  return (
    <>
    {/*Favourite Button */}
    <div className='px-3 pt-5'>
      <button type='submit' onClick={onClick}>
        {/*If the convert query is already favourited, show red heart and if not, show black empty heart */}
        <LucideHeart color={isFavourited ? 'red' : 'black'} fill={isFavourited ? 'red' : 'none'} className='hover:fill-red-400 hover:stroke-red-400'/>
      </button>
    </div>
    </>
  )
}                                              

export default FavouriteButton


