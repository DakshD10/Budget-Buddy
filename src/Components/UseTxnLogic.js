import { useDispatch } from "react-redux";
import { useAuth } from "../Authentication/AuthContext";
import { useReducer } from "react";
import { addTransaction } from "../Features/Transaction/AddTransSlice";

const initialState = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
  date: "",
};

function TxnReducer(state, action) {
  return {
    ...state,
    [action.payload.name]: action.payload.value,
  };
}

export const UseTxnLogic = () => {
  const reduxDispatch = useDispatch();
  const { user } = useAuth();
  const [state, dispatch] = useReducer(TxnReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
      dispatch({ type: "UPDATE_FIELD", payload: { name: "category", value: "" } });
    } else {
      dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.uid) {
      alert("Please login first.");
      return;
    }

    const { title, amount, category, type, date } = state;

    const transaction = {
      title,
      category,
      type,
      date,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
    };

    reduxDispatch(addTransaction({ uid: user.uid, transaction }));
    dispatch({ type: "UPDATE_FIELD", payload: { name: "title", value: "" } });
    dispatch({ type: "UPDATE_FIELD", payload: { name: "amount", value: "" } });
    dispatch({ type: "UPDATE_FIELD", payload: { name: "category", value: "" } });
    dispatch({ type: "UPDATE_FIELD", payload: { name: "date", value: "" } });
  };

  return {
    formData: state,
    handleChange,
    handleSubmit,
  };
};
