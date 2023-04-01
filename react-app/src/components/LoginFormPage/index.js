import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoClick = async () => {
    setPassword("password")
    setEmail("demo@aa.io")
    await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <div className="login-page-container">
      <img className="login-form-img" src="./images/signin-background.PNG" alt="login" />
      <div className="login-form-container">\
        <div className="login-form-div">
          <h1>Log in to Robingood</h1>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div>
              <label>
                <div className="login-label-text">
                  Email
                </div>
                <input
                  className="login-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button className="login-form-button" type="submit">Log In</button>
            <div className="login-form-section-div">
              <button className="login-form-button" onClick={() => handleDemoClick()}>Demo User</button>
            </div>
          </form>
          <div className="login-line-split"></div>
          <div className="signup-link-div">
            Not on Robingood? <span className="bold under">Create an account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
