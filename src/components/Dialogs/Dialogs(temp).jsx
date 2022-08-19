import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let users = props.dialogsPage.users;
  let messages = props.dialogsPage.messages;

  let UsersData = users.map((u) => (
    <DialogItem name={u.name} key={u.id} id={u.id} />
  ));

  let MessagesData = messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let sendMessage = () => {
    props.sendMessage();
  };

  let messageAreaChange = (event) => {
    let text = event.target.value;
    props.updateNewMessageText(text);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>{UsersData}</div>
      <hr className={styles.vline}></hr>
      <div className={styles.messages}>
        {MessagesData}
        <div className={styles.messages__new}>
          <textarea
            type="text"
            onChange={messageAreaChange}
            value={props.dialogsPage.newMessageText}
          ></textarea>
          <button className={styles.button__send} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
