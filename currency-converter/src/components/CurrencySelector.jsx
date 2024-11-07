import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import currencyOptions from './currencyOptions'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function CurrencySelector() {
    const navigate = useNavigate();
    //Get the search/convert query from the url
    const location = useLocation();
    const convertParams = new URLSearchParams(location.search);
    const convertQuery = convertParams.get('s');
    const [baseFromQuery, targetFromQuery, amountFromQuery] = convertQuery ? convertQuery.split('/'): [null]

    //State Management
    const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(() => baseFromQuery 
        ? { value: baseFromQuery, label: baseFromQuery }
        :JSON.parse(localStorage.getItem('baseCurrency')) || null);
    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState(() => targetFromQuery 
        ? { value: targetFromQuery, label: targetFromQuery }
        :JSON.parse(localStorage.getItem('targetCurrency')) || null);
    const [amount, setAmount] = useState(amountFromQuery || localStorage.getItem('amount') || "")
    const [errors, setErrors] = useState({});

    useEffect(() => {
        //Updates local storage for persistency
        if(selectedBaseCurrency)localStorage.setItem('baseCurrency', JSON.stringify(selectedBaseCurrency));
        if(selectedTargetCurrency)localStorage.setItem('targetCurrency', JSON.stringify(selectedTargetCurrency));
        localStorage.setItem('amount', amount)
    }, [selectedBaseCurrency, selectedTargetCurrency, amount])

    const handleChange = (selectedOption1) => {
        //Updates selected currency and clears errors
        setSelectedBaseCurrency(selectedOption1);
        setErrors((prevErrors) => ({...prevErrors, baseCurrency: ""}))
    }
     const handleChange2 = (selectedOption2) => {
        //Updates selected currency and clears errors
        setSelectedTargetCurrency(selectedOption2);
        setErrors((prevErrors) => (({...prevErrors, targetCurrency: ""})))
    }
    const onConvert = (e) => {
        //Prevents default behaviour
        e.preventDefault();
        //Error handling
        let newErrors = {};

        if(!selectedBaseCurrency){
            newErrors.baseCurrency = "Please select a currency to convert from"
        }
        if(!selectedTargetCurrency){
            newErrors.targetCurrency = "Please select a currency to convert to"
        }
        if(!amount){
            newErrors.amount = "Please enter a valid amount"
        }
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        //Navigates to page with the specific conversion results for that query
        navigate(`/results?s=${selectedBaseCurrency.value}/${selectedTargetCurrency.value}/${amount}`)

    }


  return (
    <>
    {/*Form containing amount input and currency selectors */}
    <form onSubmit={onConvert} className='w-11/12 sm:w-8/12 mx-auto justify-center bg-white rounded-2xl px-6 pt-4 flex-grow mt-4 pb-5 sm:flex-grow-0 '>
        {/*Header conditionally rendered in Home page only */}
        {location.pathname === '/' && <h1 className='text-2xl sm:text-3xl sm:font-light font-light text-center py-2'>Currency Converter</h1>}
        <div className=' mt-6 sm:flex sm:justify-evenly sm:mx-auto sm:items-center sm:w-full sm:mt-3'>
            {/* Amount Input */}
            <div className='sm:flex sm:flex-col sm:h-[70px] sm:w-2/6 sm:mx-1'>
                <label htmlFor='amount' className='mt-4 sm:m-0 sm:text-lg font-normal'>Amount:</label>
                <input
                id='amount'
                className='w-full mx-auto sm:mx-0 border-slate-200 border-2 rounded p-4 sm:p-0 sm:h-[42px] font-shippori text-lg font-semibold'
                type='number'
                value={amount}
                placeholder='Enter amount'
                onChange={(e) => {
                    //Updates amount and clears errors
                    setAmount(e.target.value)
                    setErrors((prevErrors) => ({...prevErrors, amount:""}))
                }}
                required
                />
                {errors.amount && <p className='text-white w-fit mx-auto h-fit my-auto text-center text-lg'>{errors.amount}</p>}
            </div>
            {/* Base Currency Selector */}
            <div className='my-4 w-full mx-auto sm:mx-1 sm:w-2/6 '>
                <label className='sm:text-lg font-normal'>From:</label>
                <Select
                className='font-shippori text-lg '
                options={currencyOptions}
                value={selectedBaseCurrency}
                onChange={handleChange}
                placeholder= "Type to search..."
                isSearchable={true}
                isClearable={true}
                noOptionsMessage={() => "No currency found"}
                id='from'
                />
            </div>
            {errors.baseCurrency && <p className='text-red-400 text-sm'>{errors.baseCurrency}</p>}
            {/* Target Currency Selector */}
            <div className='my-4 w-full sm:w-2/6 mx-auto sm:mx-1'>
                <label className='sm:text-lg font-normal' >To:</label>
                <Select 
                className='font-shippori text-lg'
                options={currencyOptions}
                value={selectedTargetCurrency}
                onChange={handleChange2}
                placeholder= "Type to search..."
                isSearchable={true}
                isClearable={true}
                noOptionsMessage={() => "No currency found"}
                id='to'
                />
            </div>
            {errors.targetCurrency && <p className='text-red-400 text-sm'>{errors.targetCurrency}</p>}
        </div>
        <button className='my-4 items-center mx-auto w-full sm:w-44 sm:h-10 sm:my-2 sm:float-end p-2 hover:border-blue-300 bg-sky-500 hover:border-2 rounded-xl text-white' type='submit'>Convert</button>
    </form>
    </>
  )
}

export default CurrencySelector


