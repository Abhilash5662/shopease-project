import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.email && form.password) {

            localStorage.setItem("user", JSON.stringify({
                email: form.email
            }));



            navigate("/");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input name="email" onChange={handleChange} required />

                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} required />

                    <button type="submit">Login</button>
                </form>

                <p>
                    New customer? <Link to="/signup">Create Account</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
