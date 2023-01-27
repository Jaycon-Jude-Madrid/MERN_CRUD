import React, { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const { login, isLoading, error } = useLogin();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailValue = emailRef?.current?.value;
    const passwordValue = passwordRef?.current?.value;

    await login(emailValue, passwordValue);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email</label>
      <input type="email" ref={emailRef} placeholder="Email..." />
      <label>Password</label>
      <input type="password" ref={passwordRef} placeholder="Password..." />

      <button type="submit" disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
