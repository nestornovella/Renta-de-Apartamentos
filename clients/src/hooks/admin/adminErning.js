import axios from "axios";
import { useState } from "react";


function useGetErning() {
    const [earning, setEarning] = useState([])
  
    function fetchingYear(year) {
        return axios.get(`${import.meta.env.VITE_API_RENT_GENERATE}earnings?year=${year}`)
        //return axios.get(`${'http://localhost:3000/rent/'}earnings?year=${year}`)
            .then(response => response.data)
            .then(response => response.status < 300 && response.data)
            .then(response => setEarning(response))
            .catch(err => console.error(err))
    }

    
    return {
        fetchingYear,
        earning,
        
    };
}

export default useGetErning;