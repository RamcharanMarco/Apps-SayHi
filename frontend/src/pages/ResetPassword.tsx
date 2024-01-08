import { useState, useEffect } from "react";
import '../styles/resetPassword.scss'
import { useResetPassword } from "../hooks/useResetPassword";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {



  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const {resetPassword, done, error} = useResetPassword()

  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const handleClick = (e:any) =>{
    e.preventDefault()
    resetPassword(password2, token)
  }

  return (
    <div className="resetPassword">
      <h1>reset password</h1>
      <div
            style={password !== password2 ? { visibility: "visible" } : { visibility: "hidden" }}
            className="error"
          >
            <p>no match</p>
          </div> 
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="pasword"
      />
      <input
        type="text"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="confirm new password"
      />
      <button onClick={handleClick} disabled={password !== password2}>
        reset
      </button>
      {done ? (
        <p>
          pwd has been changed, you will be redirected to the login page now
        </p>
      ) : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default ResetPassword;
