import axios from "axios";
import { useState } from "react";


function useAdminTransaction() {
    const [transactions, setTransactions] = useState([])
    const [detail, setDetail] = useState(null)

    function getDetail(id){
        setDetail(transactions.find(trans => trans.id.includes(id)))
    }

    function resetDetail(id){
        setDetail(null)
    }
    
    // traer las transacciones
    async function getTransactions (){
        try {
            const response = await axios.get(import.meta.env.VITE_API_GET_TRANSACTION + '?page=1');
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
        getDetail,
        detail,
        resetDetail
    };
}

export default useAdminTransaction;