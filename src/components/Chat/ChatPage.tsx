import React, { useRef, useState } from 'react';
import styles from "./ChatPage.module.css";
import avatar from "../../images/ava-icon.jpeg";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening } from '../../Redux/chat-reducer.ts';
import { AppDispatch } from '../../Redux/redux-store';
import { ChatMessageType, RootState } from '../../types/types';
import AddMessageForm from './AddMessageForm/AddMessageForm.tsx';
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";

const ChatPage: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.chat.status)

    useEffect(()=>{
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])
    return (
        <>
            <h1 className={styles.caption}>WebSocket chat</h1>
            <div className={styles.wrapper}>
                {status === 'error' && <div>Spme error occured. Please refresh the page</div> }
                <>
                    <Messages />
                    <AddMessageForm />
                </>
            </div>
        </>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: RootState) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [AutoScroll, setAutoScroll] = useState(false);

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {

      const element = e.currentTarget;

      let differenceWhatWeSee = element.scrollHeight - element.scrollTop
      // element.scrollHeight - высота всей таблицы пикселей - 3800 например
      // element.scrollTop - сколько сейчас в
      // верхней точке длинна пикселей - 3400 например
      // прокрутка вверх то тут уже 3300 и разница уже 500 пикселей

      let value = Math.abs(differenceWhatWeSee - element.clientHeight)
      // element.clientHeight - всегда как у див тоесть = 400
      // 500 - 400 = 100

      if (value < 200) {
         if (!AutoScroll) {
            setAutoScroll(true)
            //console.log('Включили автоскролл')
         }
      } else {
         if (AutoScroll) {
            setAutoScroll(false)
            //console.log('ВЫКЛЮЧИЛИ автоскролл')
         }
      }
   }

    useEffect(() => {
        if (AutoScroll) {
            setTimeout(() => {
                messagesAnchorRef.current?.scrollIntoView({block: "nearest", behavior: 'smooth'})
            }, 500)
        }
    }, [messages])

    return (
        <div className={styles.messages__wrapper} style={{overflowY: "auto"}} onScroll={onScrollHandler}>
           {messages.map((m) => <Message key={m.id} message={m}/>)}
           <div ref={messagesAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
    <div className={styles.user}>
        <div className={styles.userInfo}>
            <div className={styles.userHead}>
                <div className={styles.user__thumb}>
                    <img src={message.photo ? message.photo : avatar} alt="avatar" className={styles.avatar} />
                </div>
                <div className={styles.userName}>
                    {message.userName}
                </div>
            </div>
            <div className={styles.message}>
                <ul>
                    <li>{message.message}</li>
                </ul>
            </div>
        </div>
        <div className={styles.hline}></div>
    </div>
    );
});

export default withAuthRedirect(ChatPage);