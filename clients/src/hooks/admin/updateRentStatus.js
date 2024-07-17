import { useState } from "react";
import useGetAlert from "../custom/getAlert";
import axios from "axios";

function useUpdateRentStatus(reloadTransactions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const VITE_API_RENT = import.meta.env.VITE_API_RENT_GENERATE
  const {alertTop} = useGetAlert()
  
  const updateRentStatus = async (rentId, status) => {
    console.log("🚀 ~ updateRentStatus ~ rentId:", rentId)
    console.log("🚀 ~ updateRentStatus ~ status:", status)
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${VITE_API_RENT}${rentId}`, status);
      if (!response.ok) {
        throw new Error("Failed to update rent status");
      }
      const data = await response.data;
      console.log("🚀 ~ updateRentStatus ~ data:", data)
      setLoading(false);
      // Recargar transacciones después de actualizar el estado
      if (reloadTransactions) {
        reloadTransactions();
      }
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  function deleteTransaction(id) {
    fetch(`${VITE_API_RENT}${id}`, {
      method: 'DELETE'
    })
      .then(response => { response.status < 300 ? alertTop('deleted Rent') : alertTop('cant delete the rent', 'error') })
      .catch(error => console.error(error))

  }


  return {
    updateRentStatus,
    loading,
    error,
    deleteTransaction
  };
};

export default useUpdateRentStatus;
