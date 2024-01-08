import { useState, useEffect } from "react";
import '../styles/forgotPassword.scss'

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSent(false);
    const response = await fetch(
      `http://localhost:5000/api/pwd/sendemail/${email}`
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

  return (
    <div className="forgotPassword">
      <h1>forgot password</h1>
      <p>please enter email</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button onClick={handleClick} disabled={loading}>
        send email
      </button>
      <div>
        <h1>i did not reveiec am email</h1>
        <button>resend</button>
      </div>
      {sent ? <p>check your mail</p> : null}
    </div>
  );
};

export default ForgotPassword;
