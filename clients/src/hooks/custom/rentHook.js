import { useState } from "react";
import useAuth0GetData from "./auth0getinData";
import axios from "axios";
import useUpdateRentStatus from "../admin/updateRentStatus";

function useGenerateRent(input, errors, validate) {
  //apartmentId, userId, startDate, endDate
  const { controledUser } = useAuth0GetData()
  const [inputRent, setInputRent] = useState({
    name: "",
    email: "",
    consult: "",
    startDate: "",
    endDate: "",
    id: "" //apartmentId
  })

  const {updateRentStatus} = useUpdateRentStatus()
  function setInput(input) {
    setInputRent(input)
  }

  function generateRent(status) {
    const parsedInput = {
      apartmentId: input.id,
      userId: input.email,
      startDate: input.startDate,
      endDate: input.endDate
    }
    if(status) parsedInput.status = status
    console.log("🚀 ~ generateRent ~ parsedInput:", parsedInput)

    if (!errors.endDate && !errors.startDate && errors.blocked == false) {
      return fetch(import.meta.env.VITE_API_RENT_GENERATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      })
        .then((response) => response.json())
        .then(response => { 
          response.status < 300 
          console.log(response.data)
          return response.data
          // ? 
          // //alert('se ha generado una peticion de renta, sera evaluada en las proximas horas')  
          // : 
          // alert('la peticion de renta no se pudo realizar pongase en contacto con el administrador') 
          
        })
        .catch(error => console.error(error));
    } else {
      alert("Please fill out all required fields before submitting your rent");
      validate(input)
      return
    }
  }
  //falta terminar de hacer
  function payment (){
    generateRent() 
    .then(response => axios(`${import.meta.env.VITE_API_CREATE_ORDER}${response.id}`))
    .then(response => window.location.href = response.data)
  }
  return {
    generateRent, 
    setInputRent,
    setInput,
    payment
  };
}

export default useGenerateRent;
