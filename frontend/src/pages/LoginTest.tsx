import "../styles/logintest.css";
import { useState } from "react";

const LoginTest = () => {
  const [emailgood, setEmailgood] = useState(false);

  return (
    <div className="logintest">
      <h1>login</h1>
      <div>
        <h1>email</h1>
        <p>please enter your email</p>
        <input type="text" placeholder="email" />
        {emailgood ? null :<button onClick={() => setEmailgood(true)}>continue</button>}
      </div>
      {emailgood ? (
        <div>
          <p>please enter your password</p>
          <input type="text" placeholder="password" />
          <button>continue</button>
        </div>
      ) : null}
    </div>
  );
};

export default LoginTest;
