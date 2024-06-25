import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCties } from "../../redux/actions/apartmentActions";

function useGetAllCities() {

  const dispatch = useDispatch();
  const cities = useSelector((store) => store.apartment.cities);

  function getOneCity(cityId) {
    const city = cities.find((ct) => ct.id.includes(cityId));
    if (city) {
      return city;
    }
    return {city:null,barrio:null};
  }
  function dispatchCities(){
    setTimeout(()=>{
      dispatch(getAllCties());
    },100)
  }



  return {
    cities,
    getOneCity,
    dispatchCities
  };
}

export default useGetAllCities;
