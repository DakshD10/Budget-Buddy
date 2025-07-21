import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTransaction,
  fetchTransactions,
} from "../Features/Transaction/AddTransSlice";
import { useAuth } from "../Authentication/AuthContext";
import styles from "./TransactionHistory.module.css"; // style file
import { MdDelete } from "react-icons/md";
import EditTransaction from "../Components/EditTransaction";
import { FaEdit } from "react-icons/fa";


const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { list: transactions, status } = useSelector(
    (state) => state.transactions
  );
const [editingTxn, setEditingTxn] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTransactions(user.uid));
    }
  }, [user, dispatch]);

  const handleDelete = (transactonid) => {
  if (user?.uid && transactonid) {
    dispatch(DeleteTransaction({ uid: user.uid, transactonid }))
      .then(() => {
        dispatch(fetchTransactions(user.uid));
      });
  }
};

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>Transaction History</h2>

      {status === "loading" ? (
        <p className={styles.loadingText}>Loading transactions...</p>
      ) : (
        <ul className={styles.transactionList}>
          {transactions.length === 0 ? (
            <p className={styles.emptyState}>No transactions found.</p>
          ) : (
            transactions.map((txn) => (
              <li key={txn.id} className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <h4 className={styles.transactionTitle}>{txn.title}</h4>
                  <p className={styles.transactionCategory}>
                    {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)} •{" "}
                    {txn.category}
                  </p>
                </div>

                <div className={styles.transactionDetails}>
                  <span
                    className={`${styles.amount} ${
                      txn.type === "income" ? styles.income : styles.expense
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"} ₹{txn.amount}
                  </span>
                  <span className={styles.transactionDate}>{txn.date}</span>
                  <span
                    className={`${styles.typeBadge} ${
                      txn.type === "income"
                        ? styles.incomeBadge
                        : styles.expenseBadge
                    }`}
                  >
                    {txn.type}
                  </span>
                 <button onClick={() => setEditingTxn(txn)} aria-label="Edit Transaction"><FaEdit /></button>
<button onClick={() => handleDelete(txn.id)} aria-label="Delete Transaction"><MdDelete /></button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
       {editingTxn && (
        <EditTransaction
          transaction={editingTxn}
          onClose={() => setEditingTxn(null)}
          uid={user.uid}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
