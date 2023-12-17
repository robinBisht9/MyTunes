import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, accessToken, baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, data: null });

  useEffect(() => {
    const abortController = new AbortController();
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const fetchDataFromApi = async () => {
      try {
        const { data } = await axios.get(baseUrl + url, {
          headers: headers,
        });

        setData(data);
      } catch (err) {
        setError({ error: true, data: err });
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
    return () => abortController.abort();
  }, [url, accessToken, baseUrl]);

  return { data, loading, error };
};
