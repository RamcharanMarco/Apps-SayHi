import { useState, useEffect } from "react";
import "../styles/passwordLess.scss";
import { useLoginPwdLess } from "../hooks/useLoginPwdLess";
import { Link } from "react-router-dom";

const PasswordLess = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const { loginpwdless, error: err } = useLoginPwdLess();

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSent(false);
    const response = await fetch(
      `http://localhost:5000/api/pwd/sendpwdlessemail/${email}`
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
      setError(false);
      setSent(true);
    }
  };

  const handleClick2 = async (e: any) => {
    e.preventDefault();
    loginpwdless(token);
  };

  return (
    <div className="passwordLess">
      <div className="logo">
        <Link to="/">SAYHELLO</Link>
        <Link to="/">LOGIN</Link>
        <Link to="/">SIGNUP</Link>
      </div>
      <div className="passwordLessBox">
        <h1>You have passwordless login enabled</h1>
      </div>
      <div className="passwordLessBox border-btm">
        <p>
          We sent a code to<br></br>
          {`************@gmail.com`}
        </p>
        <p>I did not recieve a code</p>
        <button onClick={handleClick} disabled={loading}>
          resend
        </button>{" "}
      </div>
      <div className="passwordLessBox">
        <h1>Please enter Login/recovery Code</h1>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="token"
        />
        <button onClick={handleClick2}>submit</button>
        <div
          style={err ? { visibility: "visible" } : { visibility: "hidden" }}
          className="error"
        >
          <p>{err}</p>
        </div>{" "}
      </div>
    </div>
  );
};

export default PasswordLess;
