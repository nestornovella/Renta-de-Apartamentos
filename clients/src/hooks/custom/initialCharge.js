import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";




function useInitialCharge() {

    const apartments = useSelector(store => store.apartment.cities)
    const cities = useSelector(store => store.apartment.apartments)

    const dispatch = useDispatch()
    
    function setApartments() {
        console.log('carga apartamentos')
        return axios.get(import.meta.env.VITE_API_USER_APARTMENT)
        .then(response => response.data)
        .then(response => response.status < 300 ? response.data : new Error('error de carga en apartments'))

    }

    function setCities() {
        console.log('carga ciudades')
        return axios.get(import.meta.env.VITE_API_USER_CITIES)
        .then(response => response.data)
        .then(response => response.status < 300 ? response.data : new Error('error de carga en cities'))
    }
    
    function firstChanrge() {
        setTimeout(()=>{
            console.log('carga inicializada')
            setApartments()
            .then(response => dispatch({type:'GET_ALL_APARTMENTS', payload:response}))
            .then(()=> setCities())
            .then(response => dispatch({type:'GET_ALL_CITIES', payload:response}))
            .then(()=> console.log('carga finalizada'))
            .catch(err => console.error('error en carga inicial: ',err))
        },1500)
        
    }

    return {
        firstChanrge

    };
}

export default useInitialCharge;