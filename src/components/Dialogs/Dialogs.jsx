import React from "react";
import { sendMessageActionCreator } from "../../Redux/dialogs-reducer.ts";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { withAuthRedirectFuncionalComponent } from "../../hoc/withAuthRedirect";

const MessageForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data", values);
    dispatch(sendMessageActionCreator(values.message));
    resetForm({});
    //! тут бабахают апи для сабмита
  };

  const validationSchema = Yup.object({
    message: Yup.string().min(1, "Must be longer than 0 characters"),
  });

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className={styles.messages__new}>
          <Field
            as="textarea"
            type="text"
            name="message"
            placeholder="Type your message here"
            className={styles.field}
          ></Field>
          <button className={styles.button__send} type={"submit"}>
            Send message
          </button>
        </div>
      </Form>
    </Formik>
  );
};

const Dialogs = () => {
  const dialogsPage = useSelector((state) => state.dialogsPage);

  let UsersData = dialogsPage.users.map((u) => (
    <DialogItem name={u.name} key={u.id} id={u.id} />
  ));

  let MessagesData = dialogsPage.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>{UsersData}</div>
      <hr className={styles.vline}></hr>
      <div className={styles.messages}>
        {MessagesData}
        <div>
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default withAuthRedirectFuncionalComponent(Dialogs); // ! HOC;
