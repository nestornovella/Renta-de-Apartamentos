import { useState } from "react";
import useAuth0GetData from "./auth0getinData";
import axios from "axios";
import useGetAlert from "./getAlert";

function useGenerateRent(input, errors, validate) {
  const { controledUser } = useAuth0GetData()
  const {alertTop} = useGetAlert()
  const [inputRent, setInputRent] = useState({
    name: "",
    email: "",
    consult: "",
    startDate: "",
    endDate: "",
    id: "" //apartmentId
  })


  function setInput(input) {
    setInputRent(input)
  }

  function generateRent(rentalType, status) {
    const parsedInput = {
      apartmentId: input.id,
      userId: input.email,
      startDate: input.startDate,
      endDate: input.endDate,
      services: input.services
    }

    const minDates = new Date(parsedInput.startDate)
    minDates.setMonth(minDates.getMonth() + 1)

    if (parsedInput.endDate >= minDates || rentalType == 'daily') {
      if (status) parsedInput.status = status
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
            return response.data
          })
      } else {
        alertTop("Please fill out all required fields before submitting your rent", 'warning');
        validate(input)
        return
      }
    } else {
      alertTop('the rent must be between one and one month', 'warning')
    }
  }
  //falta terminar de hacer
  // function payment(rentalType) {
  //   generateRent(rentalType, 'pendingPayPal')
  //     .then(response => axios(`${import.meta.env.VITE_API_CREATE_ORDER}${response.id}`))
  //     .then(response => window.location.href = response.data)
  // }
  function payment(rentalType) {
    generateRent(rentalType, 'pending')
      .then(response => {
        console.log(response.id)
        return response
      })
      .then(response => axios.post(`${import.meta.env.VITE_API_RENT_GENERATE}boldlink`,{rentId: response.id}))
      .then(response => {
        console.log(response)
        return response
      })
      .then(response => window.location.href = response.data.data)
  }
  
  return {
    generateRent,
    setInputRent,
    setInput,
    payment
  };
}

export default useGenerateRent;
