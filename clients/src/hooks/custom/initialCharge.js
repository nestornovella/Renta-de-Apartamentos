import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";




function useInitialCharge() {

    const apartments = useSelector(store => store.apartment.cities)
    const cities = useSelector(store => store.apartment.apartments)

    const dispatch = useDispatch()
    
    function setApartments() {
        return axios.get(import.meta.env.VITE_API_USER_APARTMENT)
        .then(response => response.data)
        .then(response => response.status < 300 && response.data)

    }

    function setCities() {
        
        return axios.get(import.meta.env.VITE_API_USER_CITIES)
        .then(response => response.data)
        .then(response => response.status < 300 && response.data)
    }
    
    function firstChanrge() {
        console.log('carga inicializada')
        setApartments()
        .then(response => dispatch({type:'GET_ALL_APARTMENTS', payload:response}))
        .then(()=> setCities())
        .then(response => dispatch({type:'GET_ALL_CITIES', payload:{data: response}}))
        .catch(err => console.error(err))
    }

    return {
        firstChanrge

    };
}

export default useInitialCharge;