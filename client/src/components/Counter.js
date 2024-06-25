import React, { useReducer, useState } from "react";
import { connect } from "react-redux";

const Counter = (props) => {
  const increment = () => {
    const action = {
      type: "COUNTER_PLUS",
    };
    props.dispatch(action);
  };

  const decrement = () => {
    const action = {
      type: "COUNTER_MINUS",
    };
    props.dispatch(action);
  };

  return (
    <>
      <h1>{props.counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const WrappedCounter = connect(mapStateToProps)(Counter);

export default WrappedCounter;
