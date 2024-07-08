import SideSection from "../sideSection";
import Factura from "./factura";

function TransactionSideTwo({ detail, resetDetail }) {
  return (
    <SideSection>
      <div>
        <p className="text-gray-400 text-center">checked</p>
      </div>

      {detail ? (
        <Factura transaction={detail.id} onClose={resetDetail} />
      ) : (
        <h2 className="text-center text-gray-500">No transaction selected</h2>
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
