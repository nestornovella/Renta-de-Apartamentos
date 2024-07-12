import SideSection from "../sideSection";
import Factura from "./factura";


function SearchTranasaction() {
  return (
    <div className="px-2">
      <h2 className="text-center text-gray-500">Search a transaction:</h2>
      <div className="flex flex-col  justify-center mt-2">
        <label htmlFor="" className="text-gray-400 font-semibold">Search</label>
        <div className="flex gap-3">
          <input type="text" className="border rounded-lg p-2 w-full" />
          <button className="border rounded-lg bg-secondary hover:bg-black text-white cursor-pointer p-2">Search</button>
        </div>
        <div>
          <img src="https://cdn.pixabay.com/animation/2022/08/06/11/57/11-57-26-645_512.gif" alt="" />
        </div>
      </div>
    </div>
  )
}


function TransactionSideTwo({ detail, resetDetail }) {
  return (
    <SideSection>
      <div>
        <p className="text-gray-400 text-center mb-2">checked</p>
      </div>

      {detail ? (
        <div className="h-[660px]">
          <Factura transaction={detail} onClose={resetDetail} />
        </div>
      ) : (
        <SearchTranasaction />
      )}

      {/* {detail ? (
        <>
          <div onClick={resetDetail}>
            <h2 className="border bg-red-500 text-center rounded-lg text-white font-semibold p-2 m-2 hover:bg-black cursor-pointer">
              close
            </h2>
          </div>
          <div>
            <h2>{detail.id}</h2>
          </div>
        </>
      ) : (
        <>
          <h2>trabaja nestor</h2>
        </> 
      )}*/}

    </SideSection>
  );
}

export default TransactionSideTwo;
