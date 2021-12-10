const initialState = {
  data: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DATA_PRODUCT":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
