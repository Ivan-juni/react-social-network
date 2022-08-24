import React from "react";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../../Redux/profile-reducer.ts";
import { AppDispatch } from "../../../../Redux/redux-store";
import styles from "./post.module.css";

type PropsType = {
  postId: number
  text: string 
  likes: number
}

const Post: React.FC<PropsType> = ({postId, text, likes}) => {
  const dispatch: AppDispatch = useDispatch();

  const deletePost = () => {
    dispatch(profileActions.deletePostAC(postId));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.post}>
        <div className={styles.post__block}>
          <div className={styles.vline}></div>
          <span className={styles.post__text}>{text}</span>
        </div>
        <div className={styles.options}>
          <span className={styles.likes}>
            Likes: <span className={styles.likes}>{likes}</span>
          </span>
          <button onClick={deletePost}>Delete post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
