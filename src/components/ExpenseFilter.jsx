import { useContext, useState, useEffect, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

const ExpenseFilter = () => {
  const { currentUser } = useAuth();
  const { expenses, updateExpenseCategory } = useContext(ExpenseContext);
  const { categories } = useContext(CategoryContext);

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [onClick, setOnClick] = useState(false);

  useEffect(() => {
    if (currentUser && expenses) {
      // Ambil semua expense milik currentUser
      let userExpenses = expenses.filter((e) => e.userId === currentUser.id);

      // Filter kategori milik currentUser
      const categoryFiltered = categories.filter(
        (c) => c.userId === currentUser.id,
      );
      setCurrentCategories(categoryFiltered);

      // Filter kategori
      if (selectedCategory !== "All") {
        userExpenses = userExpenses.filter(
          (e) => e.categoryId === selectedCategory,
        );
      }

      // Urutkan berdasarkan waktu pembuatan (terbaru duluan)
      userExpenses = userExpenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setFilteredExpenses(userExpenses);
    }
  }, [currentUser, expenses, categories, selectedCategory]);

  // Hitung total pengeluaran dari hasil filter
  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [filteredExpenses]);

  const handleCategoryChange = (expenseId, newCategoryId) => {
    try {
      updateExpenseCategory(expenseId, newCategoryId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleArrow = () => {
    setOnClick(!onClick);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 text-lg">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-primary" width={16} height={16} />
          <p className="font-medium text-base">Filter Expense</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Dropdown filter kategori */}
          <div className="flex items-center gap-4">
            <div
              className="border border-black/20 rounded-md flex gap-2 py-1 px-2 "
              onClick={handleArrow}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm appearance-none whitespace-pre-wrap outline-none">
                <option value="All">All Categories</option>
                {currentCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronRight
                width={14}
                className={`text-black/50 transition duration-300 ease-in-out ${onClick ? "rotate-90" : ""}`}
              />
            </div>
          </div>

          {/* Total pengeluaran berdasarkan filter */}
          <div className="text-sm text-end">
            Total <strong>({filteredExpenses.length} items)</strong> : Rp
            <strong className="text-xl text-primary">
              {totalExpense.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>
      </div>

      {/* List expense sesuai filter + bisa update kategori */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">Expense List</p>
        <div className="flex flex-wrap gap-1">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="p-3 w-full bg-secondary rounded-lg">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold">{expense.note}</p>
                  <div className="flex flex-wrap gap-x-2 items-center">
                    <p className="text-xs text-black/50">
                      {new Date(expense.date).toLocaleDateString()}{" "}
                      {new Date(expense.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <span className="text-black/30">•</span>
                    <select
                      value={expense.categoryId || "uncat"}
                      onChange={(e) =>
                        handleCategoryChange(expense.id, e.target.value)
                      }
                      className="bg-primary/70 text-xs text-secondary py-1 px-2 rounded-sm focus:bg-primary transition duration-100 ease-in-out appearance-none text-center">
                      {currentCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex text-nowrap">
                  <p className="text-sm">
                    -Rp{" "}
                    <span className="text-lg font-bold text-primary">
                      {Number(expense.amount).toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
