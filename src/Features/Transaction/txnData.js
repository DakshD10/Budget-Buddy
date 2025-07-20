import { createSelector } from "@reduxjs/toolkit";
const selectTxnList  = (state) => state.transactions.list

export  const Income  =  createSelector(
  [selectTxnList],(transactions) => 
    transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum,txn) => sum + Number(txn.amount), 0 )
) 

export const Expense = createSelector(
    [selectTxnList] ,(transactions) => 
        transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + Number(txn.amount),0)
)

export const Balance = createSelector(
    [Income , Expense] ,
    (income ,expense) => income - expense
);

export const PieData = createSelector(
    [Income, Expense] , 
    (income ,expense) => [
        { name : "INCOME " , value : income},
        {name : "EXPENSE" , value : expense}
    ]
)

export const MonthlyData = createSelector(
    [selectTxnList] , (transactions) => {
        const monthlyStats = {};
        transactions.forEach(txn => {
         const month  = new Date(txn.date).toLocaleString("default",  {month : "short"})
          if (!monthlyStats[month]) {
          monthlyStats[month] = { month, income: 0, expense: 0 };
          }
         monthlyStats[month][txn.type] += Number(txn.amount);
        });
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return Object.values(monthlyStats).sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }
)

export const RecentTransactions = createSelector(
    [selectTxnList],
    
    (transactions) => [...transactions].slice(-5).reverse()
);