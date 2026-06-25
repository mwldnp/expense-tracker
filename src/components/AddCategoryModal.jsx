import { useState, useContext, useEffect } from "react";
import Button from "./ui/Button";
import useAuth from "../hooks/useAuth";
import { CategoryContext } from "../context/CategoryContext";
import { NavLink } from "react-router-dom";
import { Tag } from "lucide-react";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const { categories, addCategory } = useContext(CategoryContext);
  const { currentUser } = useAuth();

  const initialForm = {
    userId: currentUser.id,
    name: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (currentUser) {
      const hasUncat = categories.some(
        (c) => c.userId === currentUser.id && c.name === "Uncategorized",
      );

      if (!hasUncat) {
        addCategory("uncat", currentUser.id, "Uncategorized");
      }
    }
  }, [currentUser, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      addCategory(Date.now(), form.userId, form.name);
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
          <p className="text-lg font-medium">Add New Category</p>
          <button onClick={handleCancel} className="text-black/70">
            Close
          </button>
        </header>

        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full gap-12 mb-3">
          <div>
            <label
              htmlFor="category"
              className="font-medium text-md flex flex-col gap-2">
              Category Name
              <div className="flex gap-3 items-center py-2 px-2 border rounded-md border-black/20 active:border-black">
                <div className="min-w-8 min-h-8 flex justify-center items-center bg-secondary rounded-full">
                  <Tag
                    width={16}
                    className="text-primary flex justify-center items-center"
                  />
                </div>
                <input
                  type="text"
                  id="category"
                  placeholder="Enter new category"
                  value={form.name}
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="text-sm border-none outline-none w-full font-normal"
                />
              </div>
            </label>
          </div>
          <div>
            <Button className="w-full text-white mb-2">Add Category</Button>
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

export default AddCategoryModal;
