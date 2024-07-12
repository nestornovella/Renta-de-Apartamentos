import axios from "axios";
import { useState } from "react";


function useAdminTransaction() {
    const [transactions, setTransactions] = useState([])
    const [transaccionesCopy, setTransactionsCopy] = useState([])
    const [detail, setDetail] = useState(null)

    function getDetail(id){
        setDetail(transactions.find(trans => trans.id.includes(id)))
    }

    function resetDetail(id){
        setDetail(null)
    }

    async function getTransactioByUrbanization(urbanizacion){
        try {
            const response = await axios.get(import.meta.env.VITE_API_GET_TRANSACTION + '?page=1');
            const response_1 = response.data;
            const response_2 = response_1.status < 300 && response_1.data;
            return setTransactions(response_2.filter(tr => tr.Rent.Apartment.urbanizacion.toLowerCase().includes(urbanizacion.toLowerCase())));
        } catch (err) {
            return console.error(err);
        }
    }
    
    // traer las transacciones
    async function getTransactions (){
        try {
            const response = await axios.get(import.meta.env.VITE_API_GET_TRANSACTION );
            const response_1 = response.data;
            const response_2 = response_1.status < 300 && response_1.data;
            return setTransactions(response_2);
        } catch (err) {
            return console.error(err);
        }
    }
    
    return {
        transactions,
        getTransactions,
        getTransactioByUrbanization,
        getDetail,
        detail,
        resetDetail
    };
}

export default useAdminTransaction;