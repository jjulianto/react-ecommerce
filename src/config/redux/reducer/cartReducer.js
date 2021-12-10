const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
