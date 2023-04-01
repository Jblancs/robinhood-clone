import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-page-container">
      <img className="signup-form-img" src="./images/signup-background.PNG" alt="login" />
      <div className="signup-form-container">
        <div className="login-form-div">
          <h1>Sign up for Robingood</h1>
          <form onSubmit={handleSubmit}>
            <ul className="log-sign-errors">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="login-pass-div">
              <label>
                <div className="login-label-text">
                  Email
                </div>
                <input
                  type="text"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="login-pass-div">
              <label>
                <div className="login-label-text">
                  Username
                </div>
                <input
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="login-pass-div">
              <label>
                <div className="login-label-text">
                  Password
                </div>
                <input
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="login-pass-div">
              <label>
                <div className="login-label-text">
                  Confirm Password
                </div>
                <input
                  type="password"
                  className="login-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <button className="login-form-button" type="submit">Sign Up</button>
            </div>
          </form>
          <div className="login-line-split"></div>
          <div className="signup-link-div">
            <NavLink to="/login" style={{textDecoration:"none", color:"black"}}>
            Already have an account? <span className="bold under">Login here</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
