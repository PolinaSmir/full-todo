import React from "react";
import { connect } from "react-redux";
import { incrementAction, decrementAction, changeStepAction, requestCounterFetching } from "../actions/actionCreator";

const Counter = (props) => {
  const changeHandler = ({ target: { value } }) => {
    props.stepAction(Number(value));
  };

  const onClickHandler = () => {
    props.requestFetching(props.counter);
  };

  return (
    <>
      <h1>{props.counter}</h1>
      <input type="number" name="step" value={props.step} onChange={changeHandler} />
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>

      <button onClick={onClickHandler}>Send counter to backend</button>
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
  requestFetching: requestCounterFetching,
};

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;
