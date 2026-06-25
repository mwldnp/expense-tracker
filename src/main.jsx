import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import CategoryProvider from "./context/CategoryContext.jsx";
import ExpenseProvider from "./context/ExpenseContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CategoryProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </CategoryProvider>
  </AuthProvider>,
);
