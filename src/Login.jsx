import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Demo credentials
  const demoEmail = "admin@gmail.com";
  const demoPassword = "admin123";

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (email === demoEmail && password === demoPassword) {
      onLogin(); // Authenticate user
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-sm font-medium">Email ID:</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium">Password:</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
