import { Link, useParams } from "react-router-dom";
import "../styles/twofactor.css";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

const TwoFactor = () => {
  const { user } = useStore();

  const { id } = useParams();

  const [page, setPage] = useState<number>(1);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(false);
  const [current, setCurrent] = useState("");

  const [two_factor, setTwo_factor] = useState(false);

  const next = (e: any) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const toggleDisable = (e: any) => {
    e.preventDefault();
    setDisable(!disable);
  };

  const getData = useCallback(async () => {
    const response = await fetch(`${api}/api/user/setting/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
    }
    if (response.ok) {
      setSettings(json.settings);
      setEnabled(json.settings.two_factor);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const activateTwoFactor = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`${api}/api/user/setting/${user.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        user_id: id,
        two_factor: true,
        passwordless: false,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      next(e);
    }
    if (!response.ok) {
      console.log(`not ok`);
    }
  };

  const deactivateTwoFactor = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`${api}/api/user/setting/${user.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        user_id: id,
        two_factor: false,
        passwordless: false,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      window.location.reload();
    }
    if (!response.ok) {
      console.log(`not ok`);
    }
  };

  const handleCheckPassword = (e: any, type: string) => {
    e.preventDefault();
    checkPassword(e, current, type);
  };

  const checkPassword = async (e: any, password: string, type: string) => {
    const response = await fetch(
      `http://localhost:5000/api/user/password/check/${user.user._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
    }
    if (response.ok) {
      deactivateTwoFactor(e);
    }
  };

  const handleCheckPassword2 = (e: any, type: string) => {
    e.preventDefault();
    checkPassword2(e, current, type);
  };

  const checkPassword2 = async (e: any, password: string, type: string) => {
    const response = await fetch(
      `http://localhost:5000/api/user/password/check/${user.user._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
    }
    if (response.ok) {
      activateTwoFactor(e);
    }
  };

  return (
    <div className="twofactor">
      <Link className="settings-link" to={`/console/${id}/settings`}>
        cancel
      </Link>
      {enabled ? (
        <div className="enabled home">
          <Link className="settings-link" to={`/console/${id}/settings`}>
            settings
          </Link>
          <h1>2 FACTOR AUTHENTICATION</h1>
          <p>you have 2 factor enaabled</p>
          <h2>status</h2>
          <button onClick={(e) => toggleDisable(e)}>disable</button>
          {disable ? (
            <div className="changeemail">
              <Link className="settings-link" to={`/console/${id}/settings`}>
                settings
              </Link>
              {verified ? (
                <div className="change-email">
                  <h1>disbale</h1>
                  <p>
                    warning:once disbaled you will have to configure 2 step auth
                    all over again
                  </p>
                  <button
                    onClick={() => {
                      setDisable(false);
                      setVerified(false);
                    }}
                  >
                    disbale
                  </button>
                </div>
              ) : (
                <div className="changeemail">
                  <Link
                    className="settings-link"
                    to={`/console/${id}/settings`}
                  >
                    settings
                  </Link>
                  <h1>please verfiy password</h1>
                  <input
                    type="text"
                    placeholder="password"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                  <button onClick={(e) => handleCheckPassword(e, `disbaled`)}>
                    confirm
                  </button>{" "}
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : page === 1 ? (
        <div className="home box">
          <h1>2 FACTOR AUTHENTICATION</h1>

          <h1>2 factor auth</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus quia
            at illo recusandae provident totam atque dolorem, eum reprehenderit
            accusantium?
          </p>
          <button onClick={(e) => next(e)}>continue</button>
        </div>
      ) : page === 2 ? (
        <div className="home box">
          <h1>email</h1>
          <p>an email will be sent to</p>
          <span>{user.user.email}</span>
          {/*<button onClick={(e) => activateTwoFactor(e)}>
            continue and send req
      </button>*/}
          <button onClick={(e) => next(e)}>continue</button>
          {/*<button className="settings-link" onClick={() => setPage(1)}>
            cancel
          </button>*/}
        </div>
      ) : page === 3 ? (
        <div className="home box">
          <h1>please verfiy password</h1>
          <input
            type="text"
            placeholder="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <button onClick={(e) => handleCheckPassword2(e, `disbaled`)}>
            confirm
          </button>
        </div>
      ) : page === 4 ? (
        <div className="congrats box">
          <h1>you have been set up for 2 factor authentication</h1>
          <p>
            After your enter your email and password, you will be asked to enter
            a code that will be sent to miguelmarcoramcharan@gmail.com
          </p>
          <div>
            <p>
              you can use a recovery code if the email is not avaibale, by
              entering it is in place of the code
            </p>
            <Link to="/">recovery code</Link>
            <button
              onClick={() => {
                setEnabled(true);
                setPage(1);
              }}
            >
              done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TwoFactor;
