import React, { useRef } from "react";

import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signup, isLoading, error } = useSignup();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailValue = emailRef?.current?.value;
  const passwordValue = passwordRef?.current?.value;
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signup(emailValue, passwordValue);
    console.log(emailValue, passwordValue);


  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>

      <label>Email</label>
      <input type="email" ref={emailRef} placeholder="Email..." />
      <label>Password</label>
      <input type="password" ref={passwordRef} placeholder="Password..." />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
