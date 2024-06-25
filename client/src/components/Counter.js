import React from "react";
import { connect } from "react-redux";
import { incrementAction, decrementAction } from "../actions/actionCreator";

const Counter = (props) => {
  // const increment = () => {
  //   props.dispatch(createActionIncrement());
  // };

  // const decrement = () => {
  //   props.dispatch(createActionDecrement());
  // };

  console.log(props);

  return (
    <>
      <h1>{props.counter}</h1>
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
};

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;
