import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ui/ErrorAlert";

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
      <section className="bg-blue-200 text-center p-8">
        <Heading>Register Form</Heading>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            className="border border-blue-300 rounded-lg p-2"
            placeholder="Your Real Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            className="border border-blue-300 rounded-lg p-2"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="border border-blue-300 rounded-lg p-2"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span className="text-start">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Show password
          </span>
          <Button>Regsiter</Button>
          <small>
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </small>
        </form>
      </section>
    </div>
  );
}
