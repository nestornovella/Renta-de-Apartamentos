import { GrLocation, GrFormDown, GrFormUp } from "react-icons/gr";
import useOpenClose from "../../../../hooks/custom/OpenCloseMenu";
import useGetApartments from "../../../../hooks/custom/GetApartments";
import useGetAllCities from "../../../../hooks/custom/getAllCities";
import { FaMapMarkedAlt } from "react-icons/fa";

function SearchLocation({handleSelected, selected}) {
  const {filterByCity} = useGetApartments();
  const {cities} = useGetAllCities();
  const handleCitySelect = (cityId) => {
    filterByCity(cityId);
  };

  return (
    <div
      onClick={() => handleSelected(selected == 'location' ? null : 'location')}
      className=" font-quicksand relative mb-2 px-3 py-2 md:mb-0 flex items-center gap-4 border-[1px] rounded-lg   justify-between cursor-pointer shadow-xl"
    >
      <GrLocation />
      <div>
        <p className="md:text-sm ">Fiter by location</p>
        <p className="md:text-[10px] xl:text-xs ">
          Select a location in medellin
        </p>
      </div>
      {selected == 'location' ? <GrFormUp /> : <GrFormDown />}
      <div className={`${selected == 'location' ? "absolute  z-[110]" : "hidden"}  rounded-sm  bg-white w-full left-0 top-[60px] border `}>
        {cities && cities.map((e, i) => {
          return (
                
            <div onClick={() => handleCitySelect(e.id)}  key={i} className="p-2 hover:cursor-pointer text-start hover:bg-gray-300 text-gray-400 text-[13px] flex justify-between gap-1"> 
            
              <div
                key={e.id}
                value={e.id}
              >{`${e.city} - ${e.barrio}`}</div>

              <FaMapMarkedAlt className="w-[15px] h-[15px] text-green-500"/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchLocation;
