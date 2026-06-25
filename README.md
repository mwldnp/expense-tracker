# 💰 Expense Tracker

A simple and modern Expense Tracker application built with React.js, Context API, and TailwindCSS.

Track your daily expenses, organize categories, and monitor spending with a clean and responsive interface.

---

## 📸 Preview
### Login Page
- Clean and modern authentication page
- Remember me functionality
- Responsive mobile-first design

### Dashboard
- Total expense summary
- Expense filtering
- Category management
- Expense history list

Add screenshots or GIF previews here

![Dashboard](./public/dashboard-preview.png)
![Login](./public/login-preview.png)

---

## 🚀 Features
- **Authentication**: login user (via custom hook `useAuth`).
- **Expense Management**:
  - Tambah pengeluaran dengan kategori, jumlah, dan catatan.
  - Edit kategori pengeluaran langsung dari daftar.
  - Hapus atau reset form dengan mudah.
- **Category Management**:
  - Filter pengeluaran berdasarkan kategori.
  - Hitung total pengeluaran per kategori atau semua kategori.
- **UI/UX**:
  - Modal untuk menambah expense.
  - Dropdown filter dengan animasi icon.
  - Responsive design menggunakan TailwindCSS.

---

## 🛠️ Tech Stack
- **React.js** (Vite)
- **Context API** (ExpenseContext, CategoryContext)
- **TailwindCSS** untuk styling
- **Lucide-react** untuk icon
- **React Router** untuk navigasi

---

## 📂 Project Structure
src/
├── components/
│    ├── AddExpenseModal.jsx   # Modal untuk tambah expense
│    ├── ExpenseFilter.jsx     # Filter & daftar expense
│    └── ui/Button.jsx         # Reusable button component
│
├── context/
│    ├── ExpenseContext.jsx    # State global untuk expense
│    └── CategoryContext.jsx   # State global untuk kategori
│
├── hooks/
│    └── useAuth.js            # Custom hook untuk user auth
│
├── App.jsx
└── main.jsx


---

## ⚙️ Installation
1. Clone repository:
   ```bash
   git clone https://github.com/username/expense-tracker.git
   cd expense-tracker

2. Install dependencies:

bash
npm install

3. Jalankan aplikasi:

bash
npm run dev
