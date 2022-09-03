import { ChatMessageType, statusType } from "../types/types";

let subscribers = {
    'messageRecieved': [] as MRsubscriberType[],
    'statusChanged': [] as SCsubscriberType[]
}

let ws: WebSocket | null = null;
type eventNamesType = 'messageRecieved' | 'statusChanged'

// !HANDLERS
const closeHandler =  () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
}
const messageHandler = (e: MessageEvent<any>) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messageRecieved'].forEach(s => s(newMessages))
};
const openHandler = () => {
    notifySubscribersAboutStatus('ready');
};
const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.log('REFRESH PAGE');
};

// !TOOLS
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: statusType) => {
    subscribers['statusChanged'].forEach(s => s(status))
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

// !API
export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['messageRecieved'] = [];
        subscribers['statusChanged'] = [];
        ws?.close();
        cleanUp();
    },
    subscribe(eventName: eventNamesType, callback: MRsubscriberType | SCsubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s!== callback)
        }
    },
    unsubscribe(eventName: eventNamesType, callback: MRsubscriberType | SCsubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s!== callback)
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}

// !TYPES
type MRsubscriberType = (messages: ChatMessageType[]) => void
type SCsubscriberType = (status: statusType) => void
