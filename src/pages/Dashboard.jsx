import { useContext, useState } from "react";
import AddCategoryModal from "../components/AddCategoryModal";
import useAuth from "../hooks/useAuth";
import { ExpenseContext } from "../context/ExpenseContext";
import { useMemo } from "react";
import ExpenseFilter from "../components/ExpenseFilter";
import { NavLink } from "react-router-dom";
import AddExpenseModal from "../components/AddExpenseModal";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { expenses } = useContext(ExpenseContext);
  const [isModalExpenseOpen, setIsModaExpenselOpen] = useState(false);
  const [isModalCategoryOpen, setIsModaCategorylOpen] = useState(false);

  const handleAddExpense = (data) => {
    console.log("Expense added:", data);
    // panggil addExpense dari context di sini
  };

  const handleAddCategory = (data) => {
    console.log("Expense added:", data);
    // panggil addExpense dari context di sini
  };

  const expenseFiltered = expenses.filter((e) => e.userId === currentUser.id);

  const totalExpense = useMemo(() => {
    return expenseFiltered.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenseFiltered]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="mb-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-secondary w-10 h-10 flex justify-center items-center rounded-full">
              🍃
            </div>
            <div>
              <p className="font-bold">Expense</p>
              <p className="font-bold text-primary">Tracker</p>
            </div>
          </div>
          <button>
            <NavLink to="/logout" className="text-black/50 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-log-out-icon lucide-log-out">
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
            </NavLink>
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-3xl">
            Hi, <span className="font-medium">{currentUser.name}</span>
          </p>
          <p className="opacity-70">Welcome Back!</p>
        </div>
      </header>

      {/* Total Expense */}
      <div className="flex flex-col gap-2 px-4 py-5 rounded-xl bg-primary text-white mb-3">
        <p className="text-lg opacity-70">Total Expense</p>
        <p className="text-lg">
          Rp{" "}
          <span className="text-4xl font-bold">
            {totalExpense.toLocaleString("id-ID")}
          </span>{" "}
          ,-
        </p>
      </div>

      <div className="flex gap-3 mb-4">
        {/* Add Expense */}
        <div className="w-1/2">
          <button
            onClick={() => setIsModaExpenselOpen(true)}
            className="bg-secondary flex items-center gap-3 px-3 py-2 text-start rounded-xl h-full">
            <div>
              <div className="w-10 h-10 flex justify-center items-center text-2xl text-white rounded-full bg-primary">
                +
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">Add Expense</p>
              <p className="text-xs opacity-50">Record new expense</p>
            </div>
          </button>

          <AddExpenseModal
            isOpen={isModalExpenseOpen}
            onClose={() => setIsModaExpenselOpen(false)}
            onSubmit={handleAddExpense}
          />
        </div>

        {/* Add Category */}
        <div className="w-1/2">
          <button
            onClick={() => setIsModaCategorylOpen(true)}
            className="bg-secondary flex items-center gap-3 px-3 py-2 text-start rounded-xl h-full">
            <div>
              <div className="w-10 h-10 flex justify-center items-center text-xl text-white rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-tag-icon lucide-tag">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">Add Category</p>
              <p className="text-xs opacity-50">Create new category</p>
            </div>
          </button>
          <AddCategoryModal
            isOpen={isModalCategoryOpen}
            onClose={() => setIsModaCategorylOpen(false)}
            onSubmit={handleAddCategory}
          />
        </div>
      </div>

      <ExpenseFilter />
    </div>
  );
}
