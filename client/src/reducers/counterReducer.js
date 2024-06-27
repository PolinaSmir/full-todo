import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  counter: 0,
  step: 1,
};

const counterReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case ACTION_TYPES.INCREMENT: {
      return {
        ...state,
        counter: state.counter + state.step,
      };
    }
    case ACTION_TYPES.DECREMENT: {
      return {
        ...state,
        counter: state.counter - state.step,
      };
    }
    case ACTION_TYPES.STEP_CHANGE: {
      const { payload } = action;
      return {
        ...state,
        step: payload,
      };
    }
    default:
      return state;
  }
};

export default counterReducer;