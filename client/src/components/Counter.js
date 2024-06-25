import React from "react";
import { connect } from "react-redux";
import { incrementAction, decrementAction, changeStepAction } from "../actions/actionCreator";

const Counter = (props) => {
  const changeHandler = ({ target: { value } }) => {
    props.stepAction(value);
  };

  // console.log(props);

  return (
    <>
      <h1>{props.counter}</h1>
      <input type="number" name="step" onChange={changeHandler} />
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </>
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
};

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;
