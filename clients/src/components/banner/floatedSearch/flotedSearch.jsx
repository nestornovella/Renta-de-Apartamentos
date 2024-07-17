import SearchButton from "./searchElements/searchButton";
import SearchLocation from "./searchElements/searchLocation";
import SearchPricingRange from "./searchElements/searchPricingRange";
import SearchProperty from "./searchElements/searchProperty";
import Transition from "../../complements/transition";
import { useEffect, useState } from "react";
import useGetAllCities from "../../../hooks/custom/getAllCities";

function FlotedSearch() {
  const {dispatchCities} = useGetAllCities()
  const [selected, setSelected] = useState(null)
  
  function handleSelected (e){
    setSelected(e)
  }

  return (
    <Transition className="absolute  z-[10] md:bottom-[0] left-0 right-0 md:w-[90%] xl:w-[75%] mx-auto">
      <div className="relative top-0 md:translate-y-1/2 bg-white flex gap-2 xl:gap-0 flex-col py-4 px-3 rounded-2xl   md:flex-row backdrop:blur shadow-light justify-around">
        <SearchLocation handleSelected={handleSelected} selected={selected}/>
        <SearchProperty handleSelected={handleSelected} selected={selected}/>
        <SearchPricingRange handleSelected={handleSelected} selected={selected}/>
        <SearchButton />
      </div>
    </Transition>
  );
}

export default FlotedSearch;
