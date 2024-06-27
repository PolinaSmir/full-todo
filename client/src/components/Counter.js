import React from "react";
import { connect } from "react-redux";
import { incrementAction, decrementAction, changeStepAction, toggleThemeAction } from "../actions/actionCreator";

const Counter = (props) => {
  const changeHandler = ({ target: { value } }) => {
    props.stepAction(Number(value));
  };

  const toggleTheme = () => {
    props.toggleTheme();
  };

  return (
    <div style={{ backgroundColor: props.themes.isLightMode ? "white" : "grey" }}>
      <h1>{props.counter.counter}</h1>
      <input type="number" name="step" value={props.counter.step} onChange={changeHandler} />
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
      <button onClick={toggleTheme}>{props.themes.isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch(createActionIncrement()),
//     decrement: () => dispatch(createActionDecrement()),
//   };
// };

const mapDispatchToProps = {
  increment: incrementAction,
  decrement: decrementAction,
  stepAction: changeStepAction,
  toggleTheme: toggleThemeAction,
};

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;
