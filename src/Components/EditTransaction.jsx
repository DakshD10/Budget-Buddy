import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateTransaction, fetchTransactions } from "../Features/Transaction/AddTransSlice";
import styles from "./EditTransaction.module.css";

const EditTransaction = ({ transaction, onClose, uid }) => {
  const [form, setForm] = useState({ ...transaction });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
=======
   
>>>>>>> 16a14ce868f511b36648ed3a9dd18589ad8011fa
    const updatedData = {
      ...form,
      amount: parseFloat(form.amount) || 0,
    };
    dispatch(UpdateTransaction({ uid, transactionid: transaction.id, updatedData }))
      .then(() => {
        dispatch(fetchTransactions(uid)); 
        onClose();
      });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            required 
            placeholder="Title" 
          />
          <input 
            name="amount" 
            value={form.amount || ''} 
            onChange={handleChange} 
            required 
            placeholder="Amount" 
            type="number" 
          />
          <input 
            name="category" 
            value={form.category || ''} 
            onChange={handleChange} 
            required 
            placeholder="Category" 
          />
          <select 
            name="type" 
            value={form.type || 'expense'} 
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input 
            name="date" 
            value={form.date || ''} 
            onChange={handleChange} 
            required 
            type="date" 
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
