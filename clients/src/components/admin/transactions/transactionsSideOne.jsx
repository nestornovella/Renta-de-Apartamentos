import SideSection from "../sideSection";
import { FaFileInvoiceDollar } from "react-icons/fa6";

function TransactionSideOne({ getTransactions, transactions, getDetail }) {
  return (
    <SideSection>
      <div>
        <p className="text-gray-400 text-center mb-2">to check</p>
      </div>

      {transactions &&
        transactions.length > 0 &&
        transactions.map((trans) => {
          return <CardTransaction getDetail={getDetail} transaction={trans} />;
        })}
    </SideSection>
  );
}

export default TransactionSideOne;

// CARD TRANSACTION

function CardTransaction({ transaction, getDetail }) {
  return (
    <div className="flex justify-between w-[500] items-center border p-2 rounded gap-2 font-quicksand md:px-5">
      <div className="flex flex-col items-center w-full ">
        {transaction.User && (
          <div className="flex justify-between   w-full ">
            <div className="overflow-hidden rounded-full size-[35px]">
              <img src={transaction.User.image} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <span>User:</span>
              <p className="w-[140px] break-words">{`${transaction.User.email}`}</p>
            </div>
            <div
              className="flex flex-col items-center o
                         text-xs text-gray-400 w-[140px]"
            >
              <span>Urbanization:</span>
              <span>{`${transaction.Rent.Apartment.urbanizacion}`}</span>
            </div>
            <div
              onClick={() => getDetail(transaction.id)}
              className="flex size-11 flex-col justify-center items-center p-1 border rounded-lg text-blue-400 hover:text-white hover:bg-black cursor-pointer"
            >
              <button>
                <FaFileInvoiceDollar className="" />
              </button>
              <span className="text-xs text-gray-400 hover:text-white ">
                Detail
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
