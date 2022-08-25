import React from "react";
import { dialogsActions } from "../../Redux/dialogs-reducer.ts";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { withAuthRedirectFuncionalComponent } from "../../hoc/withAuthRedirect.tsx";
import { AppDispatch } from "../../Redux/redux-store";
import { RootState } from '../../types/types';

const MessageForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (values: {message: string}, { resetForm }) => {
    console.log("Form data", values);
    dispatch(dialogsActions.sendMessageActionCreator(values.message));
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

const Dialogs: React.FC = () => {
  const dialogsPage = useSelector((state: RootState) => state.dialogsPage);

  type userObjType = {
    name: string
    id: number
  }
  let UsersData: Array<JSX.Element> = dialogsPage.users.map((u: userObjType) => (
    <DialogItem name={u.name} key={u.id} id={u.id} />
  ));

  type messageObjType = {
    message: string
    id: number
  }
  let MessagesData: Array<JSX.Element> = dialogsPage.messages.map((m: messageObjType) => (
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
