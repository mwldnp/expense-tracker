import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export default function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const addExpense = (userId, categoryId, amount, note) => {
    const expenseStorage = JSON.parse(localStorage.getItem("expenses")) || [];

    const newExpense = {
      id: Date.now(),
      userId,
      categoryId: categoryId || "uncat",
      amount,
      date: Date.now(),
      note,
    };

    const updatedExpense = [...expenseStorage, newExpense];

    localStorage.setItem("expenses", JSON.stringify(updatedExpense));

    setExpenses(updatedExpense);
  };

  // Update expense berdasarkan expenseId
  const updateExpenseCategory = (expenseId, newCategoryId) => {
    const updatedExpenseList = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, categoryId: newCategoryId };
      }
      return expense;
    });

    localStorage.setItem("expenses", JSON.stringify(updatedExpenseList));
    setExpenses(updatedExpenseList);
  };

  return (
    <ExpenseContext.Provider
      value={{ addExpense, expenses, updateExpenseCategory }}>
      {children}
    </ExpenseContext.Provider>
  );
}
