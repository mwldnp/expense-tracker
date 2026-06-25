import { createContext, useState } from "react";

// Buat context
export const CategoryContext = createContext();

// Buat provider context
export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || [];
  });

  //   Tambah kategori
  const addCategory = (id, userId, name) => {
    const storageCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    const newCategory = {
      id,
      userId,
      name,
    };

    const updatedCategory = [...storageCategories, newCategory];

    localStorage.setItem("categories", JSON.stringify(updatedCategory));

    setCategories(updatedCategory);
  };

  return (
    <CategoryContext.Provider value={{ addCategory, categories }}>
      {children}
    </CategoryContext.Provider>
  );
}
