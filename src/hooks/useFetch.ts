import { useEffect, useState } from "react";

export interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface State<T> {
  data: T[];
  isLoading: boolean;
}

export const useFetch = <T extends Item>(_page: number): State<T> => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${_page}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [_page]);

  return {
    isLoading,
    data,
  };
};
