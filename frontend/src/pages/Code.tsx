import "../styles/recoverycode.scss";
import { Link, useParams } from "react-router-dom";
import { FC, useState, useEffect, useCallback } from "react";
import "../styles/changePassword.scss";
import { useCheckPasswordAndGenerateRecoveryCode } from "../hooks/useCheckPasswordAndGenerateRecoveryCode";
import { api } from "../api/api";
import { useStore } from "../store/store";

const Code = () => {
  const { id } = useParams();
  const { user } = useStore();

  const { checkPasswordAndGenerateRecoveryCode, checked, error, newcode } = useCheckPasswordAndGenerateRecoveryCode();

  const [current, setCurrent] = useState("");
  const [showCheckPwd, setShowCheckPwd] = useState(false);
  const [main, setMain] = useState(true);
  const [currentCode, setCurrentCode] = useState(``);

  const handleCheckPasswordAndCreateRecoveryCode = (e: any) => {
    e.preventDefault();
    checkPasswordAndGenerateRecoveryCode(current);
  };

  const toggleShowCheckPwd = (e: any) => {
    e.preventDefault();
    setMain(false);
    setShowCheckPwd(!showCheckPwd);
  };

  const getData = useCallback(async () => {
    const response = await fetch(`${api}/api/security/recoverycode/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(`not ok`);
    }

    if (response.ok) {
      console.log(`ok`);
      setCurrentCode(json.recoverycode.code);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const createCode = async () => {
    const response = await fetch(`${api}/api/security/recoverycode/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(`eerror`);
    }
    if (response.ok) {
      console.log(json);
    }
  };

  return (
    <div className="recoverycode">
      {main ? (
        <div className="main">
          <h1>
            <Link to={`/console/${id}/settings`}>{`<`}</Link>recovery code
          </h1>
          {currentCode ? (
            <div>
              <h2>current recovery code</h2>
              <p>recoveru code </p>
              <span>{currentCode}</span>
              <h2>generate new code</h2>
              <p>once generated all other codes will be reduntant</p>
              <button onClick={toggleShowCheckPwd}>generate code</button>
            </div>
          ) : !currentCode ? (
            <div>
              <h1>
                generate a recovery code so that you can log in on new devces if
                you change or lose access to your phone number
              </h1>
              <button onClick={toggleShowCheckPwd}>generate code</button>
            </div>
          ) : null}
        </div>
      ) : null}
      {showCheckPwd && !checked ? (
        <div className="checkpassword">
          <p>To set a new password, please enter your current passwword</p>
          <Link to="/">forgot password</Link>
          <input
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            type="text"
            placeholder="current password"
          />
          <button onClick={handleCheckPasswordAndCreateRecoveryCode}>confirm</button>
          <div
            style={error ? { visibility: "visible" } : { visibility: "hidden" }}
            className="error"
          >
            <p>{error}</p>
          </div>
        </div>
      ) : null}
      {checked ? (
        <div className="codepopup">
          <h1>Your recovery code is {newcode}.</h1>
          <p>
            Write this somewhere safe.You can use this code once instaed of the
            code we send via email to log back into your account
          </p>
          <Link to={`/console/${id}/settings`}>I wrote it down</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Code;
