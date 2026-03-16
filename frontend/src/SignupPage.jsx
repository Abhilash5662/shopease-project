import React, { useState } from "react";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }


    localStorage.setItem("user", JSON.stringify({
      name: form.name,
      email: form.email
    }));

    alert("Account Created ✅");

    navigate("/");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />

          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} required />

          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" onChange={handleChange} required />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
