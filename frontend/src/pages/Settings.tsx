import "../styles/settings.scss";
import { useState, useCallback, useEffect } from "react";
import { useStore } from "../store/store";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteAccount from "../components/DeleteAccount";
import ChangePassword from "../components/ChangePassword";
import DeleteForm from "../components/DeleteForm";
import ConfirmLogout from "../components/ConfirmLogout";
import { useLogout } from "../hooks/useLogout";
import { api } from "../api/api";
import moment from "moment";
import PasswordLess from "../components/PasswordLess";
import TwoFactor from "../components/TwoFactor";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logoutuser, removeform, form } = useStore();
  const { id } = useParams();

  const { logout } = useLogout();

  const [daoading, setDaloading] = useState<any>(false);
  const [daerror, setDaerror] = useState<any>(false);

  const [dfoading, setDfloading] = useState<any>(false);
  const [dferror, setDferror] = useState<any>(false);

  const [showDeleteAccount, setShowDeleteAccount] = useState<any>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<any>(false);
  const [showChangePassword, setShowChangePassword] = useState<any>(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState<any>(false);
  const [showPasswordLess, setShowPasswordLess] = useState<any>(false);
  const [showTwoFactor, setShowTwoFactor] = useState<any>(false);

  const [settings, setSettings] = useState<any>({});

  const handleDeleteUser = async (e: any) => {
    e.preventDefault();
    setDaloading(true);
    setDaerror(null);
    const response = await fetch(`${api}/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setDaloading(false);
      setDaerror(json.error);
    }
    if (response.ok) {
      logoutuser();
      removeform();

      navigate(`/`);
    }
  };

  const toggleLogout = (e: any) => {
    e.preventDefault();
    if (showConfirmLogout) {
      setShowConfirmLogout(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showConfirmLogout) {
      setShowConfirmLogout(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    }
  };

  const toggleDeleteAccount = (e: any) => {
    e.preventDefault();
    if (showDeleteAccount) {
      setShowDeleteAccount(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showDeleteAccount) {
      setShowDeleteAccount(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    }
  };

  const toggleDeleteForm = (e: any) => {
    e.preventDefault();
    if (showDeleteForm) {
      setShowDeleteForm(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showDeleteForm) {
      setShowDeleteForm(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    }
  };

  const toggleChangePassword = (e: any) => {
    e.preventDefault();
    if (showChangePassword) {
      setShowChangePassword(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showChangePassword) {
      setShowChangePassword(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    }
  };

  const togglePasswordLess = (e: any) => {
    e.preventDefault();
    if (showPasswordLess) {
      setShowPasswordLess(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showPasswordLess) {
      setShowPasswordLess(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    }
  };

  const toggleTwoFactor = (e: any) => {
    e.preventDefault();
    if (showTwoFactor) {
      setShowTwoFactor(false);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (!showTwoFactor) {
      setShowTwoFactor(true);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
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
      if (json === null) {
        return;
      } else {
        setSettings(json.settings);
      }
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="settings">
      {showConfirmLogout ? <ConfirmLogout toggleLogout={toggleLogout} /> : null}
      {showDeleteAccount ? (
        <DeleteAccount toggleDeleteAccount={toggleDeleteAccount} />
      ) : null}
      {showDeleteForm ? (
        <DeleteForm toggleDeleteForm={toggleDeleteForm} />
      ) : null}
      {showChangePassword ? (
        <ChangePassword toggleChangePassword={toggleChangePassword} />
      ) : null}
      {showPasswordLess ? (
        <PasswordLess
          togglePasswordLess={togglePasswordLess}
          settings={settings}
        />
      ) : null}
      {showTwoFactor ? (
        <TwoFactor toggleTwoFactor={toggleTwoFactor} settings={settings} />
      ) : null}
      <h1 className="settings-heading">Settings</h1>
      <div className="info">
        <h2>ACCOUNT INFO</h2>
        <h1>email : {user.user.email}</h1>
        <h1>joined : {moment(user.user.createdAt).format("MMMM Do YYYY")}</h1>
      </div>
      <div className="security">
        <h2>SECURITY</h2>
        <div className="box">
          <h1 onClick={toggleChangePassword}>Change Password</h1>
        </div>
        <div className="box">
          <h1>
            <Link to={`/console/${id}/settings/passwordless`}>
              Passwordless Login
            </Link>
          </h1>
          <span>{settings.passwordless ? `enabled` : `disabled`}</span>
        </div>
        <div className="box">
          <h1>
            <Link to={`/console/${id}/settings/twofactorauth`}>
              Two Factor Authentication
            </Link>
          </h1>
          <span>{settings.two_factor ? `enabled` : `disabled`}</span>
        </div>
      </div>
      <div className="danger">
        <h2>ACCOUNT MANAGMENT</h2>
        <div className="box">
          <h1>
            {" "}
            <Link to={`/console/${id}/settings/code`}>recovery code</Link>
          </h1>
        </div>
        <div className="box">
          <h1>
            {" "}
            <button onClick={toggleDeleteForm}>download login info</button>
          </h1>
        </div>
        <div className="box">
          <h1 onClick={toggleDeleteAccount}>delete account</h1>
        </div>
        {form ? (
          <div className="box">
            <h1>delete all forms</h1>
            <p>forms cannot be deleted once deleted</p>
            <button onClick={toggleDeleteForm}>delete form</button>
          </div>
        ) : null}
        <div className="box">
          <button className="logout" onClick={toggleLogout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
