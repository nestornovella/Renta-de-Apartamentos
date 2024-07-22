import { useState } from "react";
import useGetAlert from "../custom/getAlert";

function useAdminRent() {
  const [transactions, setTransactions] = useState({
    pending: [],
    active: [],
  });
  const [loading, setLoading] = useState(false);
  const VITE_API_RENT = import.meta.env.VITE_API_RENT_GENERATE
  const {alertTop} = useGetAlert()
  function getTransactions() {
    setLoading(true);
    fetch(VITE_API_RENT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) =>
        setTransactions({
          pending: response.data.filter((tr) => tr.status.includes("pending") || tr.status.includes("pendingPayPal")),
          active: response.data.filter((tr) => tr.status.includes("active")),
        })
      )

      .finally(() => setLoading(false))
      .catch((error) => console.error(error));
  }

  function okStatus() {
    getTransactions();
    alertTop("deleted rent");
  }

  function deleteTransaction(id) {
    fetch(`${VITE_API_RENT}${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.status < 300 ? okStatus() : alertTop("cant delete the rent", 'error');
      })
      .catch((error) => console.error(error));
  }
  
  return {
    getTransactions,
    transactions,
    deleteTransaction,
    loading,
  };
}

export default useAdminRent;
