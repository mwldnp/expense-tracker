import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ui/ErrorAlert";
import Logo from "../../public/logo/Logo.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  //   Buat state untuk data form
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { currentUser, register } = useAuth();

  if (currentUser) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      register(form.name, form.username, form.password);

      alert("Register berhasil");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <section className="text-center w-full px-8 flex-col flex gap-3">
        <header className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-secondary w-14 h-14 flex justify-center items-center rounded-md overflow-hidden">
            <img src={Logo} alt="" />
          </div>
          <div>
            <p className="text-2xl font-bold leading-[120%]">Expense</p>
            <p className="text-2xl font-bold leading-[120%] text-primary">
              Tracker
            </p>
          </div>
        </header>
        <p className="text-start font-medium text-xl mb-3">
          Create your account
        </p>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8
        ">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="text-base border border-primary/20 rounded-lg px-4 py-2"
              placeholder="Real Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              className="text-base border border-primary/20 rounded-lg px-4 py-2"
              placeholder="Username"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type={showPassword ? "text" : "password"}
              className="text-base border border-primary/20 rounded-lg px-4 py-2"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span className="text-start text-sm flex items-center text-black/70">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
                width={14}
                height={14}
              />
              Show password
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="text-white">Regsiter</Button>
            <small>
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:underline text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </small>
          </div>
        </form>
      </section>
    </div>
  );
}
