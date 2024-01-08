import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { api } from "../api/api";
import Loader from "../components/Loader";
import {FiEdit2} from 'react-icons/fi'

const Form = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const [email, setEmail] = useState<any>("");
  const [heading, setHeading] = useState<any>("");
  const [nameInput, setNameInput] = useState<any>("");
  const [emailInput, setEmailInput] = useState<any>("");
  const [bodyInput, setBodyInput] = useState<any>("");
  const [edit, setEdit] = useState<boolean>(false);

  const [id, setId] = useState<any>(null);

  const getData = useCallback(async () => {
    setError(null);
    const response = await fetch(`${api}/api/user/forms/${user.user._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      setData(json);
      setEmail(json.email);
      setHeading(json.heading);
      setNameInput(json.nameInput);
      setBodyInput(json.bodyInput);
      setEmailInput(json.emailInput);
      setId(json._id);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  const toggleEdit = (e: any) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const editData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    window.scrollTo(0, 0);
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
    const response = await fetch(`${api}/api/user/forms/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        email,
        heading,
        emailInput,
        nameInput,
        bodyInput,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      setData(json);
      setLoading(false)
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll"
      window.location.reload();
    }
    if (!response.ok) {
      setLoading(false)
      setError(json.error);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll"
    }
  };

  return (
    <div className="form">
      {edit ? <h1>Edit Form</h1> : <h1>Form</h1>}
      <div className="nav">
        {edit ? (
          <button className="cancelbutton" onClick={toggleEdit}>cancel</button>
        ) : (
          <FiEdit2 className="editbutton" onClick={toggleEdit}/>
        )}
      </div>
      <form>
        <h1>email</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={!edit}
        />
        <h1>heading</h1>
        <input
          type="text"
          placeholder="heading"
          onChange={(e) => setHeading(e.target.value)}
          value={heading}
          disabled={!edit}
        />
        <div>
          <h2>name</h2>
          <p>do you want users to add their name</p>
          <select
            onChange={(e) => setNameInput(e.target.value)}
            value={nameInput}
            disabled={!edit}
          >
            <option value="true">on</option>
            <option value="false">off</option>
          </select>
        </div>
        <div>
          <h2>mail</h2>
          <p>do you want users to add their name</p>

          <select
            onChange={(e) => setEmailInput(e.target.value)}
            value={emailInput}
            disabled={!edit}
          >
            <option value="true">on</option>
            <option value="false">off</option>
          </select>
        </div>
        <div>
          <h2>body</h2>
          <p>do you want users to add their name</p>

          <select
            onChange={(e) => setBodyInput(e.target.value)}
            value={bodyInput}
            disabled={!edit}
          >
            <option value="true">on</option>
            <option value="false">off</option>
          </select>
        </div>
        {edit ? <button onClick={editData}>save</button> : null}
        <div
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className="error"
        >
          <p>{error}</p>
        </div>
      </form>
      {loading ? <Loader /> : null}
    </div>
  );
};

export default Form;
