import { FC, useState, useEffect, useCallback } from "react";
import "../styles/passwordless.css";
import { api } from "../api/api";
import { useStore } from "../store/store";
import { useParams, Link } from "react-router-dom";

export const PasswordLessLoginSetup = () => {
  const [error, setError] = useState<any>();
  const [checked, setChecked] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useStore();
  const { id } = useParams();

  const [settings, setSettings] = useState<any>(false);
  const [current, setCurrent] = useState("");
  const [pwdless, setPwdless] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [enabledpage, setEnabledPage] = useState<number>(1);

  const handleCheckPassword = (e: any, type: string) => {
    e.preventDefault();
    checkPassword(e, current, type);
  };

  const checkPassword = async (e: any, password: string, type: string) => {
    setLoading(true);
    setError(null);
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
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
      setChecked(true);
      if (type === `enabled`) {
        editData(e, `enabled`);
      } else {
        setPage(3);
      }
    }
  };

  const editData = async (e: any, type: string) => {
    e.preventDefault();
    const rest = {
      user_id: id,
      two_factor: false,
      passwordless: pwdless ? false : true,
    };
    const response = await fetch(`${api}/api/user/setting/${user.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(rest),
    });
    const json = await response.json();

    if (response.ok) {
      window.location.reload();
    }
    if (!response.ok) {
      console.log(`not ok`);
    }
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
      setPwdless(json.settings.passwordless);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const next = (e: any) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const nextenabled = (e: any) => {
    e.preventDefault();
    setEnabledPage(enabledpage + 1);
  };

  return (
    <div className="passwordless">
                  <h1>passwordless login 1</h1>

      {pwdless ? (
        enabledpage === 1 ? (
          <div className="passwordless_enabled_page_one">
            <Link className="settings-link" to={`/console/${id}/settings`}>
              settings
            </Link>
            <p>password login is enabled</p>
            <p>
              an email will be sent to {user.user.email} every time you need to
              login
            </p>
            <button onClick={(e) => nextenabled(e)}>disable</button>
          </div>
        ) : enabledpage === 2 ? (
          <div className="passwordless_enabled_page_two">
                        <Link className="settings-link" to={`/console/${id}/settings`}>
              settings
            </Link>
            <p>please enter current password to disable</p>
            <input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              type="text"
              placeholder="current password"
            />
            <button onClick={(e) => handleCheckPassword(e, `enabled`)}>
              confirm
            </button>
            <div
              style={
                error ? { visibility: "visible" } : { visibility: "hidden" }
              }
              className="error"
            >
              <p>{error}</p>
            </div>
          </div>
        ) : null
      ) : null}
      {!pwdless ? (
        page === 1 ? (
          <div className="passwordless_enabled_page_one">
            <Link className="settings-link" to={`/console/${id}/settings`}>
              settings
            </Link>
            <p>lets you signup with a code that has been sent to email</p>
            <p>
              an email will be sent to miguelmarcoramcharan every time you try
              to login
            </p>
            <button onClick={(e) => next(e)}>contnue</button>
          </div>
        ) : page === 2 ? (
          <div className="passwordless_enabled_page_two">
            <Link className="settings-link" to={`/console/${id}/settings`}>
              settings
            </Link>
            <p>please enter current password to proceed</p>
            <input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              type="text"
              placeholder="current password"
            />
            <button onClick={(e) => handleCheckPassword(e, `disbaled`)}>
              confirm
            </button>
            <div
              style={
                error ? { visibility: "visible" } : { visibility: "hidden" }
              }
              className="error"
            >
              <p>{error}</p>
            </div>
          </div>
        ) : page === 3 ? (
          <div className="passwordless_enabled_page_three">
            <Link className="settings-link" to={`/console/${id}/settings`}>
              settings
            </Link>
            <p>
              a code will be send to your email {user.user.email} every time you
              choose passwordless login
            </p>
            <span>note * please note that 2 factor auth will be disbaled</span>
            <button onClick={(e) => editData(e, `disabled`)}>enable</button>
          </div>
        ) : null
      ) : null}
    </div>
  );
};