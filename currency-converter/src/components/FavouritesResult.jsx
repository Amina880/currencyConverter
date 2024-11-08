import React, { useEffect } from 'react'
import { useState } from 'react';
import exchangeRateService from '../services/exchangeRateService';
import { LucideArrowLeftRight, LucideLoader } from 'lucide-react';
import { Link } from 'react-router-dom';

function FavouritesResult() {

    //State Management
    const[currencyData, setCurrencyData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[errors, setErrors] = useState(null);
    //Gets stored favourited queries from local storage
    const storedQueries = JSON.parse(localStorage.getItem('favCurrencies')) || [];
    

    useEffect(() => {
        const getFaveCurrencies = async () => {
            setLoading(true);

            try {
                //Fetches the commad, and fixed decimal point conversion results for all favourited queries
                const fetchedCurrencies = await Promise.all(
                    storedQueries.map(async(query) => {
                        const [baseCurrency, targetCurrency, amount] = query.split('/');
                        const response = await exchangeRateService({
                            from: baseCurrency,
                            to: targetCurrency,
                            amount: amount
                        })
                        const formattedResponse = {
                            ...response,
                            amount:amount,
                            conversion_rate: parseFloat(response.conversion_rate).toFixed(2),
                            conversion_result:parseFloat(response.conversion_result).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        };
                        return formattedResponse;
                    })
                );
                //Updates currency data by setting its state to fetched currencies with no null values that may have failed to fetch
                setCurrencyData(fetchedCurrencies.filter(currencyD => currencyD != null))

            } catch (error) {
                //Error handling
                console.error('Error fetching favourite currency data', errors)
                setErrors('Unable to fetch bookmarked conversions')
            }
            setLoading(false);
            
        };
        //Runs the getFaveCurrencies function only when there are stored queries present
        if (storedQueries.length > 0){
            getFaveCurrencies();
        }
        //UseEffect runs only once when the component mounts
    }, [])

    if (loading) return <LucideLoader color='white' className='animate-spin w-20 mx-auto my-auto h-fit' />
    if (errors) return <p className='text-white w-fit mx-auto h-fit my-auto text-center text-lg'>{errors}</p>

  return (
    <>
    {/*Header */}
    <div className='mx-auto mt-6 mb-4 w-fit font-medium text-center text-2xl text-white pb-4'>
        <p>Bookmarked Conversions</p>
    </div>
    {/*Renders each query's conversion results only when currency data is not empty  */}
    {currencyData.length > 0 ? (
        <div className='w-11/12 sm:w-8/12 mx-auto justify-center bg-white dark:bg-slate-800 rounded-2xl px-3 sm:p-8 pt-4 flex-grow sm:flex-grow-0 mt-3 pb-5 sm:pb-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6'>
        {currencyData.map((currencyD, index) => (
            <Link 
            to={`/results?s=${currencyD.base_code}/${currencyD.target_code}/${currencyD.amount}`}
            key={index}
            >
                <div className='border-2 border-slate-200 rounded-md sm:rounded-lg hover:shadow-xl hover:scale-105 dark:bg-slate-300 dark:text-gray-900  ' key={index}> 
                    <div className='flex justify-center items-center my-2'>
                        <p className='font-medium text-xl'>{currencyD.base_code}</p>
                        <LucideArrowLeftRight className='mx-2' />
                        <p className='font-medium text-xl '>{currencyD.target_code}</p>
                    </div>
                    <div className='mx-auto text-center'>
                        <p className='font-light pb-3 '>{parseFloat(currencyD.amount).toLocaleString()} {currencyD.base_code} = <br></br> <span className='font-medium text-xl'> {currencyD.conversion_result} {currencyD.target_code}</span></p>
                        <p className='font-light pb-3'>1 {currencyD.base_code} = {currencyD.conversion_rate} {currencyD.target_code}</p>
                    </div>
                </div>
            </Link>
        ))}
        </div>
    ):
    <p className='text-white w-fit mx-auto h-fit my-auto text-center text-lg'>No bookmarked currency conversions yet</p>
    }
    </>
  )
}

export default FavouritesResult

