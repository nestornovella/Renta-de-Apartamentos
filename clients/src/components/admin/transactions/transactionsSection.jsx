import { useEffect } from "react";
import MainSection from "../mainSection";
import TransactionSideTwo from "./transactionSideTwo";
import TransactionSideOne from "./transactionsSideOne";
import useAdminTransaction from "../../../hooks/admin/adminTransaction";

function TransactionSection() {
  const { getTransactions, transactions, getDetail, detail, resetDetail } = useAdminTransaction();

  useEffect(() => {
    getTransactions();
  }, []);
  
  return (
    <MainSection>
      <TransactionSideOne
        getTransactions={transactions}
        getDetail={getDetail}
        transactions={transactions}
      />
      <TransactionSideTwo resetDetail={resetDetail} detail={detail} />
    </MainSection>
  );
}

export default TransactionSection;
