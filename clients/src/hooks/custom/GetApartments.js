import { useDispatch, useSelector } from "react-redux";
import { getApatments, filterSelectedCity, getAllRentApartments } from "../../redux/actions/apartmentActions";
import axios from "axios";
import { useState } from "react";

function useGetApartments() {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartment.apartments);
  const [sliderData, setSliderData] = useState([])


  async function reIntent(callback, data, setState, intents = 5) {
    try {
      const data = await callback()
      console.log('intento de ejecucion:', intents)
      setState(data)

      setTimeout(() => {
        if (!data.length && intents > 0) {
          reIntent(callback, setState, data, intents - 1)
        }
      }, 1000)

    } catch (error) {
      console.error(error)
      setTimeout(() => {
        if (intents > 0) {
          reIntent(callback, setState, data, intents - 1)
          console.log('intento de ejecucion:', intents)
        }
      }, 1000)
      
    }
  }

  function resetApartmentsList() {
    dispatch(getApatments());
  }
  const length = apartments ? apartments.length : 8;

  function filterByCity(cityId) {
    dispatch(filterSelectedCity(cityId))
  }

  function filterByRent() {
    dispatch(getAllRentApartments())
  }

  function getApartments() {
    dispatch(getApatments())
  }

  //slider
  function getapartmentsToSlider() {
    return axios(import.meta.env.VITE_API_USER_APARTMENT)
      .then(response => response.data)
      .then(response => response.status < 300 && response.data)
  }

  function getAnApartment(id){
    return axios(import.meta.env.VITE_API_USER_APARTMENT)
    .then(response => response.data)
    .then(response => response.status < 300 && response.data)
    .then(response => response.find(ap => ap.id.includes(id)))
    .catch(error => console.error(error))
  }

  const setSlide =()=> reIntent(getapartmentsToSlider, sliderData, setSliderData)


  return {
    apartments,
    resetApartmentsList,
    length,
    filterByCity,
    getApartments,
    filterByRent,
    getapartmentsToSlider,
    setSlide,
    sliderData,
    getAnApartment
  };
}

export default useGetApartments;
