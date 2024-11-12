import React, { FC, useState } from "react";
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Form, Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/features/UserSlice";

const useAppDispatch = () => useDispatch<AppDispatch>();

const LoginPage: FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ userName, password })).unwrap();
      console.log(userName,password)
      if (result.token) {
        localStorage.setItem("token", result.token); 
        navigate("/votePage", { state: { user: result.user } });
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {status === "pending" && <p className="loading-message">Loading...</p>}
      {status === "rejected" && error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Send</button>
        <p className="switch-auth">
         create an account <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;