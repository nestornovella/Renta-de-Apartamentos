import { GrFormDown, GrFormUp } from "react-icons/gr";
import { MdOutlinePriceChange } from "react-icons/md";
import useOpenClose from "../../../../hooks/OpenCloseMenu";
import { parseToDollarsMoney } from "../../../../utils/parseMoney";
import { GoArrowSwitch } from "react-icons/go";
import { getApartmentsByPrice } from "../../../../redux/actions/apartmentActions";
import { useDispatch } from "react-redux";

function SearchPricingRange() {
  const { toogleOpen, openStatus } = useOpenClose();
  const dispatch = useDispatch();

  const handleRangeClick = (minPrice, maxPrice) => {
    if (openStatus) {
      dispatch(getApartmentsByPrice(minPrice, maxPrice));
    }
  };

  return (
    <div
      onClick={toogleOpen}
      className=" font-quicksand relative mb-2 md:mb-0 flex items-center gap-4 border-[1px] rounded-lg px-3 py-2 justify-between cursor-pointer"
    >
      <MdOutlinePriceChange />
      <div>
        <p>Select price range </p>
        <p className="md:text-[10px] xl:text-xs ">Select a range price</p>
      </div>
      <div>{openStatus ? <GrFormUp /> : <GrFormDown />}</div>
      {openStatus && (
        <div className="absolute top-[60px] py-3 px-2 bg-white text-secondary shadow-light w-full left-0 z-[50]">
          <div className="font-semibold flex p-1 hover:cursor-pointer text-start hover:bg-gray-300 text-gray-400 text-[15px]">
            <span
              onClick={() => handleRangeClick(4000000, 6000000)}
              className="cursor-pointer flex w-full justify-center items-center"
            >
              {parseToDollarsMoney(4000000)} <GoArrowSwitch className="mx-1" />{" "}
              {parseToDollarsMoney(6000000)}
            </span>
          </div>
          <div className="font-semibold flex p-1 hover:cursor-pointer text-start hover:bg-gray-300 text-gray-400 text-[15px]">
            <span
              onClick={() => handleRangeClick(6000000, 9000000)}
              className="cursor-pointer flex w-full justify-center items-center"
            >
              {parseToDollarsMoney(6000000)} <GoArrowSwitch className="mx-1" />{" "}
              {parseToDollarsMoney(9000000)}
            </span>
          </div>
          <div className="font-semibold flex p-1 hover:cursor-pointer text-start hover:bg-gray-300 text-gray-400 text-[15px]">
            <span
              onClick={() => handleRangeClick(9000000, 13000000)}
              className="cursor-pointer flex w-full justify-center items-center"
            >
              {parseToDollarsMoney(9000000)} <GoArrowSwitch className="mx-1" />{" "}
              {parseToDollarsMoney(13000000)}
            </span>
          </div>
          <div className="font-semibold flex p-1 hover:cursor-pointer text-start hover:bg-gray-300 text-gray-400 text-[15px]">
            <span
              onClick={() => handleRangeClick(13000000, 20000000)}
              className="cursor-pointer flex w-full justify-center items-center"
            >
              {parseToDollarsMoney(13000000)} <GoArrowSwitch className="mx-1" />{" "}
              {parseToDollarsMoney(20000000)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPricingRange;
