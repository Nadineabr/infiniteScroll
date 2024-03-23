import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Item } from "../../hooks/useFetch";
import { Loader } from "../Loader";
import styles from "./styles.module.scss";

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Partial<Item>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setPost(res);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.post}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link to="/posts" className={styles.link}>
            Вернуться к постам
          </Link>
        </div>
      )}
    </div>
  );
};
