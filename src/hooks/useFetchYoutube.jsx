import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetch = (url, fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const res = await fetchFunction(url);
        setError(null);
        setData(res);
      } catch (error) {
        console.log("Error in useFetch fetchData");

        setError(error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [dispatch, fetchFunction]);

  return { data, loading, error };
};
