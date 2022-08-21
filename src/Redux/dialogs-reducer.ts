const SEND_MESSAGE = "dialogs/SEND-MESSAGE";

type usersType = {
  id: number
  name: string
}
type messagesType = {
  id: number
  message: string
}

let initialState = {
  users: [
    { id: 1, name: "Misha" },
    { id: 2, name: "Valera" },
    { id: 3, name: "Vanya" },
  ] as Array<usersType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "123" },
    { id: 3, message: "Lorem" },
  ] as Array<messagesType>,
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any):initialStateType => {
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

type sendMessageActionType = {
  type: typeof SEND_MESSAGE
  message: string
}

export const sendMessageActionCreator = (message: string):sendMessageActionType => ({
  type: SEND_MESSAGE,
  message,
});

export default dialogsReducer;
