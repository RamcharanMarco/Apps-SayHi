import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/createForm.scss";
import { api } from "../api/api";
import Loader from "../components/Loader";

const CreateForm = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const data = {
    bgcolor: "#f0f3ff",
    fontcolor: "#000000",
    inputbgcolor: "#ffffff",
    btncolor: "#000000",
    btntxtcolor: "#d8dbe9",
    inputtxtcolor: " #000000",
    reply_email: false,
    reply_email_content: `thanks for contcting me, will get back to you`,
    premium: true,
    status: false,
    namefield: true,
    emailfield: true,
    bodyfield: true,
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
    const response = await fetch(`${api}/api/user/forms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ email, title, name, ...data }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
    if (response.ok) {
      console.log(json);
      navigate(`/console/${json.user_id}`);
      document.body.style.height = "100vh";
      document.body.style.overflowY = "scroll";
    }
  };

  useEffect(() => {
    setEmail(user.user.email);
  }, []);

  return (
    <div className="createForm">
      <h1>create form</h1>
      <form>
        <div className="createForm-box">
        <p>email</p>
        <span>The email the messages must be sent to</span>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="createForm-box">
        <p>form title</p>
        <input
          type="text"
          placeholder="heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="createForm-box">
        <p>form name</p>
        <input
          type="text"
          placeholder="heading"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <button onClick={handleClick}>create</button>
        <div
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className="error"
        >
          <p>{error}</p>
        </div>
        {loading ? <Loader /> : null}
      </form>
    </div>
  );
};

export default CreateForm;
