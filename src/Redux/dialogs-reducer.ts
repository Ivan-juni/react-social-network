import { messagesDialogsType, usersDialogsType } from "../types/types";
import { InferActionsTypes } from "./redux-store";

const SEND_MESSAGE = "dialogs/SEND-MESSAGE";

let initialState = {
  users: [
    { id: 1, name: "Misha" },
    { id: 2, name: "Valera" },
    { id: 3, name: "Vanya" },
  ] as Array<usersDialogsType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "123" },
    { id: 3, message: "Lorem" },
  ] as Array<messagesDialogsType>,
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: actionTypes):initialStateType => {
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

type actionTypes = InferActionsTypes<typeof dialogsActions>;

export const dialogsActions = {
  sendMessageActionCreator : (message: string) => ({
    type: SEND_MESSAGE,
    message,
  } as const)
}

export default dialogsReducer;
