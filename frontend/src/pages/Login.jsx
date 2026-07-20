import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(form);

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-xl shadow-slate-900/5 rounded-2xl p-8 w-full max-w-md"
      >
        <p className="text-center text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase mb-2">
          Healthcare made clear
        </p>
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">
          NextCare AI
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5 focus:outline-none"
          required
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
