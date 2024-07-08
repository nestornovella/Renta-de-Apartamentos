import useAdminTransaction from "../../../hooks/admin/adminTransaction";


const Factura = ({ transaction, onClose }) => {
  const { getTransactions } = useAdminTransaction();
  console.log("🚀 ~ Factura ~ getTransactions:", getTransactions)
  
  if (!transaction) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <button 
        onClick={onClose} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Close
      </button>
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <div className="space-y-4">
        <p><strong>Apartment Name:</strong> {transaction.Rent.Apartment.urbanizacion}</p>
        <p><strong>Price:</strong> {transaction.amount.price} {transaction.amount.exchange}</p>
        <p><strong>Start Date:</strong> {new Date(transaction.Rent.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(transaction.Rent.endDate).toLocaleDateString()}</p>
        <p><strong>Transport Service:</strong> {transaction.transportService ? 'Yes' : 'No'}</p>
        {transaction.otherDetails && Object.keys(transaction.otherDetails).map(key => (
          <p key={key}><strong>{key}:</strong> {transaction.otherDetails[key]}</p>
        ))}
      </div>
    </div>
  );
};

export default Factura;
