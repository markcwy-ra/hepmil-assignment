const signUpReducer = (state, action) => {
  switch (action.type) {
    case "text-input":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;
