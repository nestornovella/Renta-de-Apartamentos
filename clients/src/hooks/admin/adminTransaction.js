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
    function getTransactions (){
        return axios.get(import.meta.env.VITE_API_GET_TRANSACTION+'?page=1')
        .then(response => response.data)
        .then(response => response.status < 300 && response.data)
        .then(response => setTransactions(response))
        .catch(err => console.error(err))
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