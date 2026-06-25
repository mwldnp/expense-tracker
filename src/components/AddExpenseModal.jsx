import { useContext, useState } from "react";
import Button from "./ui/Button";
import useAuth from "../hooks/useAuth";
import { ExpenseContext } from "../context/ExpenseContext";
import { Banknote, Captions } from "lucide-react";
import { NavLink } from "react-router-dom";

const AddExpenseModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addExpense } = useContext(ExpenseContext);

  const initialForm = {
    userId: currentUser.id,
    categoryId: "",
    amount: "",
    note: "",
  };
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addExpense(form.userId, form.categoryId, form.amount, form.note);
      setForm(initialForm);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setForm(initialForm);
  };

  const handleCancel = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <div
        className={`absolute bottom-0 bg-white w-full max-w-md px-6 pt-4 rounded-t-xl shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}>
        <header className="flex justify-between mb-6">
          <button onClick={handleClear} className="text-black/70">
            Clear
          </button>
          <p className="text-lg font-medium">Add Expense</p>
          <button onClick={handleCancel} className="text-black/70">
            Close
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full gap-12 mb-3">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="note"
              className="font-medium text-md flex flex-col gap-2">
              Description
              <div className="flex gap-3 items-center py-2 px-2 border rounded-md border-black/20 active:border-black">
                <div className="min-w-8 min-h-8 flex justify-center items-center bg-secondary rounded-full">
                  <Captions
                    width={16}
                    className="text-primary flex justify-center items-center"
                  />
                </div>

                <input
                  type="text"
                  name="note"
                  placeholder="What do you spend on?"
                  id="note"
                  required
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="text-sm border-none outline-none w-full font-normal"
                />
              </div>
            </label>

            <label
              htmlFor="amount"
              className="font-medium text-md flex flex-col gap-2">
              Amount
              <div className="flex gap-3 items-center py-2 px-2 border rounded-md border-black/20 active:border-black">
                <div className="min-w-8 min-h-8 flex justify-center items-center bg-secondary rounded-full">
                  <Banknote
                    width={16}
                    className="text-primary flex justify-center items-center"
                  />
                </div>
                <input
                  type="number"
                  id="amount"
                  required
                  placeholder="Rp 0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="text-sm border-none outline-none w-full font-normal"
                />
              </div>
            </label>
          </div>

          <div>
            <Button className="w-full text-white mb-2">Add Expense</Button>
            <NavLink
              className="block text-center w-full px-3 py-2 rounded-lg text-md cursor-pointer transition ease-in-out duration-300 bg-transparent text-primary"
              onClick={handleCancel}>
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
