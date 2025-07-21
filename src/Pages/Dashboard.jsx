import { useEffect } from "react";
import { useAuth } from "../Authentication/AuthContext";
import styles from "./Dashboard.module.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Income,
  Expense,
  Balance,
  PieData,
  MonthlyData,
  RecentTransactions,
} from "../Features/Transaction/txnData";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../Features/Transaction/AddTransSlice";
import Spinner from "../Components/Spinner";


const CATEGORY_COLORS = {
  income: "#22c55e",  
         
  "Uncategorized": "#dd490fff",
};


const Dashboard = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.transactions.status);
  const balance = useSelector(Balance);
  const expense = useSelector(Expense);
  const income = useSelector(Income);
  const chartData = useSelector(MonthlyData);
  const piedata = useSelector(PieData);
  const recentTxn = useSelector(RecentTransactions);

  useEffect(() => {
    if (user && status === "idle") {
      dispatch(fetchTransactions(user.uid));
    }
  }, [user, status, dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardGreeting}>Welcome {user.displayName}</h1>
        <p className={styles.dashboardDatetime}>{new Date().toLocaleString()}</p>
      </header>

      <section className={styles.summaryCards}>
        <div className={`${styles.summaryCard} ${styles.balanceCard}`}>
          <h2 className={styles.cardTitle}>Balance</h2>
          <p className={styles.cardValue}>₹{balance}</p>
        </div>
        <div className={`${styles.summaryCard} ${styles.incomeCard}`}>
          <h2 className={styles.cardTitle}>Income</h2>
          <p className={styles.cardValue}>₹{income}</p>
        </div>
        <div className={`${styles.summaryCard} ${styles.expenseCard}`}>
          <h2 className={styles.cardTitle}>Expense</h2>
          <p className={styles.cardValue}>₹{expense}</p>
        </div>
      </section>

      <section className={styles.chartsSection}>
        <div className={styles.chartBox}>
          <h3>Expense Breakdown</h3>
         <PieChart width={400} height={270}>
  <Pie data={piedata} dataKey="value" nameKey="name" outerRadius={100} label>
    {piedata.map((entry) => (
        <Cell
          key={`cell-${entry.type}-${entry.categoryName}`}
          fill={
            entry.type === 'income'
              ? CATEGORY_COLORS.income
              : CATEGORY_COLORS[entry.categoryName] || CATEGORY_COLORS.Uncategorized
          }
        />
    ))}
  </Pie>
  <Tooltip />
</PieChart>
        </div>

        <div className={styles.chartBox}>
          <h3>Income vs Expense</h3>
          <BarChart width={400} height={250} data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </div>

        <div className={styles.chartBox}>
          <h3>Balance Over Time</h3>
          <LineChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          </LineChart>
        </div>
      </section>

      <section className={styles.recentTransactions}>
        <h3 className={styles.sectionTitle}>Recent Transactions</h3>
        <ul>
          {recentTxn.map((txn) => (
            <li key={txn.id}>
              {txn.title} - ₹{txn.amount} ({txn.type})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;