import axios from "axios";
import { useState } from "react";
import useGetAllCities from "../custom/getAllCities";



function useCities() {
    
    const [input, setInput] = useState({
        city:'',
        barrio:''
    })

    const {dispatchCities} = useGetAllCities()
    
    function handleCity(e){
        setInput(
            prev => {return {...prev, [e.target.name] : e.target.value}}
        )
    }

    function submitCity(){
        return axios.post(import.meta.env.VITE_API_USER_CITIES, input)
        .then(response => response.data.status < 300 && dispatchCities())
        .catch(error => console.error(error))
    }

    
    return {
        input,
        handleCity,
        submitCity
    };
}

export default useCities;