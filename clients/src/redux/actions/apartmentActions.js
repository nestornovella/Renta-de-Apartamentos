import { actionTypes } from "./actionTypes";
import axios from "axios";

const VITE_API_USER_CITIES = import.meta.env.VITE_API_USER_CITIES //cities 
const VITE_API_USER_APARTMENT = import.meta.env.VITE_API_USER_APARTMENT //apartments
const VITE_API_RENT = import.meta.env.VITE_API_RENT // api backend
const productionHandler = {
  urlProduction: VITE_API_USER_APARTMENT,
  urlDevelopment: "http://localhost:3000/apartment",
};

//funcion apartamentos
export function getApatments() {
  return async (dispatch) => {
    try {
      const response = await axios.get(productionHandler.urlProduction)
      const parsed = await response.data
      dispatch({ type: actionTypes.GET_ALL_APARTMENTS, payload: parsed.data })
    } catch (error) {
      console.error(error)
    }
  };
}

export async function createAnApartment(apartment) {
  try {
    const response = await axios.post(productionHandler.urlProduction, apartment);
    const parseResponse = await response.data;
    return parseResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getAnAppatment(id) {
  try {
    const response = await axios.get(
      productionHandler.urlProduction + id
    );
    const apartment = await response.data;
    return apartment;
  } catch (error) {
    console.error(error);
  }
}

export function getAllCties() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        VITE_API_USER_CITIES
      );
      const data = await response.data.data;
      dispatch({ type: actionTypes.GET_ALL_CITIES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterSelectedCity(cityId) {
  return async function (dispatch) {

    try {
      const response = await axios.get(`${VITE_API_USER_APARTMENT}/city/${cityId}`)
      const data = await response.data
      dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: data })
    } catch (error) {
      console.error(error)
    }
  };
}

export function getAllRentApartments() {
  return (dispatch) => {
    fetch(VITE_API_RENT)
      .then((response) => response.json())
      .then(response => response.data)
      .then(response => response.filter(ap => ap.rentalType.includes('monthly')))
      .then((data) =>
        dispatch({ type: actionTypes.GET_ALL_RENT_APARTMENTS, payload: data })
      )
      .catch((error) => console.error(error));
  };
}

export function getAllDailyRentApartments() {
  return (dispatch) => {
    fetch(VITE_API_RENT)
      .then((response) => response.json())
      .then(response => response.data)
      .then(response => response.filter(ap => ap.rentalType.includes('daily')))
      .then((data) =>
        dispatch({ type: actionTypes.GET_ALL_DAILY_RENT_APARTMENTS, payload: data })
      )
      .catch((error) => console.error(error));
  };
}

export function getAllSaleApartments() {
  return async (dispatch) => {
    try {
      const apart = await axios.get(VITE_API_USER_APARTMENT + "sale")
      const data = await apart.data
      dispatch({ type: actionTypes.GET_ALL_SALE_APARTMENTS, payload: data })
    } catch (error) {
      console.error(error)
    }
  };
}

export function getApartmentsByPrice(minPrice, maxPrice) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${VITE_API_USER_APARTMENT}range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      dispatch({
        type: actionTypes.GET_APARTMENTS_BY_PRICE_RANGE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    payload: filters,
  };
}

export function getRatings(rating) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${VITE_API_USER_APARTMENT}rating/?rating=${rating}`);
      dispatch({
        type: actionTypes.GET_RATINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateRating(id, rating) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${VITE_API_USER_APARTMENT}rating`, {
        id,
        rating,
      });
    } catch (error) {
      console.error(error);
    }
  };
}