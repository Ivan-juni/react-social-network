import { chatAPI } from "../api/chat-api.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from 'redux';
import { ChatMessageType, statusType } from "../types/types";
import { v1 } from "uuid";

type ChatMessageWithIdType = ChatMessageType & {id: string}

const MESSAGES_RECIEVED = "SN/APP/MESSAGES-RECIEVED";
const STATUS_CHANGED = "SN/APP/STATUS-CHANGED";

let initialState = {
  messages: [] as ChatMessageWithIdType[],
  status: 'pending' as statusType
}

export type initialStateType = typeof initialState;

const chatReducer = (state = initialState, action: actionTypes): initialStateType => {
  switch (action.type) {
    case MESSAGES_RECIEVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
      };
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status
      };
    default:
      return state;
  }
};

type actionTypes = InferActionsTypes<typeof chatActions>

export const chatActions = {
  messagesRecieved : (messages: ChatMessageWithIdType[]) => ({ type: MESSAGES_RECIEVED, payload: {messages} } as const),
  statusChanged : (status: statusType) => ({ type: STATUS_CHANGED, payload: {status} } as const),
}

// * thunks *
type ThunkType = BaseThunkType<actionTypes>

let _newMessageHandler: ((messages: ChatMessageWithIdType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if(_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActions.messagesRecieved(messages))
    }
  }
  return _newMessageHandler
}
let _statusChangedHandler: ((status: statusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if(_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(chatActions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.subscribe('messageRecieved', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch))
  chatAPI.start();
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messageRecieved', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch))
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async () => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
