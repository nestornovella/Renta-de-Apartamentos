import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRating } from "../../redux/actions/apartmentActions";
import useGetApartments from "../../hooks/custom/GetApartments";
import NavBar from "../header/navbar";
import Header from "../header/header";
import stars from '../../assets/stars.png'


function RaitingPage() {
    const { calification, id } = useParams()
    const { getAnApartment } = useGetApartments()
    const [apartment, setApartment] = useState(null)

    useEffect(() => {
        axios.put(`${import.meta.env.VITE_API_USER_APARTMENT}rating`, { id: id, rating: +calification })
            .then(response => response > 299 && alert('error en la calificacion'))
    }, [])

    useEffect(() => {
        getAnApartment(id)
            .then(response => setApartment(response))
    }, [])

    const translation = {
        1: '-translate-x-[390px]',
        2: '-translate-x-[300px]',
        3: '-translate-x-[200px]',
        4: '-translate-x-[110px]',
        5: '-translate-x-[35px]'
    }

    return (
        <div>
            <Header main={false} />
            {
                apartment &&
                <div className="flex flex-col justify-center items-center relative  ">
                    <h2>GRACIAS POR TU CALIFICACION</h2>
                    <div className="relative overflow-y-hidden">
                        <img className="w-[500px] h-[180px]" src={stars} alt="" />
                        <div className={`absolute w-[100%] h-[80px] top-[30px] -z-[1] bg-black ${translation[calification]}`} ></div>
                    </div>
                    <span className="text-gray-500 font-semibold py-2">{`has calificado ${apartment.urbanizacion}`}</span>
                    <div className="border-[7px] border-yellow-400 rounded-2xl h-[348px] relative">
                            <img className="w-[500px] rounded-lg relative " src={apartment.images[0]} alt="" />
                        <div  className="w-[103%] h-[104%] border-[2px] p-1  border-black rounded-2xl absolute top-0">

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default RaitingPage;