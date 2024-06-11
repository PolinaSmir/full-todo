import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [state, setState] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // query for registration
    if (data) {
      registerUser(data)
        .then((result) => {
          props.sendUser(result);
          navigate("/tasks");
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [data]);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const getData = (userData) => {
    setData(userData);
  };

  return (
    <>
      <header>
        <button onClick={buttonHandler}>{state ? "SignIn" : "SignUp"}</button>
      </header>

      <main>{state ? <SignUp sendData={getData} /> : <SignIn sendData={getData} />}</main>

      {error && <div>{error}</div>}
    </>
  );
};

export default Home;
