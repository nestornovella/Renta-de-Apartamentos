import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRating } from "../../redux/actions/apartmentActions";
import useGetApartments from "../../hooks/custom/GetApartments";
import NavBar from "../header/navbar";
import Header from "../header/header";



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
            <Header main={false}/>
            {
                apartment && 
                <div className="flex flex-col justify-center items-center">
                    <h2>GRACIAS POR TU CALIFICACION</h2>
                    <img className="w-[500px]" src="https://static.vecteezy.com/system/resources/previews/005/991/098/non_2x/5-star-feedback-rate-us-service-satisfaction-rating-five-stars-vector.jpg" alt="" />
                    <img className="w-[500px] rounded-lg" src={apartment.images[0]} alt="" />
                </div>
            }
        </div>
     );
}

export default RaitingPage;