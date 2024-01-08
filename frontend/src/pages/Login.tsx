import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/login.scss";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useCheckEmail } from "../hooks/useCheckEmail";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, loading } = useLogin();
  const { checkemail, emailOk, error: emailerr, email: mail } = useCheckEmail();

  const handleClick = (e: any): void => {
    e.preventDefault();
    login(email, password);
  };

  const handleCheckEmail = (e: any): void => {
    e.preventDefault();
    checkemail(email);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {emailOk ? (
        <div>
          <p className="emailok">{mail}</p>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgotpassword/email">forgot password</Link>
          <button onClick={handleClick}>login</button>
          <div
            style={error ? { visibility: "visible" } : { visibility: "hidden" }}
            className="error"
          >
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleCheckEmail}>Continue</button>
          <div
            style={
              emailerr ? { visibility: "visible" } : { visibility: "hidden" }
            }
            className="error"
          >
            <p>{emailerr}</p>
          </div>
        </div>
      )}

      {loading ? <Loader /> : ""}
    </div>
  );
};

export default Login;
