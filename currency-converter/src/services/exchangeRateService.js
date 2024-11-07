import axios from "axios";
import variables from "./envVariables"

//Fetch data from API

const baseUrl = variables.ApiUrl;

//Fetches the conversion results from the API for the given currencies and amount selected 
const exchangeRateService = async({from, to, amount}) => {

    try {
        const response = await axios.get(`${baseUrl}/${from}/${to}/${amount}`)
        return response.data
        
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
        
    }
}

export default exchangeRateService



