import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRating } from "../../redux/actions/apartmentActions";
import useGetApartments from "../../hooks/custom/GetApartments";



function RaitingPage() {
    const {calification, id} = useParams()
    const {getAnApartment} = useGetApartments()
    const [apartment, setApartment] = useState(null)

    useEffect(()=>{
        axios.put(`${import.meta.env.VITE_API_USER_APARTMENT}rating`, {id:id, rating:+calification})
        .then(response => response > 299 && alert('error en la calificacion'))
    },[])

    useEffect(()=>{
        getAnApartment(id)
        .then(response => setApartment(response))
    },[])

    return ( 
        <div>
            raiting calificado
            {
                apartment && 
                <img src={apartment.images[0]} alt="" />
            }
        </div>
     );
}

export default RaitingPage;