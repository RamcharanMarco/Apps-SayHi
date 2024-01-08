import { useState } from "react";
import "../styles/twoFactor.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";

const TwoFactorLogin = () => {
  const { id } = useParams();
  const { loginuser } = useStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);
  const [code, setCode] = useState<string>("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const response = await fetch(
      `http://localhost:5000/api/auth/login/2factor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, code }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
      setError(false);
      loginuser(json);
      localStorage.setItem("cm", JSON.stringify(json));
      setLoading(false);
      navigate(`/console/${json.user._id}`);
    }
  };

  const handleClick2 = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const response = await fetch(
      `http://localhost:5000/api/auth/login/2factor/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, id }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
      setError(false);
      loginuser(json);
      localStorage.setItem("cm", JSON.stringify(json));
      setLoading(false);
      navigate(`/console/${json.user._id}`);
    }
  };

  return (
    <div className="twoFactor">
            <div className="logo">
            <Link to="/">SAYHELLO</Link>
        <Link to="/">LOGIN</Link>
        <Link to="/">SIGNUP</Link>      </div>
      <div className="twoFactorBox">
        <h1>You have two factor authentication enabled</h1>
      </div>
      <div className="twoFactorBox border-btm">
        <p>
          We sent a code to<br></br>
          {`************@gmail.com`}
        </p>
        <p>I did not recieve a code</p>
        <button>resend</button>
      </div>
      <div className="twoFactorBox">
        <h1>Please enter login/recovery code</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="code"
        />
        <button onClick={handleClick}>login</button>
        <div
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className="error"
        >
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorLogin;
