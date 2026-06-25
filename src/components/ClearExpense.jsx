import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Trash2, TriangleAlert } from "lucide-react";

const ClearExpense = () => {
  const { clearExpenses } = useContext(ExpenseContext);

  const handleDeleteExpenses = () => {
    alert("Are you sure you want to delete all expense data?");
    clearExpenses();
  };

  return (
    <div className="flex flex-col text-sm gap-2 transition duration-300 ease-in-out">
      <div className="flex gap-3 border rounded-md bg-orange-200/30 border-orange-600 p-2">
        <TriangleAlert width={24} height={24} className="text-orange-600" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-orange-600">Warning!</p>
          <p>Expense data already contains more than 50 items.</p>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center border rounded-md bg-red-200/30 border-red-600 p-2 group hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer">
        <Trash2
          width={16}
          height={16}
          className="text-red-600 group-hover:text-white"
        />
        <button
          onClick={handleDeleteExpenses}
          className="text-red-600 font-medium group-hover:text-white">
          Clear All Expenses
        </button>
      </div>
    </div>
  );
};

export default ClearExpense;
