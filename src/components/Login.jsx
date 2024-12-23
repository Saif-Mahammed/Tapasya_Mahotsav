import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "tapasya@mahotsav.com" && password === "tapasyathandavam") {
      alert("Login successful!");
      onLogin(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
