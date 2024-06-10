import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Home = () => {
  const [state, setState] = useState(true);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  return (
    <>
      <header>
        <button onClick={buttonHandler}>{state ? "SignIn" : "SignUp"}</button>
      </header>

      <main>{state ? <SignUp /> : <SignIn />}</main>
    </>
  );
};

export default Home;
