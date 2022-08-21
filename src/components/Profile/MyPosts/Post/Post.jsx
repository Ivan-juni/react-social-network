import { useDispatch } from "react-redux";
import { deletePostAC } from "../../../../Redux/profile-reducer.ts";
import styles from "./post.module.css";

const Post = (props) => {
  const dispatch = useDispatch();

  const deletePost = () => {
    dispatch(deletePostAC(props.postId));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.post}>
        <div className={styles.post__block}>
          <div className={styles.vline}></div>
          <span className={styles.post__text}>{props.text}</span>
        </div>
        <div className={styles.options}>
          <span className={styles.likes}>
            Likes: <font color="red">{props.likes}</font>
          </span>
          <button onClick={deletePost}>Delete post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
