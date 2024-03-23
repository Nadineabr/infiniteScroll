import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Loader } from "../Loader";
import { Item, useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.scss";

export const Posts = () => {
  const [posts, setPosts] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false); // [setHasMore]
  const { data, isLoading } = useFetch(page);

  const { ref, inView } = useInView({
    threshold: [1.0],
  });

  const isFetching = useMemo(() => page < 6, [page]);

  const handleLoadMore = useCallback(() => {
    setHasMore(true);
  }, [setHasMore]);

  useEffect(() => {
    if (data && (isFetching || hasMore)) {
      setPosts((prev) => [...prev, ...data]);
      setHasMore(false);
    }
  }, [data, isFetching, hasMore]);

  useEffect(() => {
    if ((inView && isFetching) || hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className={styles.root}>
      <h1>Posts</h1>
      {Boolean(posts.length) && (
        <ul>
          {posts.map((post) => {
            const { id, title, body } = post;
            return (
              <li key={id} className={styles.post}>
                <Link to={`/posts/${id}`} className={styles.link}>
                  <span>{id} post:</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {!isLoading && posts.length < 100 && (
        <button ref={ref} className={styles.button} onClick={handleLoadMore}>
          Подгрузить еще
        </button>
      )}
    </div>
  );
};
