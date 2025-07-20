import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase"
import { collection, addDoc, getDocs,doc , deleteDoc , updateDoc} from "firebase/firestore";

// ADD transaction TO firestore
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async ({ uid, transaction }) => {
    const userRef = collection(db, `users/${uid}/transactions`);
    const docRef = await addDoc(userRef, transaction);
    return { ...transaction, id: docRef.id };
  }
);

//Fetching transaction from firestore
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (uid) => {
    const userRef = collection(db, `users/${uid}/transactions`);
    const snapshot = await getDocs(userRef);
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return transactions;
  }
);

// Delete txn from firestore
export const DeleteTransaction = createAsyncThunk(
  "transactions/DeleteTransaction",
  async ({ uid, transactonid }) => {
    const docRef = doc(db, `users/${uid}/transactions/${transactonid}`);
    await deleteDoc(docRef);
    return transactonid;
  }
);

// Udating txn in firestore
export const UpdateTransaction  = createAsyncThunk(
  "transactions/UpdateTransaction",
  async({uid , transactionid , updatedData}) => {
    const docRef = doc(db, `users/${uid}/transactions/${transactionid}`);
    await updateDoc(docRef,updatedData);
    return {id : transactionid , updatedData}
  }
)


const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
       // Add Transaction
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        //
      })
      // DELETION
      .addCase(DeleteTransaction.fulfilled ,(state,action) => {
        state.list = state.list.filter((transaction) => transaction.id !== action.payload);
      })
       // DELETION failure
      .addCase(DeleteTransaction.rejected ,  (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //UPDATION
      .addCase(UpdateTransaction.fulfilled , (state ,action) => {
        const index = state.list.findIndex((txn) => txn.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.updatedData
          }
        }
      })
  },
});

export default transactionSlice.reducer;
