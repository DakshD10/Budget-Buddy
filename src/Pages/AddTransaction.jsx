import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../Authentication/AuthContext"
import { addTransaction } from "../Features/Transaction/AddTransSlice"; 
import styles from "./AddTransaction.module.css";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); 

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "income",
    date: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.uid) {
      alert("Please login first.");
      return;
    }

    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString(),
    };

    dispatch(addTransaction({ uid: user.uid, transaction }));

    
    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "income",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add Transaction</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.formLabel}>Amount (₹)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type" className={styles.formLabel}>Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className={styles.formSelect}
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.formLabel}>Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.formInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.formLabel}>Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
      </div>

      <button type="submit" className={styles.submitButton}>Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
