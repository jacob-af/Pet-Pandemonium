const chatReducer = (state, action) => {
  const { chatLog, socket } = state;
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.data
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        chatLog: [...chatLog, action.data]
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        chatLog: [...chatLog, action.data]
      };

    default:
      return state;
  }
};

export default chatReducer;
