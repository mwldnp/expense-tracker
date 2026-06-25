import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorAlert from "../components/ui/ErrorAlert";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  if (currentUser) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      login(form.username, form.password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <section className="bg-blue-200 text-center p-8">
        <Heading>Login Form</Heading>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          <Button>Login</Button>
          <small>
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </small>
        </form>
      </section>
    </div>
  );
}
