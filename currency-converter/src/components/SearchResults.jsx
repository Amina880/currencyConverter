import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import exchangeRateService from '../services/exchangeRateService';
import { LucideLoader } from 'lucide-react';
import FavouriteButton from './FavouriteButton';
import CurrencySelector from './CurrencySelector';

function SearchResults() {
    //Get the search/convert query from the url or local storage if persisting
    const location = useLocation();
    const convertParams = new URLSearchParams(location.search);
    const convertQuery = convertParams.get('s');
    const [baseCurrency, targetCurrency, amount] = convertQuery ? convertQuery.split('/'): [null, null, null];
    //State Management
    const [conversionResults, setConversionResults]= useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const getResults = async () => {
            setLoading(true);

            try {
                //Fetches the commad, and fixed decimal point conversion results using values from the convert query
                const response = await exchangeRateService({
                    from: baseCurrency, 
                    to: targetCurrency,
                    amount: amount
                })  
                const formattedResponse = {
                    ...response,
                    conversion_rate: parseFloat(response.conversion_rate).toFixed(2),
                    conversion_result: parseFloat(response.conversion_result).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                };
                //Updates conversion results to the fetched results
                setConversionResults(formattedResponse);            
            } catch (error) {
                //Error handling
                console.error('Error fetching converted amount:', error);
                setErrors('Unable to fetch converted currency results')
            }

            setLoading(false);
            
        }
        //Runs function and the useEffect hook runs when the component mounts for the first time or when base currency, target currency or amount changes
        getResults();
    },[baseCurrency, targetCurrency, amount])


    if(loading) return <LucideLoader color='white' className='animate-spin w-20 mx-auto my-auto h-fit ' />;
    if(errors) return <p className='text-white w-fit mx-auto h-fit my-auto text-center text-lg'>{errors}</p>
    if(!conversionResults) return <p>Sorry, we currently don't have a conversion rate for that currency. Please try again with a different currency selection.</p>


  return (
    <>
    {/*Header */}
    <div className='mx-auto mt-6 mb-4 w-fit font-medium text-center text-2xl text-white pb-4'>
        <p>Convert {parseFloat(amount).toLocaleString()}  {conversionResults.base_code} to {conversionResults.target_code}</p>
    </div>
    {/*Conversion Results */}
    <div className='w-11/12 sm:w-8/12 sm:px-8 sm:flex-grow-0  mx-auto justify-center bg-white dark:bg-slate-800 dark:text-white rounded-2xl px-3 pt-2 flex-grow mt-3 pb-5 '>
        <div className='flex justify-between '>
            <p className=' text-lg pt-6 font-normal pb-3'>{parseFloat(amount).toLocaleString()}  {conversionResults.base_code} = <br></br>  <span className='font-semibold text-3xl '>{conversionResults.conversion_result} {conversionResults.target_code}</span></p>
            <FavouriteButton />
        </div>
        <p className='font-light pt-0.5 dark:text-slate-200'>1 {conversionResults.base_code} = {conversionResults.conversion_rate} {conversionResults.target_code}</p>
        <p className='font-light py-1.5 dark:text-slate-200'>Last updated - {conversionResults.time_last_update_utc}</p>
    </div>
    <CurrencySelector/>
    
    </> 
  )
}

export default SearchResults


