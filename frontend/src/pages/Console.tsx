import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import ScriptBox from "../components/ScriptBox";
import "../styles/console.scss";
import { api } from "../api/api";
import Loader from "../components/Loader";

const Console = () => {
  const { user, setform } = useStore();

  const { id } = useParams();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [val, setVal] = useState(``);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/user/forms/all/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      if (json === null) {
        setLoading(false);
        return;
      } else {
        setform(json._id);
        setData(json);
        setLoading(false);
      }
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const [justifyContent, setJustifyContent] = useState(`flex-start`);
  const [status, setStatus] = useState(false);

  const toggle = () => {
    if (justifyContent === `flex-start`) {
      setStatus(true);
      setJustifyContent(`flex-end`);
    }
    if (justifyContent === `flex-end`) {
      setStatus(false);
      setJustifyContent(`flex-start`);
    }
  };

  return (
    <div className="console">
      <div className="search">
        <div>
          <h1>FORMS</h1>
        </div>
        <div>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="search form"
          />
        </div>
        <div className="create">
          <Link to={`/console/${id}/form/create`}>add new</Link>
        </div>
      </div>
      <div className="container">
        {data.map((form: any) => {
          if (form.name.includes(val)) {
            return (
              <Link className="box" to={`/console/${id}/form/${form._id}`}>
                <p>{form.name}</p>
              </Link>
            );
          }
        })}
      </div>

      <div onClick={toggle} style={{ justifyContent }} className="switch">
        <div></div>
      </div>
      {status ? `true` : `false`}
    </div>
  );
};

export default Console;
