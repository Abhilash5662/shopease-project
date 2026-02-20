import React from "react";
import "./AccountPage.css";
import { Link } from "react-router-dom";


function AccountPage() {
  return (
    <div className="account-page">

      <div className="account-card">
        <h2>Sign In</h2>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          New customer? <Link to="/signup">Create your account</Link>

        </p>
      </div>

    </div>
  );
}

export default AccountPage;
