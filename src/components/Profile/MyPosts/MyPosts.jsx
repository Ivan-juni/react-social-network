import React from "react";
import Post from "./Post/Post.tsx";
import styles from "./posts.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../../Redux/profile-reducer.ts";

const PostForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data", values);
    dispatch(profileActions.addPostActionCreator(values.post));
    resetForm({});
    //! тут бабахают апи для сабмита
  };

  const validationSchema = Yup.object({
    post: Yup.string().min(2, "Must be longer than 1 characters"),
  });

  return (
    <Formik
      initialValues={{ post: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className={styles.posts__new}>
          <Field
            as="textarea"
            type="text"
            name="post"
            placeholder="Type your post here"
            className={styles.field}
          />
          <div className={styles.bottom}>
            <div className={styles.error}>
              <ErrorMessage name="post" />
            </div>
            <button className={styles.postSubmit} type={"submit"}>
              Add post
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

const MyPosts = () => {
  const profilePage = useSelector((state) => state.profilePage);

  let PostsData = profilePage.posts.map((p) => (
    <Post likes={p.likes} text={p.text} key={p.id} postId={p.id} />
  ));

  return (
    <div className={styles.wrapper}>
      <h1>My posts</h1>
      <div>
        <PostForm />
      </div>
      {PostsData}
    </div>
  );
};

export default MyPosts;
