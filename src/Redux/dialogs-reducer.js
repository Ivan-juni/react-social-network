const SEND_MESSAGE = "dialogs/SEND-MESSAGE";

let initialState = {
  users: [
    { id: 1, name: "Misha" },
    { id: 2, name: "Valera" },
    { id: 3, name: "Vanya" },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "123" },
    { id: 3, message: "Lorem" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let id = state.messages.length + 1; // следующий айдишник
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            // объект, который мы добавляем в state (в конец)
            id: id,
            message: action.message,
          },
        ],
      };
    default:
      return state;
  }
};

export const sendMessageActionCreator = (message) => ({
  type: SEND_MESSAGE,
  message,
});

export default dialogsReducer;
