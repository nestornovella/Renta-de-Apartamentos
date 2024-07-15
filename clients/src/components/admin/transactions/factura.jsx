import { IoMdCloseCircle } from "react-icons/io";

const Factura = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className=" bg-white rounded-lg shadow-md w-full min-h-full  mx-auto p-5">
      <div className=" flex justify-end items-center">
        <IoMdCloseCircle onClick={onClose} className="bg-white rounded-full cursor-pointer size-6 hover:bg-red-500 mb-4"/>
      </div>
      <div className="text-center mb-6">
        <img
          src="https://res.cloudinary.com/dlwjdmlpx/image/upload/q_100/v1693939333/PROYECTO%20PROPIEDADES/logo_rent_yurhr6.png"
          alt="Company Logo"
          className="mx-auto h-24"
        />
        <h2 className="text-2xl font-semibold">Rental Invoice</h2>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Rent Detail</h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr>
              <td className="border-b p-2">Apartment Name</td>
              <td className="border-b p-2">{transaction.Rent.Apartment.urbanizacion}</td>
            </tr>
            <tr>
              <td className="border-b p-2">Price</td>
              <td className="border-b p-2">{transaction.Rent.Apartment.price}</td>
            </tr>
            <tr>
              <td className="border-b p-2">Start Date</td>
              <td className="border-b p-2">{new Date(transaction.Rent.startDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="border-b p-2">End Date</td>
              <td className="border-b p-2">{new Date(transaction.Rent.endDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="border-b p-2">Transport Service</td>
              <td className="border-b p-2">{transaction.servicesAmount ? 'Sí' : 'No'}</td>
            </tr>
            {transaction.otherDetails && Object.keys(transaction.otherDetails).map(key => (
              <tr key={key}>
                <td className="border-b p-2">{key}</td>
                <td className="border-b p-2">{transaction.otherDetails[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Factura;
