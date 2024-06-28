import useGetApartments from "../../../../hooks/custom/GetApartments";
import { MdOutlineCleaningServices } from "react-icons/md";

function SearchButton() {
  const { resetApartmentsList } = useGetApartments()

  return (
    <div onClick={resetApartmentsList}
      className="relative text-orange-500  hover:text-white bg-black font-quicksand hover:bg-black mb-2 md:mb-0 flex flex-col items-center gap-1 px-5 md:px-5 border-[1px] rounded-2xl py-2 justify-center cursor-pointer shadow-xl"
    >
      <MdOutlineCleaningServices className=" text-[25px] rotate-[30deg]"/>
      <span className="text-[12px] text-white font-bold">Reset</span>
    </div>
  );
}

export default SearchButton;
