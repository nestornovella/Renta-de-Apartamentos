import { LuAlertCircle } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { MdCloudDone, MdDeleteForever } from "react-icons/md";
import useUpdateRentStatus from "../../../hooks/admin/updateRentStatus";
import useGetAlert from "../../../hooks/custom/getAlert";
import { FaCcPaypal } from "react-icons/fa";
import boldImage from '../../../assets/BoldLogo.png'

function TransactionCard({ deleteTransaction, transaction, reloadTransactions, }) {
  const { status, User, Apartment, id } = transaction;
  const { alertTop } = useGetAlert()

  return (
    <div className="flex justify-between w-[500] items-center border p-2 rounded gap-2 font-quicksand md:px-5">
      <div className="flex flex-col items-center ">
        <div
          className={`size-[40px] rounded-full  ${status.includes("pending") ? "bg-yellow-500" : "bg-green-500"
            } flex items-center justify-center `}
        >
          {status.includes("pending") ? (
            <LuAlertCircle className="text-[100px] text-yellow-200" />
          ) : (
            <GrStatusGood className="text-[100px] text-green-200" />
          )}
        </div>
        <span className="text-xs text-center  text-gray-400">{status}</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          className="rounded-full size-[40px]"
          src={User.email && User.image}
          alt=""
        />
        <span className="text-xs text-center text-gray-400">{User.email}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img
          className="rounded-full size-[40px]"
          src={Apartment.id && Apartment.images[0]}
          alt=""
        />
        <span className="text-xs text-center text-gray-400">{Apartment.urbanizacion}</span>
      </div>
      {status.includes('pending') && <PendingPanel status={status} rentId={transaction.id} transactionId={id} deleteTransaction={deleteTransaction} reloadTransactions={reloadTransactions} />}
    </div>
  );
}

export default TransactionCard;

function PendingPanel({ rentId, reloadTransactions, deleteTransaction, transactionId, status }) {
  const { updateRentStatus, loading, error } = useUpdateRentStatus(reloadTransactions);
  const { alertTop } = useGetAlert()
  const handleUpdate = () => {
    updateRentStatus(rentId, "active")
      .then(() => {
        alertTop("Rent status updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alertTop("Failed to update rent status", "error");
      });
  };

  return (
    <div className="flex gap-3">
      <button onClick={handleUpdate} disabled={loading}>
        {
          <MdCloudDone className="text-[30px] text-black hover:text-green-500 transition-all delay-200 cursor-pointer hover:scale-125" />
        }
      </button>
      {
        status == 'pending' ?
          <button onClick={() => { deleteTransaction(transactionId) }}>
            {
              <MdDeleteForever className="text-[30px] text-black hover:text-red-500 transition-all delay-200 cursor-pointer hover:scale-125" />
            }
          </button>
          :

          status == "pendingPaypal"
            ?
            <button onClick={() => alertTop('!Esta peticion es de paypal, si se quiere eliminar debe ser aceptada y eliminada desde Set apartment status, El reintegro de dinero debe ser en forma manual!', 'warning', 10000)}>
              {
                <FaCcPaypal className="text-[30px] text-blue-600 hover:text-black transition-all delay-200 cursor-pointer hover:scale-125" />
              }
            </button>
            :
            <button onClick={() => alertTop('!Esta peticion es de Bold, si se quiere eliminar debe ser aceptada y eliminada desde Set apartment status, El reintegro de dinero debe ser en forma manual!', 'warning', 10000)}>
              {
               <div>
                <img className="w-[50px]" src={boldImage} alt="" />
               </div>
              }
            </button>
      }

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}


