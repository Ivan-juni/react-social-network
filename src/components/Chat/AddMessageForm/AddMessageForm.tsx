import React from "react";
import styles from "../ChatPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../Redux/chat-reducer.ts";
import { RootState } from "../../../types/types";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


const AddMessageForm: React.FC = () => {
  const dispatch: any = useDispatch();
  const status = useSelector((state: RootState) => state.chat.status)

  const onSubmit = (values: {message: string}, { resetForm }) => {
    if(!values.message) {
      return
    }
    dispatch(sendMessage(values.message));
    resetForm({});
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
          <button className={styles.button__send} type={"submit"} disabled={status !== 'ready'}>
            Send
          </button>
          <ErrorMessage name='message'/>
        </div>
      </Form>
    </Formik>
  );
};

export default AddMessageForm;